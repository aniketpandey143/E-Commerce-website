// Product data - loaded from local JSON structure
        const productsData = [
            {
                id: 1,
                name: 'Smart Everyday Bag Pro',
                image: 'images/Black_messenger_bag_product_34c50f96.png',
                originalPrice: 129,
                salePrice: 89,
                rating: 4.5,
                reviewCount: 128,
                badge: 'NEW'
            },
            {
                id: 2,
                name: 'Travel Durable Backpack',
                image: 'images/Brown_backpack_product_3b7a811b.png',
                originalPrice: 99,
                salePrice: 79,
                rating: 4,
                reviewCount: 95,
                badge: null
            },
            {
                id: 3,
                name: 'Premium Laptop Bag',
                image: 'images/Black_laptop_bag_product_6e3cd3c7.png',
                originalPrice: 149,
                salePrice: 119,
                rating: 5,
                reviewCount: 203,
                badge: 'HOT'
            },
            {
                id: 4,
                name: 'Modern Gym & Sports Bag',
                image: 'images/Orange_gym_bag_product_6441603e.png',
                originalPrice: 69,
                salePrice: 49,
                rating: 4.5,
                reviewCount: 87,
                badge: 'Best Seller'
            },
            {
                id: 5,
                name: 'Waterproof Portable Speaker',
                image: 'images/Black_wireless_speaker_db9a9df6.png',
                originalPrice: 89,
                salePrice: 69,
                rating: 4.5,
                reviewCount: 156,
                badge: 'SALE'
            },
            {
                id: 6,
                name: 'Travel & Sports Jeans',
                image: 'images/Blue_denim_jeans_product_e7f695c4.png',
                originalPrice: 79,
                salePrice: 59,
                rating: 4,
                reviewCount: 78,
                badge: null
            },
            {
                id: 7,
                name: 'Gaming Laptop Pro 15-inch',
                image: 'images/Gaming_laptop_product_c3e344a5.png',
                originalPrice: 1299,
                salePrice: 1099,
                rating: 5,
                reviewCount: 342,
                badge: null
            },
            {
                id: 8,
                name: 'Compact Leather Wallet',
                image: 'images/Brown_leather_wallet_f1499876.png',
                originalPrice: 49,
                salePrice: 39,
                rating: 4.5,
                reviewCount: 234,
                badge: 'SALE'
            }
        ];

        // Categories data
        const categoriesData = [
            { id: 1, name: 'Shirts', image: 'images/Category_shirts_collection_72b24cc5.png' },
            { id: 2, name: 'Bags', image: 'images/Category_bags_collection_ff7b3ffe.png' },
            { id: 3, name: 'Cosmetics', image: 'images/Category_cosmetics_collection_3ab3d31e.png' },
            { id: 4, name: 'Accessories', image: 'images/Category_tech_accessories_5c731beb.png' }
        ];

        // Testimonials data
        const testimonialsData = [
            {
                id: 1,
                name: 'Sarah Johnson',
                role: 'Business Professional',
                image: 'images/Customer_testimonial_portrait_woman_467d595a.png',
                rating: 5,
                review: 'Absolutely love my new laptop bag! The quality is exceptional and it fits all my work essentials perfectly. Highly recommend!'
            },
            {
                id: 2,
                name: 'Michael Chen',
                role: 'Travel Enthusiast',
                image: 'images/Customer_testimonial_portrait_man_1ed74e37.png',
                rating: 5,
                review: 'Best purchase I made this year. The backpack is durable, stylish, and perfect for both work and weekend trips. Worth every penny!'
            },
            {
                id: 3,
                name: 'Emily Davis',
                role: 'Fashion Blogger',
                image: 'images/Customer_testimonial_portrait_woman_467d595a.png',
                rating: 5,
                review: 'The attention to detail is incredible. These bags are not just functional but also make a great fashion statement. Love the collection!'
            }
        ];

        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');

        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });


        // Render categories
        function renderCategories() {
            const categoriesGrid = document.getElementById('categoriesGrid');
            categoriesGrid.innerHTML = categoriesData.map(category => `
                <div class="category-card" onclick="handleCategoryClick('${category.name}')">
                    <img src="${category.image}" alt="${category.name}" loading="lazy">
                    <div class="category-overlay"></div>
                    <div class="category-label">${category.name}</div>
                </div>
            `).join('');
        }


        // Render products
        function renderProducts() {
            const productsGrid = document.getElementById('productsGrid');
            productsGrid.innerHTML = productsData.map(product => {
                const discount = Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100);
                const stars = Array.from({ length: 5 }, (_, i) => 
                    `<i class="fas fa-star ${i < Math.floor(product.rating) ? 'filled' : ''}"></i>`
                ).join('');

                return `
                    <div class="product-card">
                        <div class="product-image">
                            <img src="${product.image}" alt="${product.name}" loading="lazy">
                            ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                            ${discount > 0 ? `<div class="product-discount">-${discount}%</div>` : ''}
                            <button class="product-wishlist" onclick="toggleWishlist(${product.id}, event)" aria-label="Add to wishlist">
                                <i class="far fa-heart"></i>
                            </button>
                        </div>
                        <div class="product-info">
                            <h3 class="product-name">${product.name}</h3>
                            <div class="product-rating">
                                ${stars}
                                <span>(${product.reviewCount})</span>
                            </div>
                            <div class="product-price">
                                <span class="product-price-sale">$${product.salePrice}</span>
                                ${product.originalPrice > product.salePrice ? 
                                    `<span class="product-price-original">$${product.originalPrice}</span>` : ''}
                            </div>
                            <button class="product-add-cart" onclick="addToCart(${product.id})">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        }


        // Render testimonials
        function renderTestimonials() {
            const testimonialsGrid = document.getElementById('testimonialsGrid');
            testimonialsGrid.innerHTML = testimonialsData.map(testimonial => {
                const stars = Array.from({ length: testimonial.rating }, () => 
                    '<i class="fas fa-star"></i>'
                ).join('');

                return `
                    <div class="testimonial-card">
                        <div class="testimonial-header">
                            <img src="${testimonial.image}" alt="${testimonial.name}" class="testimonial-avatar">
                            <div class="testimonial-info">
                                <h3>${testimonial.name}</h3>
                                <p>${testimonial.role}</p>
                            </div>
                        </div>
                        <div class="testimonial-rating">${stars}</div>
                        <p class="testimonial-text">"${testimonial.review}"</p>
                    </div>
                `;
            }).join('');
        }


        // Event handlers
        function handleCategoryClick(categoryName) {
            console.log('Category clicked:', categoryName);
        }

        function toggleWishlist(productId, event) {
            event.stopPropagation();
            const button = event.currentTarget;
            button.classList.toggle('active');
            console.log('Product', productId, 'wishlist toggled');
        }

        function addToCart(productId) {
            console.log('Add to cart: Product', productId);
            alert('Product added to cart!');
        }


        // Newsletter form validation
        const newsletterForm = document.getElementById('newsletterForm');
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            console.log('Newsletter subscription:', email);
            alert('Success! You have been subscribed to our newsletter.');
            emailInput.value = '';
        });


        // Initialize all dynamic content on page load
        document.addEventListener('DOMContentLoaded', () => {
            renderCategories();
            renderProducts();
            renderTestimonials();
            
            // Add click handlers for buttons
            document.querySelectorAll('.hero-buttons .btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    console.log('Hero button clicked:', btn.textContent);
                });
            });

            document.querySelectorAll('.icon-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    console.log('Icon button clicked');
                });
            });


            // Image lazy loading
            if ('loading' in HTMLImageElement.prototype) {
                const images = document.querySelectorAll('img[loading="lazy"]');
                images.forEach(img => {
                    img.src = img.src;
                });
            }
        });