document.addEventListener('DOMContentLoaded', () => {
    const containers = Storage.get('containers');
    
    // Tính toán KPI
    document.getElementById('kpi-total').innerText = containers.length;
    document.getElementById('kpi-yard').innerText = containers.filter(c => c.status === 'Lưu bãi').length;
    
    // Vẽ Chart.js
    const ctx = document.getElementById('containerChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10'],
            datasets: [
                { label: 'Container Nhập', data: [12, 19, 15, 25], backgroundColor: '#0d6efd' },
                { label: 'Container Xuất', data: [10, 15, 20, 18], backgroundColor: '#198754' }
            ]
        }
    });
});