// Document ready listener
document.addEventListener('DOMContentLoaded', () => {
    
    // Set Footer Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Navbar Toggle (Mobile)
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });
    }

    // Populate services dropdown in booking modal if it exists
    const serviceSelect = document.getElementById('b-service');
    if (serviceSelect) {
        const services = getServices();
        services.forEach(s => {
            const option = document.createElement('option');
            option.value = s.name;
            option.textContent = `${s.name} - $${s.price}`;
            serviceSelect.appendChild(option);
        });
    }
    
    // Set active link in navbar
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navAnchorTags = document.querySelectorAll('.nav-links li a');
    navAnchorTags.forEach(a => {
        if(a.getAttribute('href') === currentPath) {
            a.classList.add('active');
        }
    });

});

// Global Modal Functions
function openBookingModal(preselectedService = '') {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        if (preselectedService) {
            const select = document.getElementById('b-service');
            if(select) select.value = preselectedService;
        }
    }
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal when clicking outside of it
window.addEventListener('click', (e) => {
    const modal = document.getElementById('bookingModal');
    if (e.target === modal) {
        closeBookingModal();
    }
});
