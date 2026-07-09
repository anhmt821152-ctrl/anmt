let containers = Storage.get('containers');

function renderTable() {
    const tbody = document.getElementById('contTableBody');
    tbody.innerHTML = '';
    
    // RBAC: Nếu là customer, chỉ thấy cont của mình (giả lập bằng tên)
    let displayData = containers;
    if(currentUser.role === 'customer') {
        displayData = containers.filter(c => c.customer === "CMA CGM"); // Fix cứng theo user demo
        document.getElementById('btnAddCont').style.display = 'none'; // Khách ko được thêm
    }

    displayData.forEach(c => {
        const badge = c.status === 'Lưu bãi' ? 'bg-warning' : 'bg-success';
        // HTML action buttons
        let actions = `
            <button class="btn btn-sm btn-info text-white" onclick="editCont('${c.id}')"><i class="fas fa-edit"></i></button>
            <button class="btn btn-sm btn-danger" onclick="deleteCont('${c.id}')"><i class="fas fa-trash"></i></button>
        `;
        if(currentUser.role === 'customer') actions = '<span class="text-muted">Chỉ xem</span>';

        tbody.innerHTML += `
            <tr>
                <td>${c.id}</td>
                <td class="fw-bold">${c.number}</td>
                <td>${c.type} - ${c.size}</td>
                <td>${c.customer}</td>
                <td>${c.location}</td>
                <td><span class="badge ${badge}">${c.status}</span></td>
                <td>${c.dateIn}</td>
                <td>${actions}</td>
            </tr>
        `;
    });
}

// Thêm / Sửa
document.getElementById('contForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('contId').value;
    const contData = {
        id: id || 'CONT' + Date.now().toString().slice(-4),
        number: document.getElementById('contNum').value,
        type: document.getElementById('contType').value,
        size: document.getElementById('contSize').value,
        customer: document.getElementById('contCus').value,
        location: document.getElementById('contLoc').value,
        status: document.getElementById('contStatus').value,
        dateIn: new Date().toISOString().split('T')[0]
    };

    if(id) {
        const idx = containers.findIndex(c => c.id === id);
        containers[idx] = {...containers[idx], ...contData};
    } else {
        containers.push(contData);
    }
    
    Storage.set('containers', containers);
    bootstrap.Modal.getInstance(document.getElementById('contModal')).hide();
    renderTable();
    this.reset();
});

function editCont(id) {
    const c = containers.find(x => x.id === id);
    document.getElementById('contId').value = c.id;
    document.getElementById('contNum').value = c.number;
    document.getElementById('contType').value = c.type;
    document.getElementById('contSize').value = c.size;
    document.getElementById('contCus').value = c.customer;
    document.getElementById('contLoc').value = c.location;
    document.getElementById('contStatus').value = c.status;
    new bootstrap.Modal(document.getElementById('contModal')).show();
}

function deleteCont(id) {
    if(confirm('Bạn có chắc chắn xóa Container này?')) {
        containers = containers.filter(c => c.id !== id);
        Storage.set('containers', containers);
        renderTable();
    }
}

function exportExcel() {
    alert("Giả lập: File Container_Report.xlsx đã được tải xuống!");
}

document.addEventListener('DOMContentLoaded', renderTable);
