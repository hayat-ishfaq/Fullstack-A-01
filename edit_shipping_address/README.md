# HOTSPRING - Edit Shipping Address Page

A fully responsive, interactive shipping address edit page built with **Tailwind CSS**, **jQuery**, and **JavaScript**.

## 🚀 Features

### ✨ Design & Layout
- **Fully Responsive** - Works perfectly on desktop, tablet, and mobile devices
- **Modern UI** - Clean, professional design using Tailwind CSS
- **Smooth Animations** - Interactive animations for better user experience
- **Accessibility** - Keyboard navigation and focus-visible states

### 📝 Form Validation
- **Real-time Validation** - Instant feedback as users type
- **Comprehensive Rules**:
  - First Name & Last Name: Letters only, minimum 2 characters
  - Email: Valid email format required
  - Phone: Auto-formatting with validation
  - City & State: Letters only
  - Zip Code: Auto-formatting
  - Country: Dropdown selection required
- **Visual Feedback** - Success/error states with color indicators
- **Error Messages** - Clear, helpful error messages
- **Shake Animation** - Fields shake on validation error

### 🎯 Interactive Features
- **Auto-formatting**:
  - Phone numbers (xxx-xxx-xxxx format)
  - Zip codes (xxxxx-xxxx format)
  - Auto-capitalization for names and cities
- **Caps Lock Detection** - Warns users when Caps Lock is on
- **Character Counter** - Optional character limit display
- **Loading States** - Visual feedback during form submission
- **Success Messages** - Animated confirmation after successful submission
- **Smooth Scrolling** - Automatic scroll to errors or success messages

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
edit_shipping_address/
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
    ├── background-pattern.svg # Subtle background pattern
    ├── showcase.html          # Assets preview/showcase page
    └── README.md              # Assets documentation
```

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **Tailwind CSS** (CDN) - Utility-first CSS framework
- **jQuery 3.6.0** (CDN) - JavaScript library for DOM manipulation
- **Font Awesome 6.4.0** (CDN) - Icon library
- **Vanilla JavaScript** - Custom interactivity

## 🎨 Color Scheme

- Primary: Red (#DC2626)
- Secondary: Slate/Gray
- Success: Green (#16A34A)
- Error: Red (#DC2626)
- Background: Gray (#F3F4F6) with subtle pattern

## 🖼️ Assets

All visual assets are custom-created SVG files located in the `assets/` directory:

### Logo & Branding
- **favicon.svg** - Compact 32x32 icon for browser tabs
- **logo-full.svg** - Complete 200x200 logo with hot spring and spa elements

### UI Elements
- **loading.svg** - Animated circular spinner for loading states
- **success.svg** - Animated checkmark for success confirmations
- **background-pattern.svg** - Subtle tileable pattern for page background

### Inline SVG Assets
The page also uses inline SVG elements for:
- Partner brand logos (OceanicSpa, Caldera Spas, Island Spas)
- Payment method icons (Visa, Mastercard, Amex, PayPal)
- Main header logo with spa icon

**View All Assets**: Open `assets/showcase.html` to see a visual gallery of all assets with usage examples.

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚦 How to Use

1. **Open the page**:
   - Open `index.html` in any modern web browser
   - Or use a local server for better performance

2. **View assets showcase**:
   - Open `assets/showcase.html` to see all visual assets
   - Preview all SVG icons, logos, and patterns

3. **Fill out the form**:
   - All fields marked with * are required
   - Real-time validation provides immediate feedback
   - Error messages guide you to correct any issues

3. **Submit the form**:
   - Click "UPDATE ADDRESS" button
   - Form validates all fields before submission
   - Success message displays upon valid submission

## ⚡ Key JavaScript Functions

### Form Validation
```javascript
validateField(fieldName, value, $element)
```
Validates individual fields against defined rules

### Validation Rules
- Required fields check
- Minimum length validation
- Pattern matching (regex)
- Custom error messages

### Interactive Features
- Real-time input validation
- Auto-formatting (phone, zip code)
- Smooth animations and transitions
- Toast notifications
- Loading states

## 🎯 Validation Rules

| Field | Required | Pattern | Min Length |
|-------|----------|---------|------------|
| First Name | ✓ | Letters only | 2 |
| Last Name | ✓ | Letters only | 2 |
| Email | ✓ | Valid email | - |
| Phone | ✓ | Numbers, spaces, dashes | 10 |
| City | ✓ | Letters only | 2 |
| State | ✓ | Any text | 2 |
| Zip Code | ✓ | Numbers, dashes | 4 |
| Country | ✓ | Selection required | - |

## 🔄 Form Submission Flow

1. User fills out form fields
2. Real-time validation on each input
3. Visual feedback (color change, error messages)
4. Click "UPDATE ADDRESS"
5. Final validation of all fields
6. Loading spinner displays
7. Simulated API call (2 seconds)
8. Success message appears
9. Scroll to success message

## 🎨 Animations

- **Fade In**: Page load, success messages
- **Slide Down**: Error messages
- **Shake**: Invalid fields
- **Pulse**: Button focus states
- **Scale**: Hover effects
- **Smooth Scroll**: Navigation and error focusing

## 🔧 Customization

### Modify Validation Rules
Edit the `validationRules` object in `script.js`:

```javascript
const validationRules = {
    fieldName: {
        required: true,
        minLength: 2,
        pattern: /regex/,
        message: 'Custom error message'
    }
};
```

### Change Colors
Modify Tailwind classes or add custom CSS in `style.css`

### Add New Fields
1. Add HTML input in `index.html`
2. Add validation rule in `script.js`
3. Style as needed in `style.css`

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Opera (latest)

## 📝 Notes

- Form submission is currently simulated (no backend)
- Console logs show submitted data
- All validation happens client-side
- Ready for backend integration
- AJAX can be added for real API calls

## 🚀 Future Enhancements

- [ ] Address autocomplete API integration
- [ ] Google Maps integration
- [ ] Save multiple addresses
- [ ] Address validation API
- [ ] Real backend integration
- [ ] Progressive web app (PWA) features
- [ ] Dark mode support

## 📄 License

This project is part of the HOTSPRING Portable Spas website.

## 👨‍💻 Author

Created for Fullstack Development Assignment

---

**Note**: This is a front-end implementation. For production use, integrate with a backend API for data persistence and server-side validation.
