document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const userVal = document.getElementById('username').value;
    const passVal = document.getElementById('password').value;
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const authUser = users.find(u => u.username === userVal && u.password === passVal);
    
    if (authUser) {
        localStorage.setItem('currentUser', JSON.stringify(authUser));
        window.location.href = 'dashboard.html';
    } else {
        document.getElementById('loginError').classList.remove('d-none');
    }
});