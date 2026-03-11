// Notification System
function showNotification(type, title, message) {
    const notification = $('#notification');
    const icon = $('#notificationIcon');
    const titleEl = $('#notificationTitle');
    const messageEl = $('#notificationMessage');

    // Set icon based on type
    const icons = {
        success: '<i class="fas fa-check-circle text-green-500"></i>',
        error: '<i class="fas fa-times-circle text-red-500"></i>',
        info: '<i class="fas fa-info-circle text-blue-500"></i>',
        warning: '<i class="fas fa-exclamation-circle text-yellow-500"></i>'
    };

    icon.html(icons[type] || icons.info);
    titleEl.text(title);
    messageEl.text(message);

    notification.removeClass('hidden').addClass('show');

    setTimeout(() => {
        notification.removeClass('show').addClass('hide');
        setTimeout(() => {
            notification.addClass('hidden').removeClass('hide');
        }, 400);
    }, 3000);
}

// Form Validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Login Form Handling
$('#loginForm').on('submit', function(e) {
    e.preventDefault();
    
    const email = $('#loginEmail').val().trim();
    const password = $('#loginPassword').val();
    const rememberMe = $('#rememberMe').is(':checked');

    // Reset previous error states
    $('#loginEmail, #loginPassword').removeClass('input-error input-success');

    // Validation
    let hasError = false;

    if (!email) {
        $('#loginEmail').addClass('input-error');
        hasError = true;
    } else if (!validateEmail(email)) {
        $('#loginEmail').addClass('input-error');
        showNotification('error', 'Invalid Email', 'Please enter a valid email address.');
        hasError = true;
    } else {
        $('#loginEmail').addClass('input-success');
    }

    if (!password) {
        $('#loginPassword').addClass('input-error');
        hasError = true;
    } else if (password.length < 6) {
        $('#loginPassword').addClass('input-error');
        showNotification('error', 'Invalid Password', 'Password must be at least 6 characters long.');
        hasError = true;
    } else {
        $('#loginPassword').addClass('input-success');
    }

    if (hasError) {
        return;
    }

    // Simulate login process
    const submitBtn = $(this).find('button[type="submit"]');
    const originalText = submitBtn.html();
    submitBtn.html('SIGNING IN... <span class="spinner"></span>').prop('disabled', true);

    setTimeout(() => {
        // Store credentials if remember me is checked
        if (rememberMe) {
            localStorage.setItem('rememberedEmail', email);
            localStorage.setItem('rememberMe', 'true');
        } else {
            localStorage.removeItem('rememberedEmail');
            localStorage.removeItem('rememberMe');
        }

        showNotification('success', 'Login Successful', 'Welcome back! Redirecting to your account...');
        
        submitBtn.html(originalText).prop('disabled', false);

        // Simulate redirect
        setTimeout(() => {
            console.log('Redirecting to account page...');
            // window.location.href = '/account'; // Uncomment for actual redirect
        }, 1500);
    }, 1500);
});

// Create Account Button
$('#createAccountBtn').on('click', function() {
    showNotification('info', 'Create Account', 'Redirecting to registration page...');
    setTimeout(() => {
        console.log('Redirecting to registration page...');
        // window.location.href = '/register'; // Uncomment for actual redirect
    }, 1000);
});

// Load remembered email on page load
$(document).ready(function() {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    const rememberMe = localStorage.getItem('rememberMe');

    if (rememberMe === 'true' && rememberedEmail) {
        $('#loginEmail').val(rememberedEmail);
        $('#rememberMe').prop('checked', true);
    }
});

// Forgot Password Link
$('a[href="#"]:contains("Forgot your password?")').on('click', function(e) {
    e.preventDefault();
    showNotification('info', 'Password Reset', 'Password reset instructions will be sent to your email.');
});

// Product Carousel Navigation
let scrollAmount = 0;
const carousel = $('#productsCarousel');

$('#nextBtn').on('click', function() {
    scrollAmount += 220; // Width of product card + gap
    if (scrollAmount > carousel[0].scrollWidth - carousel[0].clientWidth) {
        scrollAmount = carousel[0].scrollWidth - carousel[0].clientWidth;
    }
    carousel.animate({
        scrollLeft: scrollAmount
    }, 300);
});

$('#prevBtn').on('click', function() {
    scrollAmount -= 220;
    if (scrollAmount < 0) {
        scrollAmount = 0;
    }
    carousel.animate({
        scrollLeft: scrollAmount
    }, 300);
});

// Update scroll amount when user manually scrolls
carousel.on('scroll', function() {
    scrollAmount = this.scrollLeft;
});

// Search Functionality
$('nav button:contains("SEARCH")').on('click', function() {
    const searchQuery = $('#searchInput').val().trim();
    if (searchQuery) {
        showNotification('info', 'Searching', `Searching for "${searchQuery}"...`);
        // Implement actual search logic here
        console.log('Search query:', searchQuery);
    } else {
        showNotification('warning', 'Empty Search', 'Please enter a search term.');
    }
});

// Search on Enter key
$('#searchInput').on('keypress', function(e) {
    if (e.which === 13) { // Enter key
        $('nav button:contains("SEARCH")').click();
    }
});

// Cart Button
$('button:contains("My Cart")').on('click', function() {
    showNotification('info', 'Shopping Cart', 'Your cart is currently empty.');
});

// Newsletter Form
$('footer form').on('submit', function(e) {
    e.preventDefault();
    const email = $(this).find('input[type="email"]').val().trim();
    
    if (!email) {
        showNotification('warning', 'Email Required', 'Please enter your email address.');
        return;
    }
    
    if (!validateEmail(email)) {
        showNotification('error', 'Invalid Email', 'Please enter a valid email address.');
        return;
    }

    showNotification('success', 'Subscribed!', 'Thank you for subscribing to our newsletter.');
    $(this).find('input[type="email"]').val('');
});

// Item Comparison Buttons
$(document).on('click', 'button:contains("Item Comparison")', function() {
    showNotification('info', 'Item Comparison', 'This product has been added to comparison list.');
});

// Social Media Links
$('footer a[href*="twitter"], footer a[href*="facebook"], footer a[href*="linkedin"], footer a[href*="google"], footer a[href*="youtube"], footer a[href*="pinterest"]').on('click', function(e) {
    e.preventDefault();
    const platform = $(this).find('i').attr('class').match(/fa-(\w+)/)[1];
    showNotification('info', 'Social Media', `Opening ${platform} page...`);
});

// Smooth scroll for navigation
$('a[href^="#"]').on('click', function(e) {
    const target = $(this.getAttribute('href'));
    if (target.length) {
        e.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top - 100
        }, 500);
    }
});

// Real-time email validation
$('#loginEmail').on('blur', function() {
    const email = $(this).val().trim();
    if (email && !validateEmail(email)) {
        $(this).addClass('input-error');
    } else if (email) {
        $(this).removeClass('input-error').addClass('input-success');
    }
});

// Password visibility toggle (add button if needed)
let passwordVisible = false;
$(document).on('click', '.toggle-password', function() {
    passwordVisible = !passwordVisible;
    const passwordField = $('#loginPassword');
    passwordField.attr('type', passwordVisible ? 'text' : 'password');
    $(this).find('i').toggleClass('fa-eye fa-eye-slash');
});

// Add password toggle icon dynamically
$('#loginPassword').parent().addClass('relative');
$('#loginPassword').after('<button type="button" class="toggle-password absolute right-3 top-10 text-gray-500 hover:text-gray-700"><i class="fas fa-eye"></i></button>');

// Loading Screen Enhancement
$(window).on('load', function() {
    console.log('Login page loaded successfully');
});

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// Analytics tracking (placeholder)
function trackEvent(category, action, label) {
    console.log(`Analytics: ${category} - ${action} - ${label}`);
    // Integrate with Google Analytics or other analytics service
}

// Track button clicks
$('button, a').on('click', function() {
    const element = $(this).text().trim() || $(this).attr('href');
    trackEvent('User Interaction', 'Click', element);
});

// Input focus tracking
$('input').on('focus', function() {
    const fieldName = $(this).attr('id') || $(this).attr('name') || 'Unknown Field';
    trackEvent('Form Interaction', 'Focus', fieldName);
});

console.log('Login page scripts initialized');
