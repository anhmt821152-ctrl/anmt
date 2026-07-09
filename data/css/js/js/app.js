const currentUser = JSON.parse(localStorage.getItem('currentUser'));

// Bảo vệ route
if (!currentUser && !window.location.pathname.includes('login.html')) {
    window.location.href = 'login.html';
}

// Cấu hình Menu theo Role (Phân quyền)
const menuConfig = [
    { id: 'dashboard', name: 'Dashboard', icon: 'fa-tachometer-alt', url: 'dashboard.html', roles: ['admin', 'dispatch', 'gate', 'document', 'equipment', 'customer'] },
    { id: 'container', name: 'Container', icon: 'fa-box', url: 'container.html', roles: ['admin', 'dispatch', 'gate', 'customer'] },
    { id: 'dispatch', name: 'Điều độ', icon: 'fa-truck', url: 'dispatch.html', roles: ['admin', 'dispatch'] },
    { id: 'gate', name: 'Cổng', icon: 'fa-torii-gate', url: 'gate.html', roles: ['admin', 'gate'] },
    { id: 'document', name: 'Chứng từ', icon: 'fa-file-alt', url: 'document.html', roles: ['admin', 'document'] },
    { id: 'equipment', name: 'Thiết bị', icon: 'fa-cogs', url: 'equipment.html', roles: ['admin', 'equipment'] },
    { id: 'customer', name: 'Khách hàng', icon: 'fa-users', url: 'customer.html', roles: ['admin'] },
    { id: 'report', name: 'Báo cáo', icon: 'fa-chart-bar', url: 'report.html', roles: ['admin'] }
];

function renderLayout() {
    if(!currentUser) return;
    
    // 1. Build Sidebar
    let sidebarHTML = `
        <div class="sidebar">
            <div class="brand">
                <i class="fas fa-ship fa-2x mb-2 text-primary"></i><br>
                TMS SYSTEM
            </div>
            <div class="menu-list mt-3">
    `;
    
    menuConfig.forEach(item => {
        if (item.roles.includes(currentUser.role)) {
            const isActive = window.location.pathname.includes(item.url) ? 'active' : '';
            sidebarHTML += `<a href="${item.url}" class="${isActive}"><i class="fas ${item.icon}"></i> ${item.name}</a>`;
        }
    });
    
    sidebarHTML += `</div></div>`;

    // 2. Build Header
    let headerHTML = `
        <header class="top-header">
            <div class="school-info">
                <h4>TRƯỜNG ĐẠI HỌC ABC</h4>
                <p>HỆ THỐNG QUẢN LÝ CONTAINER TRONG BÃI (TMS)</p>
            </div>
            <div class="user-profile">
                <div class="text-end">
                    <strong>${currentUser.name}</strong><br>
                    <span class="badge bg-primary text-uppercase">${currentUser.role}</span>
                </div>
                <img src="https://ui-avatars.com/api/?name=${currentUser.name}&background=0d6efd&color=fff" alt="Avatar">
                <button onclick="logout()" class="btn btn-outline-danger btn-sm ms-3"><i class="fas fa-sign-out-alt"></i></button>
            </div>
        </header>
    `;

    // 3. Inject vào DOM
    const appLayout = document.getElementById('app-layout');
    if (appLayout) {
        // Lấy nội dung hiện tại của page
        const pageContent = appLayout.innerHTML; 
        // Bọc lại trong cấu trúc chuẩn
        appLayout.innerHTML = sidebarHTML + `<div class="main-content">` + headerHTML + `<div class="page-content">` + pageContent + `</div></div>`;
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', renderLayout);
