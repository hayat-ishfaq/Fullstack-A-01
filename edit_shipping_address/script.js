// HOTSPRING Edit Shipping Address - JavaScript with jQuery
// Form Validation and Interactive Animations

$(document).ready(function() {
    
    // Initialize cart count
    let cartCount = 0;
    
    // Form validation rules
    const validationRules = {
        firstName: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'Please enter a valid first name (letters only, minimum 2 characters)'
        },
        lastName: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'Please enter a valid last name (letters only, minimum 2 characters)'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        phone: {
            required: true,
            pattern: /^[\d\s\-\+\(\)]+$/,
            minLength: 10,
            message: 'Please enter a valid phone number (minimum 10 digits)'
        },
        city: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'Please enter a valid city name'
        },
        state: {
            required: true,
            minLength: 2,
            message: 'Please enter a valid state'
        },
        zipCode: {
            required: true,
            pattern: /^[\d\s\-]+$/,
            minLength: 4,
            message: 'Please enter a valid zip code'
        },
        country: {
            required: true,
            message: 'Please select a country'
        }
    };

    // Add focus and blur animations to all form inputs
    $('input, select').on('focus', function() {
        $(this).parent().addClass('field-focused');
        $(this).animate({ 
            opacity: 1 
        }, 200);
    });

    $('input, select').on('blur', function() {
        $(this).parent().removeClass('field-focused');
    });

    // Real-time validation on input
    $('input, select').on('input change', function() {
        const fieldName = $(this).attr('name');
        validateField(fieldName, $(this).val(), $(this));
    });

    // Validate individual field
    function validateField(fieldName, value, $element) {
        const rules = validationRules[fieldName];
        
        if (!rules) return true;

        const $errorMsg = $element.siblings('.error-message');
        let isValid = true;
        let errorMessage = '';

        // Required check
        if (rules.required && (!value || value.trim() === '')) {
            isValid = false;
            errorMessage = `${formatFieldName(fieldName)} is required`;
        }
        // Min length check
        else if (rules.minLength && value.length < rules.minLength) {
            isValid = false;
            errorMessage = `${formatFieldName(fieldName)} must be at least ${rules.minLength} characters`;
        }
        // Pattern check
        else if (rules.pattern && !rules.pattern.test(value)) {
            isValid = false;
            errorMessage = rules.message;
        }

        // Update UI based on validation
        if (!isValid) {
            $element.removeClass('success').addClass('error');
            $errorMsg.text(errorMessage).removeClass('hidden').fadeIn(300);
            
            // Shake animation for error
            $element.addClass('shake');
            setTimeout(() => {
                $element.removeClass('shake');
            }, 500);
        } else {
            $element.removeClass('error').addClass('success');
            $errorMsg.addClass('hidden').fadeOut(300);
        }

        return isValid;
    }

    // Format field name for display
    function formatFieldName(fieldName) {
        return fieldName
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase());
    }

    // Form submission handler
    $('#shippingForm').on('submit', function(e) {
        e.preventDefault();
        
        // Hide previous success message
        $('#successMessage').addClass('hidden').fadeOut();

        let isFormValid = true;

        // Validate all fields
        $(this).find('input, select').each(function() {
            const fieldName = $(this).attr('name');
            const value = $(this).val();
            
            if (!validateField(fieldName, value, $(this))) {
                isFormValid = false;
            }
        });

        // If form is valid, submit
        if (isFormValid) {
            // Add loading spinner to button
            const $submitBtn = $(this).find('button[type="submit"]');
            const originalText = $submitBtn.html();
            
            $submitBtn.html('Processing... <span class="spinner"></span>').prop('disabled', true);

            // Simulate API call
            setTimeout(() => {
                // Remove spinner and restore button
                $submitBtn.html(originalText).prop('disabled', false);

                // Show success message with animation
                $('#successMessage').removeClass('hidden').hide().fadeIn(500);

                // Scroll to success message
                $('html, body').animate({
                    scrollTop: $('#successMessage').offset().top - 100
                }, 500);

                // Log form data (in production, this would be sent to server)
                const formData = $(this).serializeArray();
                console.log('Form Data Submitted:', formData);

                // Optional: Reset form after success
                // $(this).trigger('reset');
                // $('input, select').removeClass('success error');

            }, 2000); // Simulate 2 second processing time
        } else {
            // Scroll to first error
            const $firstError = $('.error').first();
            if ($firstError.length) {
                $('html, body').animate({
                    scrollTop: $firstError.offset().top - 150
                }, 500);
            }
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
        
        if (!email || !validationRules.email.pattern.test(email)) {
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

        const $notification = $(`
            <div class="notification fixed top-20 right-4 ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-md">
                <div class="flex items-center">
                    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} mr-3"></i>
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

    // Form field character counter (optional enhancement)
    function addCharacterCounter($input, maxLength) {
        const $counter = $('<small class="text-gray-500 text-xs mt-1"></small>');
        $input.parent().append($counter);
        
        $input.on('input', function() {
            const length = $(this).val().length;
            $counter.text(`${length}/${maxLength} characters`);
            
            if (length > maxLength) {
                $counter.addClass('text-red-600');
            } else {
                $counter.removeClass('text-red-600');
            }
        });
    }

    // Enable character counter for specific fields
    // addCharacterCounter($('#firstName'), 50);
    // addCharacterCounter($('#lastName'), 50);

    // Prevent form submission on Enter key (except in textarea)
    $('#shippingForm').on('keypress', function(e) {
        if (e.which === 13 && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            return false;
        }
    });

    // Auto-format phone number (US format)
    $('#phone').on('input', function() {
        let value = $(this).val().replace(/\D/g, '');
        
        if (value.length > 0) {
            if (value.length <= 3) {
                value = value;
            } else if (value.length <= 6) {
                value = value.slice(0, 3) + '-' + value.slice(3);
            } else {
                value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
            }
        }
        
        $(this).val(value);
    });

    // Auto-format zip code
    $('#zipCode').on('input', function() {
        let value = $(this).val().replace(/\D/g, '');
        
        if (value.length > 5) {
            value = value.slice(0, 5) + '-' + value.slice(5, 9);
        }
        
        $(this).val(value);
    });

    // Capitalize first letter of text inputs
    $('#firstName, #lastName, #city, #state').on('blur', function() {
        const value = $(this).val();
        const capitalized = value.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
        $(this).val(capitalized);
    });

    // Detect and warn about caps lock
    $('input[type="text"], input[type="email"]').on('keypress', function(e) {
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

    // Add loading animation to page
    $(window).on('load', function() {
        $('body').addClass('loaded');
    });

    // Lazy load images (if needed)
    $('img').each(function() {
        $(this).on('load', function() {
            $(this).addClass('loaded');
        });
    });

    // Parallax effect for header (optional)
    $(window).on('scroll', function() {
        const scrolled = $(window).scrollTop();
        $('header').css('transform', 'translateY(' + (scrolled * 0.5) + 'px)');
    });

    // Back to top button (optional)
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

    // Console log for debugging
    console.log('✓ HOTSPRING Edit Shipping Address page loaded successfully');
    console.log('✓ jQuery version:', $.fn.jquery);
    console.log('✓ Form validation active');
    console.log('✓ Interactive animations enabled');

    // Add a welcome animation
    $('.bg-white.rounded-lg.shadow-lg').hide().fadeIn(800);
});
