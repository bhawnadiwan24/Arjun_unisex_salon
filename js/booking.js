// js/booking.js
document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('bookingForm');
    const bookingAlert = document.getElementById('booking-alert');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('b-name').value.trim();
            const service = document.getElementById('b-service').value;
            const date = document.getElementById('b-date').value;
            const time = document.getElementById('b-time').value;

            // Simple validation
            if (!name || !service || !date || !time) {
                showAlert('Please fill in all fields', 'danger');
                return;
            }

            const newBooking = {
                id: generateId(),
                name,
                service,
                date,
                time,
                status: 'Confirmed',
                createdAt: new Date().toISOString()
            };

            const bookings = getBookings();
            bookings.push(newBooking);
            setBookings(bookings);

            showAlert('Appointment booked successfully! We will see you soon.', 'success');
            bookingForm.reset();

            setTimeout(() => {
                closeBookingModal();
                if (bookingAlert) bookingAlert.style.display = 'none';
            }, 3000);
        });
    }

    function showAlert(message, type) {
        if (!bookingAlert) return;
        bookingAlert.textContent = message;
        bookingAlert.className = `alert alert-${type}`;
        bookingAlert.style.display = 'block';
    }
});
