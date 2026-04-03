// js/admin.js

document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();

    // Login logic
    const loginForm = document.getElementById('adminLoginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const user = document.getElementById('login-user').value.trim().toLowerCase();
            const pass = document.getElementById('login-pass').value.trim();

            // Allow dynamic credentials via localStorage
            const savedCredsStr = localStorage.getItem('adminCreds');
            const savedCreds = savedCredsStr ? JSON.parse(savedCredsStr) : { username: 'admin', password: 'password123' };

            if (user === savedCreds.username.toLowerCase() && pass === savedCreds.password) {
                localStorage.setItem('adminLoggedIn', 'true');
                checkLoginStatus();
            } else {
                const alert = document.getElementById('login-alert');
                alert.textContent = 'Invalid credentials';
                alert.className = 'alert alert-danger';
                alert.style.display = 'block';
            }
        });
    }

    // Update Credentials Form logic
    const credsForm = document.getElementById('updateCredsForm');
    if (credsForm) {
        credsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newUser = document.getElementById('new-user').value.trim();
            const newPass = document.getElementById('new-pass').value.trim();

            if (newUser && newPass) {
                localStorage.setItem('adminCreds', JSON.stringify({ username: newUser, password: newPass }));

                const alertBox = document.getElementById('creds-alert');
                alertBox.textContent = 'Credentials updated successfully!';
                alertBox.className = 'alert alert-success';
                alertBox.style.display = 'block';

                credsForm.reset();
                setTimeout(() => alertBox.style.display = 'none', 3000);
            }
        });
    }

    // Gallery Form submit
    const galleryForm = document.getElementById('addGalleryForm');
    if (galleryForm) {
        galleryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fileInput = document.getElementById('g-file');
            const alt = document.getElementById('g-alt').value;

            if (fileInput.files && fileInput.files[0]) {
                const file = fileInput.files[0];
                const reader = new FileReader();

                reader.onload = function (event) {
                    // Create an image object to resize it deeply to save localStorage space
                    const img = new Image();
                    img.onload = function () {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');

                        // Set max width/height to 800px to prevent hitting localStorage 5MB limit too quickly
                        const MAX_SIZE = 800;
                        let width = img.width;
                        let height = img.height;

                        if (width > height) {
                            if (width > MAX_SIZE) {
                                height *= MAX_SIZE / width;
                                width = MAX_SIZE;
                            }
                        } else {
                            if (height > MAX_SIZE) {
                                width *= MAX_SIZE / height;
                                height = MAX_SIZE;
                            }
                        }

                        canvas.width = width;
                        canvas.height = height;
                        ctx.drawImage(img, 0, 0, width, height);

                        // Convert back to compressed base64 JPEG
                        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.6);

                        const gallery = getGallery();
                        gallery.push({
                            id: generateId(),
                            url: compressedBase64,
                            alt
                        });

                        try {
                            setGallery(gallery);
                            galleryForm.reset();
                            loadGalleryAdmin();
                        } catch (err) {
                            alert("Storage limit exceeded! You have reached your browser's limit for storing data locally. Please delete some images first.");
                        }
                    };
                    img.src = event.target.result;
                };

                reader.readAsDataURL(file);
            }
        });
    }
});

function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    const loginView = document.getElementById('login-view');
    const dashboardView = document.getElementById('dashboard-view');

    if (isLoggedIn === 'true') {
        if (loginView) loginView.style.display = 'none';
        if (dashboardView) {
            dashboardView.classList.add('active');
            loadDashboardData();
        }
    } else {
        if (loginView) loginView.style.display = 'flex';
        if (dashboardView) dashboardView.classList.remove('active');
    }
}

function logout() {
    localStorage.removeItem('adminLoggedIn');
    checkLoginStatus();
}

function switchView(viewName) {
    document.querySelectorAll('.nav-menu button').forEach(b => b.classList.remove('active'));
    const btn = document.getElementById('btn-' + viewName);
    if (btn) btn.classList.add('active');

    document.querySelectorAll('.section-view').forEach(s => s.classList.remove('active'));
    document.getElementById('sec-' + viewName).classList.add('active');
}

function loadDashboardData() {
    loadGalleryAdmin();
    loadBookingsAdmin();
}

// --- Gallery ---
function loadGalleryAdmin() {
    const container = document.getElementById('admin-gallery-table');
    const images = getGallery();

    if (container) {
        container.innerHTML = '';

        images.forEach(img => {
            container.innerHTML += `
                <div style="position: relative; border-radius: 8px; overflow: hidden; border: 1px solid #ddd; box-shadow: var(--shadow-sm);">
                    <img src="${img.url}" alt="${img.alt}" style="width: 100%; height: 150px; object-fit: cover;">
                    <button onclick="deleteGalleryImage(${img.id})" style="position: absolute; top: 5px; right: 5px; background: rgba(220,53,69,0.9); color: white; border: none; width: 25px; height: 25px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 16px;">&times;</button>
                </div>
            `;
        });
    }
}

function deleteGalleryImage(id) {
    if (confirm('Remove this image?')) {
        let gallery = getGallery();
        gallery = gallery.filter(g => g.id !== id);
        setGallery(gallery);
        loadGalleryAdmin();
    }
}

// --- Bookings ---
function loadBookingsAdmin() {
    const tbody = document.getElementById('bookings-tbody');
    const bookings = getBookings();

    if (tbody) {
        tbody.innerHTML = '';

        if (bookings.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align: center;">No bookings found</td></tr>';
            return;
        }

        // Sort by date/time (newest first for now, or use createdAt)
        const sortedBookings = [...bookings].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        sortedBookings.forEach(booking => {
            tbody.innerHTML += `
                <tr>
                    <td>${booking.name}</td>
                    <td>${booking.service}</td>
                    <td>${booking.date}</td>
                    <td>${booking.time}</td>
                    <td><span class="badge ${booking.status === 'Confirmed' ? 'badge-success' : 'badge-info'}" style="color: #155724; background: #d4edda; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem;">${booking.status}</span></td>
                    <td class="actions">
                        <button onclick="deleteBooking(${booking.id})" style="background: #dc3545; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 0.85rem;">Delete</button>
                    </td>
                </tr>
            `;
        });
    }
}

function deleteBooking(id) {
    if (confirm('Delete this booking record?')) {
        let bookings = getBookings();
        bookings = bookings.filter(b => b.id !== id);
        setBookings(bookings);
        loadBookingsAdmin();
    }
}

