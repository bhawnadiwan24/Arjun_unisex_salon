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

            if (contactAlert) {
                contactAlert.textContent = 'Message sent successfully! We will get back to you soon.';
                contactAlert.className = 'alert alert-success';
                contactAlert.style.display = 'block';
            }
            contactForm.reset();

            setTimeout(() => {
                contactAlert.style.display = 'none';
            }, 3000);
        });
    }
});
