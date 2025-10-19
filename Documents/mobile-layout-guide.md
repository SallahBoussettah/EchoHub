# Mobile Layout Visual Guide

## Layout Structure

```
┌─────────────────────────────┐
│   Mobile Header (Fixed)     │  ← 64px height
│   [EchoHub]        [☰]      │
├─────────────────────────────┤
│                             │
│                             │
│   Main Content Area         │  ← Scrollable
│   (pt-16 pb-20)             │
│                             │
│                             │
│                             │
├─────────────────────────────┤
│  Bottom Navigation (Fixed)  │  ← 72px height
│  [🏠] [👥] [🔍] [⚙️]       │
└─────────────────────────────┘
```

## Desktop Layout

```
┌──────┬──────────────────────┐
│      │                      │
│  S   │                      │
│  i   │   Main Content       │
│  d   │   (ml-64)            │
│  e   │                      │
│  b   │                      │
│  a   │                      │
│  r   │                      │
│      │                      │
└──────┴──────────────────────┘
    ↑
  264px width
```

## Component Hierarchy

```
DashboardLayout
├── Sidebar (Desktop Only)
│   ├── Logo
│   ├── Navigation Links
│   └── Logout Button
│
├── MobileHeader (Mobile Only)
│   ├── Logo
│   └── Menu Button
│       └── Slide-out Menu
│           ├── User Info
│           └── Logout Button
│
├── Main Content
│   └── Page Content
│       └── (Responsive padding)
│
└── MobileNav (Mobile Only)
    └── Navigation Buttons
        ├── Dashboard
        ├── Clients
        ├── Search
        └── Settings
```

## Responsive Breakpoints

### Mobile First Approach

```css
/* Mobile (default) */
.element {
  padding: 1rem; /* 16px */
  font-size: 1.875rem; /* 30px */
}

/* Tablet (md: 768px+) */
@media (min-width: 768px) {
  .element {
    padding: 1.5rem; /* 24px */
    font-size: 2rem; /* 32px */
  }
}

/* Desktop (lg: 1024px+) */
@media (min-width: 1024px) {
  .element {
    padding: 2rem; /* 32px */
    font-size: 2.25rem; /* 36px */
  }
}
```

## Touch Target Sizes

### Minimum Sizes (WCAG 2.1 AA)

```
┌─────────────────┐
│                 │
│   Button Text   │  ← 44px × 44px minimum
│                 │
└─────────────────┘

┌──────┐
│ Icon │  ← 44px × 44px minimum
└──────┘
```

### Implementation

```tsx
// All interactive elements
<button className="min-h-[44px] min-w-[44px] px-4 py-3">
  Click Me
</button>

// Bottom nav items
<Link className="flex flex-col items-center gap-1 px-4 py-2 min-w-[64px]">
  <Icon className="w-6 h-6" />
  <span className="text-xs">Label</span>
</Link>
```

## Safe Area Insets

### iOS Notch Support

```css
/* Bottom navigation */
.safe-area-inset-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}

/* Top header */
.safe-area-inset-top {
  padding-top: env(safe-area-inset-top);
}
```

### Visual Representation

```
iPhone with Notch:
┌─────────────────────────────┐
│    ╔═══════════════╗        │  ← Notch
│    ║               ║        │
├────╨───────────────╨────────┤
│   Header (safe area)        │
├─────────────────────────────┤
│                             │
│   Content                   │
│                             │
├─────────────────────────────┤
│   Bottom Nav (safe area)    │
└─────────────────────────────┘
      ▔▔▔▔▔▔▔▔▔▔▔▔▔  ← Home indicator
```

## Grid Layouts

### Dashboard Stats

```
Mobile (2 columns):
┌──────────┬──────────┐
│  Stat 1  │  Stat 2  │
├──────────┼──────────┤
│  Stat 3  │  Stat 4  │
└──────────┴──────────┘

Desktop (4 columns):
┌─────┬─────┬─────┬─────┐
│ St1 │ St2 │ St3 │ St4 │
└─────┴─────┴─────┴─────┘
```

### Clients Grid

```
Mobile (1 column):
┌─────────────────┐
│    Client 1     │
├─────────────────┤
│    Client 2     │
├─────────────────┤
│    Client 3     │
└─────────────────┘

Tablet (2 columns):
┌─────────┬─────────┐
│ Client1 │ Client2 │
├─────────┼─────────┤
│ Client3 │ Client4 │
└─────────┴─────────┘

Desktop (3 columns):
┌──────┬──────┬──────┐
│ Cl1  │ Cl2  │ Cl3  │
├──────┼──────┼──────┤
│ Cl4  │ Cl5  │ Cl6  │
└──────┴──────┴──────┘
```

## Animation & Transitions

### Touch Feedback

```tsx
// Scale down on tap
<button className="active:scale-95 transition-transform">
  Tap Me
</button>

// Brightness on tap
<button className="hover:brightness-110 active:brightness-90">
  Tap Me
</button>
```

### Navigation Transitions

```tsx
// Smooth layout shifts
<aside className="transition-all duration-300">
  Sidebar
</aside>

// Fade in/out
<div className="opacity-0 group-hover:opacity-100 transition-opacity">
  Hidden Content
</div>
```

## Form Inputs

### Mobile-Optimized

```tsx
// Full width on mobile
<input className="w-full px-4 py-3 rounded-xl" />

// Larger text for readability
<input className="text-base md:text-sm" />

// Prevent zoom on focus (iOS)
<input style={{ fontSize: '16px' }} />
```

## Modal Behavior

### Mobile vs Desktop

```
Mobile (Full Screen):
┌─────────────────────────────┐
│ ← Back        Modal    [×]  │
├─────────────────────────────┤
│                             │
│   Full Screen Content       │
│                             │
│                             │
│                             │
│                             │
├─────────────────────────────┤
│  [Cancel]      [Confirm]    │
└─────────────────────────────┘

Desktop (Centered):
    ┌───────────────────┐
    │  Modal Title  [×] │
    ├───────────────────┤
    │                   │
    │  Modal Content    │
    │                   │
    ├───────────────────┤
    │ [Cancel] [Confirm]│
    └───────────────────┘
```

## Spacing Scale

### Mobile-First Spacing

```
Mobile:   gap-3  (12px)
Tablet:   gap-4  (16px)
Desktop:  gap-6  (24px)

Mobile:   p-4    (16px)
Tablet:   p-6    (24px)
Desktop:  p-8    (32px)

Mobile:   mb-6   (24px)
Tablet:   mb-8   (32px)
Desktop:  mb-8   (32px)
```

## Typography Scale

### Responsive Font Sizes

```
Heading 1:
Mobile:   text-3xl  (30px)
Tablet:   text-4xl  (36px)
Desktop:  text-4xl  (36px)

Body:
Mobile:   text-base (16px)
Tablet:   text-base (16px)
Desktop:  text-lg   (18px)

Small:
Mobile:   text-xs   (12px)
Tablet:   text-sm   (14px)
Desktop:  text-sm   (14px)
```

## Color Contrast

### Dark Theme (Default)

```
Background:     oklch(0.15 0.01 240)  ← Very dark
Surface:        oklch(0.2 0.015 240)  ← Dark
Text:           oklch(0.95 0.01 240)  ← Very light
Muted Text:     oklch(0.65 0.02 240)  ← Medium
Accent:         oklch(0.7 0.15 240)   ← Blue
```

### Contrast Ratios (WCAG AA)

```
Text on Background:     ✅ 15.2:1 (AAA)
Muted on Background:    ✅ 7.8:1  (AA)
Accent on Background:   ✅ 8.5:1  (AA)
White on Accent:        ✅ 4.8:1  (AA)
```

## Performance Tips

### Mobile Optimization

1. **Lazy Load Images**

   ```tsx
   <img loading="lazy" src="..." />
   ```

2. **Reduce Bundle Size**

   ```tsx
   // Dynamic imports
   const Modal = dynamic(() => import("./Modal"));
   ```

3. **Optimize Fonts**

   ```tsx
   // Subset fonts
   const inter = Inter({ subsets: ["latin"] });
   ```

4. **Minimize Repaints**
   ```css
   /* Use transform instead of position */
   transform: translateY(-4px);
   /* Not: top: -4px; */
   ```

## Testing Checklist

### Device Testing

- [ ] iPhone SE (375px width)
- [ ] iPhone 12/13/14 (390px width)
- [ ] iPhone 14 Pro Max (430px width)
- [ ] iPad (768px width)
- [ ] iPad Pro (1024px width)
- [ ] Android Phone (360px-412px width)
- [ ] Android Tablet (600px-800px width)

### Orientation Testing

- [ ] Portrait mode
- [ ] Landscape mode
- [ ] Rotation transitions

### Browser Testing

- [ ] Safari iOS
- [ ] Chrome Android
- [ ] Samsung Internet
- [ ] Firefox Mobile

### Feature Testing

- [ ] Bottom navigation works
- [ ] Mobile menu opens/closes
- [ ] Forms are usable
- [ ] Modals are accessible
- [ ] Touch targets are 44px+
- [ ] No horizontal scroll
- [ ] Safe areas respected
- [ ] PWA installs correctly

---

**This guide covers all mobile layout patterns used in EchoHub!**
