# Assets Directory

This directory contains all the visual assets for the HOTSPRING Edit Shipping Address page.

## 📁 Files

### Logo Files
- **favicon.svg** - 32x32 favicon for browser tabs
- **logo-full.svg** - 200x200 full logo with spa elements
  - Contains hot spring symbol with steam
  - Spa bubbles and wave patterns
  - Red and white color scheme

### UI Elements
- **loading.svg** - Animated loading spinner
  - Red circular spinner with rotation animation
  - Used during form submission
  
- **success.svg** - Success checkmark icon
  - Green circle with animated checkmark
  - Displays on successful form submission

- **background-pattern.svg** - Subtle background pattern
  - Light red circular pattern
  - Low opacity for subtle effect
  - Tile-able design

## 🎨 Design Specifications

### Color Palette
- **Primary Red**: #DC2626
- **White**: #FFFFFF
- **Success Green**: #10B981
- **Background**: Pattern with 2-3% opacity

### Logo Elements
- Hot spring symbol (circle with steam)
- Spa bubbles representing water
- Wave patterns for flow
- Registerred trademark styling

## 📐 Dimensions

| Asset | Size | Format |
|-------|------|--------|
| Favicon | 32x32 | SVG |
| Full Logo | 200x200 | SVG |
| Loading Spinner | 50x50 | SVG (animated) |
| Success Icon | 100x100 | SVG (animated) |
| Background Pattern | 100x100 (tileable) | SVG |

## 🔧 Usage

### In HTML
```html
<!-- Favicon -->
<link rel="icon" type="image/svg+xml" href="assets/favicon.svg">

<!-- Full Logo -->
<img src="assets/logo-full.svg" alt="HOTSPRING Logo" class="w-20 h-20">

<!-- Loading Spinner -->
<img src="assets/loading.svg" alt="Loading..." class="inline-block">

<!-- Success Icon -->
<img src="assets/success.svg" alt="Success" class="w-16 h-16">
```

### In CSS
```css
/* Background Pattern */
body {
    background-image: url('assets/background-pattern.svg');
    background-repeat: repeat;
}
```

## ✨ Features

### SVG Advantages
- ✅ Scalable without quality loss
- ✅ Small file size
- ✅ CSS customizable
- ✅ Animation support
- ✅ Responsive design ready

### Animations
- **Loading Spinner**: Continuous 360° rotation
- **Success Checkmark**: Draw-in animation on display

## 🎯 Browser Support

All assets are in SVG format and support:
- ✅ Chrome
- ✅ Firefox  
- ✅ Safari
- ✅ Edge
- ✅ Opera
- ✅ Mobile browsers

## 📝 Notes

- All SVGs are optimized for web use
- Inline styling for better performance
- No external dependencies
- Accessibility-friendly with proper titles/descriptions
- Can be easily customized by editing SVG code

## 🔄 Future Assets

Consider adding:
- [ ] Social media profile images
- [ ] Product showcase images
- [ ] Background hero images
- [ ] Icon set for features
- [ ] Print-ready logo versions (PDF, PNG)

---

**Created for**: HOTSPRING Portable Spas Website
**Format**: SVG (Scalable Vector Graphics)
**License**: Project specific
