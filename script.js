document.addEventListener('DOMContentLoaded', function() {
    // Sample photo data
    const photos = [
        { id: 1, src: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Nature_photographer_photographing_animal_in_wild.jpg', category: 'nature', caption: 'Beautiful nature landscape' },
        { id: 2, src: 'https://www.luxurylifestylemag.co.uk/wp-content/uploads/2023/09/bigstock-Aurora-Borealis-On-The-Lofoten-273103858.jpg', category: 'nature', caption: 'Majestic mountains' },
        { id: 3, src: 'https://blog.ostrovok.ru/wp-content/uploads/2024/05/%D1%84%D0%BE%D1%82%D0%BE30.jpg', category: 'travel', caption: 'Tropical beach getaway' },
        { id: 4, src: 'https://static1.gensler.com/uploads/hero_element/23746/thumb_desktop/thumbs/press-release-city-pulse-2024-2000x1125_1714165165_1024x576.jpg', category: 'travel', caption: 'Urban cityscape' },
        { id: 5, src: 'https://media.istockphoto.com/id/851930128/photo/family-with-dog-resting-on-a-pier.jpg?s=612x612&w=0&k=20&c=dZ-0U3m59FY-BeoCgL-iNdPKHHSl_TxKFPOQ4450WSY=', category: 'people', caption: 'Portrait photography' },
        { id: 6, src: 'https://lisareidphotography.com/wp-content/uploads/2021/09/2021-07-31-Osswald-Family-84-scaled-e1631672697461.jpg', category: 'people', caption: 'Family moments' },
        { id: 7, src: 'https://www.thesprucepets.com/thmb/B8A1ji4QjXo6dVxy1hbhR9pYhZA=/4000x0/filters:no_upscale():strip_icc()/spruce-pets-white-dog-breeds-2025-header-9fe5f4f0cbe241b6b28caa23ca44db90.jpg', category: 'animals', caption: 'Cute puppy' },
        { id: 8, src: 'https://i.pinimg.com/736x/8a/a7/02/8aa702be3e02ff369d0bed3d60728e03.jpg', category: 'animals', caption: 'Playful kitten' },
        { id: 9, src: 'https://a.travel-assets.com/findyours-php/viewfinder/images/res70/520000/520309-enchanted-forest.jpg', category: 'nature', caption: 'Mystical forest' },
        { id: 10, src: 'https://cdn.magicdecor.in/com/2022/10/30085134/1111006679.jpg', category: 'nature', caption: 'Stunning waterfall' },
        { id: 11, src: 'https://p3.pxbarn.com/preview/456/126/eiffel-tower-paris-bride-and-groom-romantic-moment-iconic-landmark-park-couple-walking-wedding-photo-france-travel-destination-thumbnail.jpg', category: 'travel', caption: 'Paris landmarks' },
        { id: 12, src: 'https://www.churchofscotland.org.uk/__data/assets/image/0010/47935/wedding.jpg', category: 'people', caption: 'Wedding ceremony' }
    ];

    const photoGrid = document.querySelector('.photo-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox .caption');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentPhotoIndex = 0;
    let filteredPhotos = [...photos];

    // Initialize the photo grid
    function renderPhotos(photosToRender) {
        photoGrid.innerHTML = '';
        photosToRender.forEach((photo, index) => {
            const photoItem = document.createElement('div');
            photoItem.className = `photo-item ${photo.category}`;
            photoItem.dataset.category = photo.category;
            photoItem.dataset.index = index;
            
            photoItem.innerHTML = `
                <img src="${photo.src}" alt="${photo.caption}" loading="lazy">
                <div class="photo-caption">${photo.caption}</div>
            `;
            
            photoItem.addEventListener('click', () => openLightbox(index));
            photoGrid.appendChild(photoItem);
        });
    }

    // Filter photos by category
    function filterPhotos(category) {
        if (category === 'all') {
            filteredPhotos = [...photos];
        } else {
            filteredPhotos = photos.filter(photo => photo.category === category);
        }
        renderPhotos(filteredPhotos);
    }

    // Open lightbox with selected photo
    function openLightbox(index) {
        currentPhotoIndex = index;
        const photo = filteredPhotos[currentPhotoIndex];
        lightboxImg.src = photo.src;
        lightboxCaption.textContent = photo.caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Navigate to previous photo
    function showPrevPhoto() {
        currentPhotoIndex = (currentPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
        const photo = filteredPhotos[currentPhotoIndex];
        lightboxImg.src = photo.src;
        lightboxCaption.textContent = photo.caption;
    }

    // Navigate to next photo
    function showNextPhoto() {
        currentPhotoIndex = (currentPhotoIndex + 1) % filteredPhotos.length;
        const photo = filteredPhotos[currentPhotoIndex];
        lightboxImg.src = photo.src;
        lightboxCaption.textContent = photo.caption;
    }

    // Event listeners for filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterPhotos(button.dataset.filter);
        });
    });

    // Lightbox event listeners
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrevPhoto);
    nextBtn.addEventListener('click', showNextPhoto);

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                showPrevPhoto();
            } else if (e.key === 'ArrowRight') {
                showNextPhoto();
            }
        }
    });

    // Initialize with all photos
    renderPhotos(photos);
});