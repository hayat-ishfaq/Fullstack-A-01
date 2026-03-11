/**
 * HOTSPRING Main Homepage JavaScript
 * Handles slider initialization, cart management, search, and interactive features
 */

// ===================================
// Global Variables
// ===================================
let cart = [];
let wishlist = [];

// ===================================
// Initialize on Page Load
// ===================================
$(document).ready(function() {
    // Initialize Swiper slider
    initializeSlider();
    
    // Load cart from localStorage
    loadCart();
    
    // Load wishlist from localStorage
    loadWishlist();
    
    // Attach event listeners
    attachEventListeners();
    
    // Initialize animations
    initializeAnimations();
    
    console.log('HOTSPRING Homepage initialized successfully!');
});

// ===================================
// Swiper Slider Initialization
// ===================================
function initializeSlider() {
    const swiper = new Swiper('.heroSwiper', {
        // Slider parameters
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        speed: 800,
        
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        
        // Pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        
        // Effects
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        
        // Responsive breakpoints
        breakpoints: {
            640: {
                effect: 'slide',
            },
        },
    });
    
    console.log('Slider initialized');
}

// ===================================
// Cart Management
// ===================================

/**
 * Load cart from localStorage
 */
function loadCart() {
    const savedCart = localStorage.getItem('hotspring_cart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
            updateCartCount();
        } catch (e) {
            console.error('Error loading cart:', e);
            cart = [];
        }
    }
}

/**
 * Save cart to localStorage
 */
function saveCart() {
    localStorage.setItem('hotspring_cart', JSON.stringify(cart));
    updateCartCount();
}

/**
 * Update cart count in header
 */
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    $('#cart-count').text(totalItems);
    
    // Animate cart count
    $('#cart-count').addClass('pulse');
    setTimeout(() => {
        $('#cart-count').removeClass('pulse');
    }, 500);
}

/**
 * Add item to cart
 */
function addToCart(productId, productName, price) {
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: price,
            quantity: 1
        });
    }
    
    saveCart();
    
    // Show success notification
    showNotification('success', 'Added to Cart', `${productName} has been added to your cart.`);
    
    // Animate the add to cart button
    const button = event.target.closest('button');
    $(button).addClass('scale-110');
    setTimeout(() => {
        $(button).removeClass('scale-110');
    }, 300);
}

/**
 * Remove item from cart
 */
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    showNotification('info', 'Removed from Cart', 'Item has been removed from your cart.');
}

/**
 * Clear entire cart
 */
function clearCart() {
    cart = [];
    saveCart();
    showNotification('info', 'Cart Cleared', 'All items have been removed from your cart.');
}

// ===================================
// Wishlist Management
// ===================================

/**
 * Load wishlist from localStorage
 */
function loadWishlist() {
    const savedWishlist = localStorage.getItem('hotspring_wishlist');
    if (savedWishlist) {
        try {
            wishlist = JSON.parse(savedWishlist);
        } catch (e) {
            console.error('Error loading wishlist:', e);
            wishlist = [];
        }
    }
}

/**
 * Save wishlist to localStorage
 */
function saveWishlist() {
    localStorage.setItem('hotspring_wishlist', JSON.stringify(wishlist));
}

/**
 * Add item to wishlist
 */
function addToWishlist(productId, productName, price) {
    // Check if item already exists
    const existingItem = wishlist.find(item => item.id === productId);
    
    if (!existingItem) {
        wishlist.push({
            id: productId,
            name: productName,
            price: price
        });
        saveWishlist();
        showNotification('success', 'Added to Wishlist', `${productName} has been added to your wishlist.`);
    } else {
        showNotification('info', 'Already in Wishlist', `${productName} is already in your wishlist.`);
    }
}

/**
 * Remove item from wishlist
 */
function removeFromWishlist(productId) {
    wishlist = wishlist.filter(item => item.id !== productId);
    saveWishlist();
    showNotification('info', 'Removed from Wishlist', 'Item has been removed from your wishlist.');
}

// ===================================
// Event Listeners
// ===================================
function attachEventListeners() {
    // Add to Cart buttons
    $(document).on('click', '.add-to-cart-btn', function(e) {
        e.preventDefault();
        
        const productCard = $(this).closest('.product-card');
        const productId = 'product_' + Math.random().toString(36).substr(2, 9);
        const productName = productCard.find('h3').text();
        const priceText = productCard.find('.text-2xl').text();
        const price = parseFloat(priceText.replace('$', '').replace(',', ''));
        
        addToCart(productId, productName, price);
    });
    
    // Add to Wishlist links
    $(document).on('click', 'a[href="#"]:contains("ADD TO WISHLIST")', function(e) {
        e.preventDefault();
        
        const productCard = $(this).closest('.product-card');
        const productId = 'product_' + Math.random().toString(36).substr(2, 9);
        const productName = productCard.find('h3').text();
        const priceText = productCard.find('.text-2xl').text();
        const price = parseFloat(priceText.replace('$', '').replace(',', ''));
        
        addToWishlist(productId, productName, price);
    });
    
    // Cart widget click
    $('.cart-widget').on('click', function() {
        showCartModal();
    });
    
    // Newsletter form submission
    $('#newsletterForm').on('submit', function(e) {
        e.preventDefault();
        
        const email = $(this).find('input[type="email"]').val();
        
        if (validateEmail(email)) {
            // Simulate API call
            showLoadingOverlay();
            
            setTimeout(() => {
                hideLoadingOverlay();
                showNotification('success', 'Subscribed!', 'Thank you for subscribing to our newsletter.');
                $(this).find('input[type="email"]').val('');
            }, 1500);
        } else {
            showNotification('error', 'Invalid Email', 'Please enter a valid email address.');
        }
    });
    
    // Search functionality
    $('nav input[type="text"]').on('keypress', function(e) {
        if (e.which === 13) { // Enter key
            e.preventDefault();
            const searchTerm = $(this).val();
            performSearch(searchTerm);
        }
    });
    
    $('nav button:contains("Search")').on('click', function(e) {
        e.preventDefault();
        const searchTerm = $(this).prev('input').val();
        performSearch(searchTerm);
    });
    
    // Promo card clicks
    $('.promo-card').on('click', function() {
        const title = $(this).find('h3').text();
        showNotification('info', 'Promotion', `Learn more about ${title}`);
    });
    
    // Product card "More Details" links
    $(document).on('click', 'a[href="#"]:contains("MORE DETAILS")', function(e) {
        e.preventDefault();
        
        const productCard = $(this).closest('.product-card');
        const productName = productCard.find('h3').text();
        
        showProductModal(productName);
    });
    
    // Smooth scroll for anchor links
    $('a[href^="#"]').on('click', function(e) {
        const target = $(this).attr('href');
        if (target !== '#' && $(target).length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $(target).offset().top - 100
            }, 800);
        }
    });
}

// ===================================
// Search Functionality
// ===================================
function performSearch(searchTerm) {
    if (!searchTerm || searchTerm.trim() === '') {
        showNotification('error', 'Empty Search', 'Please enter a search term.');
        return;
    }
    
    showLoadingOverlay();
    
    // Simulate search API call
    setTimeout(() => {
        hideLoadingOverlay();
        showNotification('info', 'Search Results', `Searching for "${searchTerm}"...`);
        console.log('Search term:', searchTerm);
        
        // In a real application, this would filter products or redirect to search results page
    }, 1000);
}

// ===================================
// Modal Functions
// ===================================

/**
 * Show cart modal
 */
function showCartModal() {
    let modalHTML = `
        <div class="modal-overlay" id="cartModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="text-2xl font-bold text-gray-800">
                        <i class="fas fa-shopping-cart text-red-600 mr-2"></i>
                        Shopping Cart
                    </h2>
                    <button class="modal-close" onclick="closeModal('cartModal')">&times;</button>
                </div>
                <div class="modal-body">
    `;
    
    if (cart.length === 0) {
        modalHTML += `
            <div class="text-center py-8">
                <i class="fas fa-shopping-cart text-gray-300 text-6xl mb-4"></i>
                <p class="text-gray-600 text-lg">Your cart is empty</p>
                <p class="text-gray-500 text-sm mt-2">Add some products to get started!</p>
            </div>
        `;
    } else {
        let total = 0;
        
        modalHTML += '<div class="space-y-4 mb-6">';
        
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            modalHTML += `
                <div class="flex justify-between items-center border-b pb-3">
                    <div class="flex-1">
                        <h4 class="font-semibold text-gray-800">${item.name}</h4>
                        <p class="text-sm text-gray-600">$${item.price.toFixed(2)} × ${item.quantity}</p>
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="font-bold text-red-600">$${itemTotal.toFixed(2)}</span>
                        <button onclick="removeFromCart('${item.id}')" class="text-red-600 hover:text-red-700">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        });
        
        modalHTML += '</div>';
        
        modalHTML += `
            <div class="border-t pt-4">
                <div class="flex justify-between items-center text-xl font-bold mb-4">
                    <span>Total:</span>
                    <span class="text-red-600">$${total.toFixed(2)}</span>
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <button onclick="closeModal('cartModal')" class="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition">
                        Continue Shopping
                    </button>
                    <button onclick="checkout()" class="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition">
                        Checkout
                    </button>
                </div>
                <button onclick="clearCart(); closeModal('cartModal');" class="w-full mt-2 text-red-600 py-2 text-sm hover:underline">
                    Clear Cart
                </button>
            </div>
        `;
    }
    
    modalHTML += `
                </div>
            </div>
        </div>
    `;
    
    $('body').append(modalHTML);
}

/**
 * Show product details modal
 */
function showProductModal(productName) {
    const modalHTML = `
        <div class="modal-overlay" id="productModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="text-2xl font-bold text-gray-800">${productName}</h2>
                    <button class="modal-close" onclick="closeModal('productModal')">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="mb-4">
                        <div class="bg-gray-100 h-64 flex items-center justify-center rounded-lg mb-4">
                            <svg width="200" height="150" viewBox="0 0 200 150">
                                <rect x="20" y="40" width="160" height="80" rx="10" fill="#4A90E2"/>
                                <rect x="30" y="35" width="140" height="10" rx="5" fill="#357ABD"/>
                                <ellipse cx="100" cy="50" rx="60" ry="8" fill="#87CEEB" opacity="0.7"/>
                            </svg>
                        </div>
                        <p class="text-gray-600 mb-4">The goals of our stores are very reliable and fair and we care about the customer. This is a premium spa with excellent features.</p>
                        <div class="mb-4">
                            <h3 class="font-bold text-gray-800 mb-2">Features:</h3>
                            <ul class="list-disc list-inside text-gray-600 space-y-1">
                                <li>Extra Large and Deep Design</li>
                                <li>158 Jet Super Spa System</li>
                                <li>TV + Home Theater Integration</li>
                                <li>Energy Efficient Heating</li>
                                <li>LED Lighting System</li>
                            </ul>
                        </div>
                        <div class="text-3xl font-bold text-red-600 mb-4">$500.00</div>
                        <button onclick="closeModal('productModal')" class="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition">
                            <i class="fas fa-shopping-cart mr-2"></i>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    $('body').append(modalHTML);
}

/**
 * Close modal
 */
function closeModal(modalId) {
    $('#' + modalId).fadeOut(300, function() {
        $(this).remove();
    });
}

/**
 * Checkout function
 */
function checkout() {
    showLoadingOverlay();
    
    setTimeout(() => {
        hideLoadingOverlay();
        closeModal('cartModal');
        showNotification('success', 'Checkout', 'Proceeding to checkout...');
        
        // In a real application, redirect to checkout page
        console.log('Checkout with items:', cart);
    }, 1500);
}

// ===================================
// Notification System
// ===================================

/**
 * Show notification toast
 * @param {string} type - success, error, or info
 * @param {string} title - Notification title
 * @param {string} message - Notification message
 */
function showNotification(type, title, message) {
    const iconMap = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };
    
    const icon = iconMap[type] || iconMap.info;
    
    const notificationHTML = `
        <div class="notification-toast ${type}">
            <div class="notification-icon">
                <i class="fas ${icon}"></i>
            </div>
            <div class="notification-content">
                <h4>${title}</h4>
                <p>${message}</p>
            </div>
            <span class="notification-close">&times;</span>
        </div>
    `;
    
    const $notification = $(notificationHTML);
    $('body').append($notification);
    
    // Close button
    $notification.find('.notification-close').on('click', function() {
        $notification.fadeOut(300, function() {
            $(this).remove();
        });
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        $notification.fadeOut(300, function() {
            $(this).remove();
        });
    }, 5000);
}

// ===================================
// Loading Overlay
// ===================================

/**
 * Show loading overlay
 */
function showLoadingOverlay() {
    const overlayHTML = `
        <div class="loading-overlay" id="loadingOverlay">
            <div class="spinner"></div>
        </div>
    `;
    $('body').append(overlayHTML);
}

/**
 * Hide loading overlay
 */
function hideLoadingOverlay() {
    $('#loadingOverlay').fadeOut(300, function() {
        $(this).remove();
    });
}

// ===================================
// Validation Functions
// ===================================

/**
 * Validate email address
 */
function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

// ===================================
// Animation Functions
// ===================================

/**
 * Initialize scroll animations
 */
function initializeAnimations() {
    // Animate elements on scroll
    $(window).on('scroll', function() {
        $('.product-card, .promo-card').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('animate-fadeIn');
            }
        });
    });
    
    // Trigger initial check
    $(window).trigger('scroll');
}

// ===================================
// Utility Functions
// ===================================

/**
 * Format currency
 */
function formatCurrency(amount) {
    return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

/**
 * Generate unique ID
 */
function generateId() {
    return 'id_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
}

/**
 * Debounce function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===================================
// Export functions to global scope
// ===================================
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.clearCart = clearCart;
window.addToWishlist = addToWishlist;
window.removeFromWishlist = removeFromWishlist;
window.closeModal = closeModal;
window.checkout = checkout;
window.showNotification = showNotification;
window.showLoadingOverlay = showLoadingOverlay;
window.hideLoadingOverlay = hideLoadingOverlay;

// ===================================
// Console Welcome Message
// ===================================
console.log('%c🔥 HOTSPRING Portable Spas', 'color: #dc2626; font-size: 24px; font-weight: bold;');
console.log('%cWelcome to our homepage!', 'color: #4b5563; font-size: 14px;');
console.log('%cCart:', 'color: #059669; font-weight: bold;', cart);
console.log('%cWishlist:', 'color: #3b82f6; font-weight: bold;', wishlist);
