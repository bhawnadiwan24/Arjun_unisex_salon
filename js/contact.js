// js/contact.js
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const contactAlert = document.getElementById('contact-alert');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('c-name').value.trim();
            const email = document.getElementById('c-email').value.trim();
            const message = document.getElementById('c-message').value.trim();

            if (!name || !email || !message) {
                if (contactAlert) {
                    contactAlert.textContent = 'Please fill out all fields.';
                    contactAlert.className = 'alert alert-danger';
                    contactAlert.style.display = 'block';
                }
                return;
            }

            const newMessage = {
                id: generateId(),
                name,
                email,
                message,
                createdAt: new Date().toISOString()
            };

            const messages = getMessages();
            messages.push(newMessage);
            setMessages(messages);

            // Loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Redirect to WhatsApp
            const whatsappNumber = "918305553447";
            const whatsappText = `Hello, I am ${name}.\nI want to contact Arjun's Men's Parlour.\n\nEmail: ${email}\n\nMessage:\n${message}`;
            const encodedText = encodeURIComponent(whatsappText);
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

            setTimeout(() => {
                window.open(whatsappUrl, '_blank');

                if (contactAlert) {
                    contactAlert.textContent = 'Redirecting to WhatsApp...';
                    contactAlert.className = 'alert alert-success';
                    contactAlert.style.display = 'block';
                }

                contactForm.reset();
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;

                setTimeout(() => {
                    if (contactAlert) contactAlert.style.display = 'none';
                }, 3000);
            }, 800); // 800ms loading delay
        });
    }

    // displayBookings();

    const clearBtn = document.getElementById('clearBookings');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            localStorage.removeItem('bookings');
            displayBookings();
        });
    }
});
function displayBookings() {
    const container = document.getElementById('allBookings');
    if (!container) return;

    const bookings = getBookings();

    container.innerHTML = "";

    if (bookings.length === 0) {
        container.innerHTML = "<p>No bookings yet.</p>";
        return;
    }

    bookings.forEach((booking) => {
        const div = document.createElement('div');
        div.style.border = "1px solid #ccc";
        div.style.padding = "10px";
        div.style.borderRadius = "8px";

        div.innerHTML = `
            <strong>Name:</strong> ${booking.name} <br>
            <strong>Service:</strong> ${booking.service} <br>
            <strong>Date:</strong> ${booking.date} <br>
            <strong>Time:</strong> ${booking.time}
        `;

        container.appendChild(div);
    });
}