// js/services.js
document.addEventListener('DOMContentLoaded', () => {
    const servicesContainer = document.getElementById('services-container');
    if (servicesContainer) {
        const services = getServices();
        
        if (services.length === 0) {
            servicesContainer.innerHTML = '<p style="grid-column: 1/-1;">No services available at the moment. Please check back later.</p>';
            return;
        }

        servicesContainer.innerHTML = '';
        services.forEach((service, index) => {
            servicesContainer.innerHTML += `
                <div class="service-card" style="animation: fadeIn 0.5s ease-out ${Math.min(index * 0.1, 1)}s backwards; text-align: left;">
                    <img src="${service.image}" alt="${service.name}" loading="lazy">
                    <div style="padding: 1.8rem;">
                        <span style="display:inline-block; font-size: 0.8rem; text-transform:uppercase; letter-spacing: 1px; color:#aaa; margin-bottom:0.5rem;">${service.category}</span>
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 0.8rem;">
                            <h3 style="font-size: 1.3rem; color: var(--secondary-color);">${service.name}</h3>
                            <span style="font-weight:700; color:var(--primary-color); font-size: 1.2rem;">$${service.price}</span>
                        </div>
                        <p style="color: var(--text-light); margin-bottom: 1.5rem; font-size: 0.95rem; line-height: 1.5;">${service.description}</p>
                        <button class="btn btn-outline" style="width: 100%;" onclick="openBookingModal('${service.name}')">Book This Service</button>
                    </div>
                </div>
            `;
        });
    }
});
