# Mobile Web App Layout

## Overview

EchoHub now features a fully responsive mobile web app layout that provides a native app-like experience on mobile devices.

## Features Implemented

### 1. **Responsive Navigation**

- **Desktop (lg+)**: Traditional sidebar navigation on the left
- **Mobile (<lg)**: Bottom navigation bar with icon + label
- Smooth transitions between layouts
- Active state indicators

### 2. **Mobile Header**

- Fixed header at the top on mobile devices
- EchoHub branding
- Hamburger menu for user options
- Logout functionality in slide-out menu

### 3. **Touch Optimizations**

- Minimum 44px tap targets for all interactive elements
- Active state feedback with scale animations
- Removed hover effects on touch devices
- Prevented text selection on UI elements
- Smooth scrolling with momentum

### 4. **Responsive Spacing**

- Adaptive padding: `p-4 md:p-6 lg:p-8`
- Responsive gaps in grids: `gap-3 md:gap-4 lg:gap-6`
- Mobile-friendly card sizes
- Optimized font sizes for mobile

### 5. **Safe Area Support**

- iOS safe area insets for notched devices
- Bottom navigation respects safe areas
- Top header respects status bar

### 6. **PWA Configuration**

- Web app manifest (`/manifest.json`)
- Standalone display mode
- Theme color configuration
- App shortcuts for quick access
- Installable on home screen

## Component Structure

```
DashboardLayout
├── Sidebar (hidden on mobile)
├── MobileHeader (visible on mobile only)
├── Main Content (responsive padding)
└── MobileNav (visible on mobile only)
```

## Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md)
- **Desktop**: > 1024px (lg)

## Key CSS Classes

### Mobile-Specific

- `lg:hidden` - Hide on desktop, show on mobile
- `hidden lg:block` - Hide on mobile, show on desktop
- `active:scale-95` - Touch feedback
- `safe-area-inset-bottom` - iOS safe area

### Responsive Sizing

- Text: `text-3xl md:text-4xl`
- Padding: `p-4 md:p-6 lg:p-8`
- Gaps: `gap-3 md:gap-4 lg:gap-6`
- Rounded: `rounded-xl md:rounded-2xl`

## Pages Updated

1. **Dashboard** (`/dashboard`)

   - 2-column grid on mobile for stats
   - Responsive card sizes
   - Touch-friendly buttons

2. **Clients** (`/dashboard/clients`)

   - Stacked filters on mobile
   - Single column grid on mobile
   - Full-width action buttons

3. **Client Hub** (`/dashboard/clients/[clientId]`)

   - Mobile-optimized tabs
   - Responsive modals
   - Touch-friendly forms

4. **Project Detail** (`/dashboard/clients/[clientId]/projects/[projectId]`)
   - Mobile-friendly layout
   - Responsive sections

## Testing Checklist

- [ ] Test on iPhone (Safari)
- [ ] Test on Android (Chrome)
- [ ] Test on iPad (Safari)
- [ ] Test landscape orientation
- [ ] Test "Add to Home Screen"
- [ ] Test bottom navigation
- [ ] Test mobile menu
- [ ] Test touch interactions
- [ ] Test safe area insets
- [ ] Test form inputs on mobile

## Future Enhancements

1. **Gestures**

   - Swipe to delete
   - Pull to refresh
   - Swipe between tabs

2. **Offline Support**

   - Service worker
   - Offline data caching
   - Sync when online

3. **Native Features**

   - Push notifications
   - Share API
   - Camera access for file uploads
   - Biometric authentication

4. **Performance**
   - Image optimization
   - Lazy loading
   - Code splitting
   - Reduced bundle size

## Browser Support

- iOS Safari 14+
- Chrome Mobile 90+
- Samsung Internet 14+
- Firefox Mobile 90+

## Installation Instructions

### iOS (Safari)

1. Open EchoHub in Safari
2. Tap the Share button
3. Tap "Add to Home Screen"
4. Tap "Add"

### Android (Chrome)

1. Open EchoHub in Chrome
2. Tap the menu (⋮)
3. Tap "Add to Home Screen"
4. Tap "Add"

## Notes

- The app uses CSS custom properties for theming
- All colors adapt to dark mode
- Touch targets meet WCAG 2.1 AA standards (44x44px minimum)
- Viewport is locked to prevent zooming for app-like feel
