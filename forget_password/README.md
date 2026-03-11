# HOTSPRING - Forget Your Password Page

A fully responsive, secure password reset page built with **Tailwind CSS**, **jQuery**, and **JavaScript**.

## 🚀 Features

### ✨ Design & Layout
- **Fully Responsive** - Works perfectly on desktop, tablet, and mobile devices
- **Modern UI** - Clean, professional design using Tailwind CSS
- **Smooth Animations** - Interactive animations for better user experience
- **Security-Focused** - Clear security notices and best practices
- **Accessibility** - Keyboard navigation and focus-visible states

### 📝 Form Features
- **Email Validation** - Real-time email format validation
- **Remember Me** - Save email for future visits using localStorage
- **Auto-suggestions** - Smart email domain suggestions for common typos
- **Visual Feedback** - Success/error states with color indicators
- **Error Messages** - Clear, helpful error messages
- **Shake Animation** - Email field shakes on validation error
- **Caps Lock Detection** - Warns users when Caps Lock is active

### 🎯 Interactive Features
- **Email Icon** - Dynamic email icon that changes color on focus
- **Auto-formatting** - Email converted to lowercase on blur
- **Loading States** - Visual feedback during form submission
- **Success Messages** - Animated confirmation after successful submission
- **Smooth Scrolling** - Automatic scroll to errors or success messages
- **Email Persistence** - Remembers email if "Remember me" is checked
- **Smart Suggestions** - Suggests common email domains (gmail.com, yahoo.com, etc.)

### 🛡️ Security Features
- **Security Notice Panel** - Clear instructions about:
  - Link expiration (24 hours)
  - Spam folder check reminder
  - Never share reset links
  - Contact support if suspicious
- **Secure Processing** - Professional password reset flow
- **Additional Links** - Quick access to Sign In and Create Account

### 🛒 Additional Components
- **Shopping Cart Widget** - Displays cart item count
- **Search Functionality** - Working search bar
- **Newsletter Subscription** - Email validation for newsletter signup
- **Social Media Links** - Animated social media icons
- **Partner Logos** - Hover effects on partner logos
- **Back to Top Button** - Appears on scroll
- **Notification System** - Toast-style notifications

## 📁 File Structure

```
forget_password/
│
├── index.html          # Main HTML file with complete page structure
├── style.css          # Custom CSS with animations and effects
├── script.js          # JavaScript/jQuery for validation and interactivity
├── README.md          # Documentation (this file)
└── assets/            # All visual assets
    ├── favicon.svg            # Browser tab icon (32x32)
    ├── logo-full.svg          # Full brand logo (200x200)
    ├── loading.svg            # Animated loading spinner
    ├── success.svg            # Success checkmark animation
    ├── password-reset.svg     # Password reset icon with lock
    └── background-pattern.svg # Subtle background pattern
```

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **Tailwind CSS** (CDN) - Utility-first CSS framework
- **jQuery 3.6.0** (CDN) - JavaScript library for DOM manipulation
- **Font Awesome 6.4.0** (CDN) - Icon library
- **Vanilla JavaScript** - Custom interactivity
- **LocalStorage API** - Email persistence

## 🎨 Color Scheme

- Primary: Red (#DC2626)
- Secondary: Slate/Gray
- Success: Green (#10B981)
- Info: Blue (#3B82F6)
- Error: Red (#DC2626)
- Background: Gray (#F3F4F6) with subtle pattern

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚦 How to Use

1. **Open the page**:
   - Open `index.html` in any modern web browser
   - Or use a local server for better performance

2. **Enter your email**:
   - Type your registered email address
   - Real-time validation provides immediate feedback
   - Smart suggestions help correct common typos

3. **Check "Remember me" (optional)**:
   - Your email will be saved for next time
   - Stored securely in browser's localStorage

4. **Submit the form**:
   - Click "SUBMIT" button
   - Form validates email before submission
   - Success message confirms email was sent

5. **Check your inbox**:
   - Look for password reset email
   - Check spam folder if not received
   - Link expires in 24 hours

## ⚡ Key JavaScript Functions

### Email Validation
```javascript
validateEmail(email)
```
Validates email format in real-time

### Email Persistence
```javascript
loadSavedEmail()
```
Loads saved email from localStorage if "Remember me" was checked

### Smart Suggestions
```javascript
// Suggests common email domains
commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', ...]
```

### Notification System
```javascript
showNotification(message, type)
```
Displays toast notifications (success, error, info)

## 🎯 Form Flow

1. User enters email address
2. Real-time validation checks format
3. Optional: Check "Remember me"
4. Click "SUBMIT"
5. Loading spinner displays
6. Simulated API call (2 seconds)
7. Success message appears
8. Email saved if "Remember me" checked
9. Scroll to success message

## 🎨 Animations

- **Fade In**: Page load, success messages
- **Slide Down**: Error messages
- **Shake**: Invalid email field
- **Pulse**: Button focus states, security notice
- **Bounce**: Security notice animation
- **Scale**: Hover effects on buttons
- **Smooth Scroll**: Navigation and error focusing
- **Checkmark Draw**: Success icon animation

## 🔧 Customization

### Modify Email Suggestions
Edit the `commonDomains` array in `script.js`:

```javascript
const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
```

### Change Colors
Modify Tailwind classes or add custom CSS in `style.css`

### Adjust Link Expiration Time
Update the security notice text in `index.html`

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Opera (latest)
- ✅ IE11+ (with polyfills)

## 🔐 Security Best Practices

### Implemented:
- ✅ Clear security notices
- ✅ Email validation (client-side)
- ✅ Link expiration warning
- ✅ Spam folder reminder
- ✅ No password exposure

### Recommended for Production:
- [ ] Server-side email validation
- [ ] Rate limiting (prevent spam)
- [ ] CAPTCHA integration
- [ ] Email verification before sending
- [ ] Secure token generation
- [ ] HTTPS enforcement
- [ ] CSRF protection
- [ ] Audit logging

## 📝 Notes

- Form submission is currently simulated (no backend)
- Console logs show submitted data
- All validation happens client-side
- Ready for backend integration
- LocalStorage used for "Remember me" feature
- AJAX can be added for real API calls

## 🚀 Backend Integration

To integrate with a backend API:

```javascript
// Replace the setTimeout in script.js with:
$.ajax({
    url: '/api/forgot-password',
    method: 'POST',
    data: { email: email },
    success: function(response) {
        // Show success message
    },
    error: function(xhr) {
        // Show error message
    }
});
```

## 🔄 Future Enhancements

- [ ] Two-factor authentication option
- [ ] SMS verification alternative
- [ ] Password strength meter
- [ ] Account recovery questions
- [ ] Multi-language support
- [ ] Dark mode support
- [ ] Progressive web app (PWA) features
- [ ] Biometric authentication

## 📊 Testing Checklist

- [ ] Email validation works correctly
- [ ] "Remember me" saves/loads email
- [ ] Success message displays after submission
- [ ] Error messages show for invalid emails
- [ ] Responsive design on all devices
- [ ] Smooth animations and transitions
- [ ] Back to top button works
- [ ] Newsletter subscription works
- [ ] Search functionality works
- [ ] All links are clickable

## 🆘 Support

For issues or questions:
- Email: services@yourhotspainc.com
- Phone: 888 - 201 - 8889
- Available 24/7

## 📄 License

This project is part of the HOTSPRING Portable Spas website.

## 👨‍💻 Author

Created for Fullstack Development Assignment

---

**Note**: This is a front-end implementation. For production use, integrate with a backend API for actual password reset functionality, email sending, and server-side validation.

## 🔗 Related Pages

- **Edit Shipping Address** - Update delivery information
- **Login** - Sign in to your account
- **Register** - Create a new account
- **My Account** - Manage your profile

---

**Security First**: Always use HTTPS in production and implement proper backend security measures.
