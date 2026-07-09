const Storage = {
    init: async function() {
        if (!localStorage.getItem('isInitialized')) {
            try {
                const response = await fetch('data/sample-data.json');
                const data = await response.json();
                
                localStorage.setItem('users', JSON.stringify(data.users));
                localStorage.setItem('containers', JSON.stringify(data.containers));
                // Khởi tạo các bảng khác tại đây...
                
                localStorage.setItem('isInitialized', 'true');
                console.log("Dữ liệu hệ thống đã được khởi tạo!");
            } catch (error) {
                console.error("Lỗi khởi tạo dữ liệu:", error);
            }
        }
    },
    get: (key) => JSON.parse(localStorage.getItem(key)) || [],
    set: (key, data) => localStorage.setItem(key, JSON.stringify(data))
};

// Chạy khởi tạo ngay khi script được load
Storage.init();