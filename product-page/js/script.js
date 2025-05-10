document.addEventListener('DOMContentLoaded', function() {
    // Product Image Gallery
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevBtn = document.querySelector('.scroll-btn.prev');
    const nextBtn = document.querySelector('.scroll-btn.next');
    const thumbnailContainer = document.querySelector('.thumbnails');

    // Update main image when thumbnail is clicked
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const newImageSrc = this.getAttribute('data-image');
            mainImage.src = newImageSrc;
            
            // Update active thumbnail
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Thumbnail scroll buttons
    if (prevBtn && nextBtn && thumbnailContainer) {
        prevBtn.addEventListener('click', () => {
            thumbnailContainer.scrollBy({ left: -100, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            thumbnailContainer.scrollBy({ left: 100, behavior: 'smooth' });
        });
    }

    // Size Chart Modal
    const sizeChartBtn = document.getElementById('size-chart-btn');
    const sizeChartModal = document.getElementById('size-chart-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');

    if (sizeChartBtn && sizeChartModal) {
        sizeChartBtn.addEventListener('click', () => {
            sizeChartModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });
    }

    // Close modal functions
    function closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = ''; // Re-enable scrolling
    }

    if (closeModalButtons) {
        closeModalButtons.forEach(button => {
            button.addEventListener('click', closeAllModals);
        });
    }

    // Close modal when clicking outside content
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeAllModals();
        }
    });

    // Close modal with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });

    // Color Variants
    const colorSwatches = document.querySelectorAll('.color-swatch');
    
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            const image = this.getAttribute('data-image');
            
            // Update active swatch
            colorSwatches.forEach(s => s.classList.remove('active'));
            this.classList.add('active');
            
            // Update main image if different color is selected
            if (mainImage.src !== image) {
                mainImage.src = image;
                
                // Update active thumbnail to match new color
                thumbnails.forEach(t => {
                    if (t.getAttribute('data-image') === image) {
                        t.classList.add('active');
                    } else {
                        t.classList.remove('active');
                    }
                });
            }
            
            // Save selected color to localStorage
            localStorage.setItem('selectedColor', color);
        });
    });

    // Check for saved color selection
    const savedColor = localStorage.getItem('selectedColor');
    if (savedColor) {
        const savedSwatch = document.querySelector(`.color-swatch[data-color="${savedColor}"]`);
        if (savedSwatch) {
            savedSwatch.click();
        }
    }

    // Size Variant Dropdown
    const sizeSelect = document.getElementById('size-select');
    
    if (sizeSelect) {
        // Check for saved size selection
        const savedSize = localStorage.getItem('selectedSize');
        if (savedSize) {
            sizeSelect.value = savedSize;
        }
        
        sizeSelect.addEventListener('change', function() {
            localStorage.setItem('selectedSize', this.value);
        });
    }

    // Quantity Selector
    const quantityInput = document.querySelector('.quantity-input');
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    
    if (quantityInput && minusBtn && plusBtn) {
        minusBtn.addEventListener('click', () => {
            let currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
        
        plusBtn.addEventListener('click', () => {
            let currentValue = parseInt(quantityInput.value);
            quantityInput.value = currentValue + 1;
        });
    }

    // Product Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabButtons.length > 0 && tabPanes.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Update active tab button
                tabButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Show corresponding tab pane
                tabPanes.forEach(pane => pane.classList.remove('active'));
                document.getElementById(tabId).classList.add('active');
            });
        });
    }

    // Compare Colors Modal
    const compareColorsBtn = document.getElementById('compare-colors-btn');
    const compareColorsModal = document.getElementById('compare-colors-modal');
    const selectColorBtns = document.querySelectorAll('.select-color-btn');
    const selectedColorsContainer = document.querySelector('.selected-colors-container');
    const viewComparisonBtn = document.getElementById('view-comparison-btn');
    let selectedColors = [];
    
    if (compareColorsBtn && compareColorsModal) {
        compareColorsBtn.addEventListener('click', () => {
            compareColorsModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            selectedColors = []; // Reset selection when modal opens
            updateSelectedColorsDisplay();
        });
    }
    
    if (selectColorBtns.length > 0) {
        selectColorBtns.forEach(button => {
            button.addEventListener('click', function() {
                const color = this.getAttribute('data-color');
                
                if (selectedColors.includes(color)) {
                    // Remove color if already selected
                    selectedColors = selectedColors.filter(c => c !== color);
                } else if (selectedColors.length < 2) {
                    // Add color if less than 2 selected
                    selectedColors.push(color);
                }
                
                updateSelectedColorsDisplay();
            });
        });
    }
    
    function updateSelectedColorsDisplay() {
        if (!selectedColorsContainer) return;
        
        selectedColorsContainer.innerHTML = '';
        
        if (selectedColors.length > 0) {
            selectedColors.forEach(color => {
                const colorDiv = document.createElement('div');
                colorDiv.className = 'selected-color';
                
                const preview = document.createElement('div');
                preview.className = `color-preview ${color}`;
                
                const label = document.createElement('p');
                label.textContent = color.charAt(0).toUpperCase() + color.slice(1);
                
                colorDiv.appendChild(preview);
                colorDiv.appendChild(label);
                selectedColorsContainer.appendChild(colorDiv);
            });
            
            if (viewComparisonBtn) {
                viewComparisonBtn.disabled = selectedColors.length < 2;
            }
        } else {
            const message = document.createElement('p');
            message.textContent = 'Select colors to compare';
            message.style.color = 'var(--medium-gray)';
            selectedColorsContainer.appendChild(message);
            if (viewComparisonBtn) {
                viewComparisonBtn.disabled = true;
            }
        }
    }
    
    if (viewComparisonBtn) {
        viewComparisonBtn.addEventListener('click', () => {
            alert(`Comparing ${selectedColors.join(' and ')} colors. In a real implementation, this would show side-by-side product images.`);
            closeAllModals();
        });
    }

    // Product Carousel Scrolling
    const productCarousel = document.querySelector('.product-carousel');
    
    if (productCarousel) {
        let isDown = false;
        let startX;
        let scrollLeft;

        productCarousel.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - productCarousel.offsetLeft;
            scrollLeft = productCarousel.scrollLeft;
        });

        productCarousel.addEventListener('mouseleave', () => {
            isDown = false;
        });

        productCarousel.addEventListener('mouseup', () => {
            isDown = false;
        });

        productCarousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - productCarousel.offsetLeft;
            const walk = (x - startX) * 2;
            productCarousel.scrollLeft = scrollLeft - walk;
        });
    }

    // Add to cart functionality
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard ? productCard.querySelector('h3').textContent : 'Premium Sneakers';
            alert(`${productName} added to cart!`);
        });
    });

    // Bundle add to cart
    const addBundleBtn = document.querySelector('.add-bundle-btn');
    
    if (addBundleBtn) {
        addBundleBtn.addEventListener('click', () => {
            alert('Product bundle added to cart!');
        });
    }
});