// js/gallery.js
document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('gallery-container');
    if (galleryContainer) {
        renderGallery();
    }
});

function renderGallery() {
    const galleryContainer = document.getElementById('gallery-container');
    const images = getGallery();
    
    galleryContainer.innerHTML = '';
    
    if (images.length === 0) {
        galleryContainer.innerHTML = '<p style="grid-column: 1/-1;">No images in gallery yet.</p>';
        return;
    }

    images.forEach((img, index) => {
        galleryContainer.innerHTML += `
            <div style="cursor: pointer; overflow: hidden; border-radius: var(--border-radius); box-shadow: var(--shadow-sm); animation: fadeIn 0.5s ease-out ${Math.min(index * 0.1, 1)}s backwards;" onclick="openGalleryModal('${img.url}')">
                <img src="${img.url}" alt="${img.alt || 'Gallery image'}" style="width: 100%; height: 300px; object-fit: cover; transition: var(--transition);" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'" loading="lazy">
            </div>
        `;
    });
}

function openGalleryModal(url) {
    const modal = document.getElementById('galleryModal');
    const previewImg = document.getElementById('gallery-preview-img');
    if (modal && previewImg) {
        previewImg.src = url;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeGalleryModal() {
    const modal = document.getElementById('galleryModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

window.addEventListener('click', (e) => {
    const modal = document.getElementById('galleryModal');
    if (e.target === modal) {
        closeGalleryModal();
    }
});
