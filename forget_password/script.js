// HOTSPRING Forget Password - JavaScript with jQuery
// Form Validation and Interactive Animations

$(document).ready(function() {
    
    // Initialize cart count
    let cartCount = 0;
    
    // Email validation pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Load saved email from localStorage if "Remember me" was checked
    loadSavedEmail();

    // Add focus and blur animations to email input
    $('#email').on('focus', function() {
        $(this).parent().addClass('field-focused');
        $(this).animate({ opacity: 1 }, 200);
    });

    $('#email').on('blur', function() {
        $(this).parent().removeClass('field-focused');
    });

    // Real-time email validation
    $('#email').on('input', function() {
        validateEmail($(this).val());
    });

    // Validate email field
    function validateEmail(email) {
        const $emailInput = $('#email');
        const $errorMsg = $emailInput.siblings('.error-message');
        let isValid = true;
        let errorMessage = '';

        // Check if empty
        if (!email || email.trim() === '') {
            isValid = false;
            errorMessage = 'Email address is required';
        }
        // Check email format
        else if (!emailPattern.test(email)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }

        // Update UI based on validation
        if (!isValid) {
            $emailInput.removeClass('success').addClass('error');
            $errorMsg.text(errorMessage).removeClass('hidden').fadeIn(300);
            
            // Shake animation for error
            $emailInput.addClass('shake');
            setTimeout(() => {
                $emailInput.removeClass('shake');
            }, 500);
            
            return false;
        } else {
            $emailInput.removeClass('error').addClass('success');
            $errorMsg.addClass('hidden').fadeOut(300);
            return true;
        }
    }

    // Form submission handler
    $('#forgotPasswordForm').on('submit', function(e) {
        e.preventDefault();
        
        // Hide previous success message
        $('#successMessage').addClass('hidden').fadeOut();

        const email = $('#email').val();
        const rememberMe = $('#rememberMe').is(':checked');

        // Validate email
        if (!validateEmail(email)) {
            // Scroll to error
            $('html, body').animate({
                scrollTop: $('#email').offset().top - 150
            }, 500);
            return;
        }

        // Add loading spinner to button
        const $submitBtn = $(this).find('button[type="submit"]');
        const originalText = $submitBtn.html();
        
        $submitBtn.html('Sending... <span class="spinner"></span>').prop('disabled', true);

        // Simulate API call for password reset
        setTimeout(() => {
            // Remove spinner and restore button
            $submitBtn.html(originalText).prop('disabled', false);

            // Show success message with animation
            $('#successMessage').removeClass('hidden').hide().fadeIn(500);

            // Scroll to success message
            $('html, body').animate({
                scrollTop: $('#successMessage').offset().top - 100
            }, 500);

            // Save or remove email based on "Remember me" checkbox
            if (rememberMe) {
                localStorage.setItem('savedEmail', email);
                showNotification('Your email has been saved for next time', 'info');
            } else {
                localStorage.removeItem('savedEmail');
            }

            // Log data (in production, this would be sent to server)
            console.log('Password reset requested for:', email);
            console.log('Remember me:', rememberMe);

            // Optional: Reset form after success
            // setTimeout(() => {
            //     $(this).trigger('reset');
            //     $('#email').removeClass('success error');
            // }, 3000);

        }, 2000); // Simulate 2 second processing time
    });

    // Load saved email from localStorage
    function loadSavedEmail() {
        const savedEmail = localStorage.getItem('savedEmail');
        if (savedEmail) {
            $('#email').val(savedEmail);
            $('#rememberMe').prop('checked', true);
            
            // Show notification
            showNotification('Welcome back! We remembered your email.', 'info');
            
            // Validate the loaded email
            validateEmail(savedEmail);
        }
    }

    // Remember me checkbox change handler
    $('#rememberMe').on('change', function() {
        const isChecked = $(this).is(':checked');
        
        // Add animation to checkbox label
        $(this).parent().addClass('animate-pulse');
        setTimeout(() => {
            $(this).parent().removeClass('animate-pulse');
        }, 1000);

        if (!isChecked) {
            // Remove saved email when unchecked
            localStorage.removeItem('savedEmail');
        }
    });

    // Cart widget click handler
    $('.cart-widget').on('click', function() {
        $(this).addClass('animate-pulse');
        setTimeout(() => {
            $(this).removeClass('animate-pulse');
        }, 1000);
        
        // Show cart notification
        showNotification('Your cart has ' + cartCount + ' item(s)', 'info');
    });

    // Newsletter form handler
    $('#newsletterForm').on('submit', function(e) {
        e.preventDefault();
        
        const email = $(this).find('input[type="email"]').val();
        
        if (!email || !emailPattern.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Simulate newsletter subscription
        showNotification('Thank you for subscribing to our newsletter!', 'success');
        $(this).trigger('reset');
    });

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        $('.notification').remove();

        const bgColor = {
            'success': 'bg-green-500',
            'error': 'bg-red-500',
            'info': 'bg-blue-500'
        }[type];

        const icon = {
            'success': 'check-circle',
            'error': 'exclamation-circle',
            'info': 'info-circle'
        }[type];

        const $notification = $(`
            <div class="notification fixed top-20 right-4 ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-md">
                <div class="flex items-center">
                    <i class="fas fa-${icon} mr-3"></i>
                    <span>${message}</span>
                </div>
            </div>
        `);

        $('body').append($notification);
        
        // Animate in
        $notification.hide().fadeIn(300);

        // Auto remove after 5 seconds
        setTimeout(() => {
            $notification.fadeOut(300, function() {
                $(this).remove();
            });
        }, 5000);
    }

    // Search functionality
    $('nav input[type="text"]').on('keypress', function(e) {
        if (e.which === 13) { // Enter key
            e.preventDefault();
            const searchTerm = $(this).val();
            if (searchTerm.trim()) {
                showNotification(`Searching for: "${searchTerm}"`, 'info');
                console.log('Search term:', searchTerm);
            }
        }
    });

    $('nav button').on('click', function() {
        const searchTerm = $(this).siblings('input').val();
        if (searchTerm.trim()) {
            showNotification(`Searching for: "${searchTerm}"`, 'info');
            console.log('Search term:', searchTerm);
        }
    });

    // Smooth scroll for all anchor links
    $('a[href^="#"]').on('click', function(e) {
        const target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 800);
        }
    });

    // Add hover effects to navigation items
    $('nav a').on('mouseenter', function() {
        $(this).animate({ paddingLeft: '+=5px' }, 200);
    }).on('mouseleave', function() {
        $(this).animate({ paddingLeft: '-=5px' }, 200);
    });

    // Prevent form submission on Enter key in search
    $('nav input[type="text"]').on('keydown', function(e) {
        if (e.which === 13) {
            e.preventDefault();
        }
    });

    // Email input enhancement - convert to lowercase on blur
    $('#email').on('blur', function() {
        const email = $(this).val().toLowerCase().trim();
        $(this).val(email);
    });

    // Detect and warn about caps lock
    $('#email').on('keypress', function(e) {
        const $input = $(this);
        const s = String.fromCharCode(e.which);
        
        if (s.toUpperCase() === s && s.toLowerCase() !== s && !e.shiftKey) {
            // Caps lock is on
            if (!$input.siblings('.caps-warning').length) {
                const $warning = $('<small class="caps-warning text-yellow-600 text-xs mt-1">⚠ Caps Lock is ON</small>');
                $input.parent().append($warning);
                setTimeout(() => {
                    $warning.fadeOut(300, function() { $(this).remove(); });
                }, 3000);
            }
        }
    });

    // Add email suggestions for common typos
    const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];
    let suggestionTimeout;

    $('#email').on('input', function() {
        clearTimeout(suggestionTimeout);
        const email = $(this).val();
        
        // Remove old suggestions
        $('.email-suggestion').remove();
        
        if (email.includes('@') && email.split('@')[1]) {
            const domain = email.split('@')[1].toLowerCase();
            
            suggestionTimeout = setTimeout(() => {
                commonDomains.forEach(commonDomain => {
                    if (commonDomain.startsWith(domain) && domain !== commonDomain) {
                        const suggestion = email.split('@')[0] + '@' + commonDomain;
                        const $suggestion = $(`
                            <div class="email-suggestion text-sm text-blue-600 mt-1 cursor-pointer hover:text-blue-800">
                                Did you mean <strong>${suggestion}</strong>?
                            </div>
                        `);
                        
                        $suggestion.on('click', function() {
                            $('#email').val(suggestion);
                            $(this).remove();
                            validateEmail(suggestion);
                        });
                        
                        $(this).parent().append($suggestion);
                        return false; // Show only first suggestion
                    }
                });
            }, 500);
        }
    });

    // Add loading animation to page
    $(window).on('load', function() {
        $('body').addClass('loaded');
    });

    // Back to top button
    const $backToTop = $('<button class="back-to-top fixed bottom-8 right-8 bg-red-600 text-white w-12 h-12 rounded-full shadow-lg hidden hover:bg-red-700 transition z-50"><i class="fas fa-arrow-up"></i></button>');
    $('body').append($backToTop);

    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 300) {
            $backToTop.fadeIn();
        } else {
            $backToTop.fadeOut();
        }
    });

    $backToTop.on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 600);
    });

    // Security tips tooltip
    $('.fa-shield-alt').parent().on('mouseenter', function() {
        $(this).addClass('animate-pulse');
    }).on('mouseleave', function() {
        $(this).removeClass('animate-pulse');
    });

    // Console log for debugging
    console.log('✓ HOTSPRING Forget Password page loaded successfully');
    console.log('✓ jQuery version:', $.fn.jquery);
    console.log('✓ Form validation active');
    console.log('✓ Interactive animations enabled');
    console.log('✓ Email remember functionality active');

    // Add a welcome animation
    $('.bg-white.rounded-lg.shadow-lg').hide().fadeIn(800);

    // Animate security notice
    setTimeout(() => {
        $('.bg-blue-50').addClass('animate-bounce');
        setTimeout(() => {
            $('.bg-blue-50').removeClass('animate-bounce');
        }, 1000);
    }, 1500);
});
