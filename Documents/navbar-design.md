# EchoHub Navbar Design

## Design Philosophy

The navbar should be **calm, minimal, and functional** – matching the dark theme aesthetic. It should never compete with content but provide clear navigation and quick access to key actions.

---

## Public Site Navbar (Pre-Login)

### Layout

```
┌─────────────────────────────────────────────────────────────┐
│ [Logo] Features  Pricing  About  Blog    [Login] [Start Free]│
└─────────────────────────────────────────────────────────────┘
```

### Specifications

**Container**:

- Fixed position at top (sticky)
- Background: `rgba(10, 15, 25, 0.8)` with backdrop blur
- Border bottom: 1px solid `rgba(255, 255, 255, 0.08)`
- Height: 64px (desktop), 56px (mobile)
- Padding: 0 24px (desktop), 0 16px (mobile)
- Z-index: 50

**Logo**:

- Position: Left-aligned
- Size: 32px height
- Font: Geist Display, 600 weight
- Color: White
- Hover: Subtle glow effect
- Link to homepage

**Navigation Links**:

- Font: Inter, 15px, 500 weight
- Color: `rgba(255, 255, 255, 0.7)`
- Hover: `rgba(255, 255, 255, 1)` with underline animation
- Spacing: 32px between links
- Active state: White with subtle underline

**Login Button**:

- Style: Ghost button (transparent)
- Border: 1px solid `rgba(255, 255, 255, 0.2)`
- Padding: 8px 16px
- Border radius: 8px
- Hover: Border becomes `rgba(255, 255, 255, 0.4)`

**Start Free Button**:

- Style: Primary CTA
- Background: `oklch(0.65 0.20 250)` (blue accent)
- Color: White
- Padding: 8px 20px
- Border radius: 8px
- Hover: Slight brightness increase + subtle lift
- Font weight: 600

---

## Mobile Public Navbar (< 768px)

### Layout

```
┌─────────────────────────────────┐
│ [Logo]              [☰ Menu]    │
└─────────────────────────────────┘
```

**Hamburger Menu**:

- Icon: Three horizontal lines
- Size: 24px
- Color: White
- Tap area: 44px × 44px (accessibility)

**Mobile Menu (Expanded)**:

```
┌─────────────────────────────────┐
│ [Logo]              [✕ Close]   │
├─────────────────────────────────┤
│                                 │
│  Features                       │
│  Pricing                        │
│  About                          │
│  Blog                           │
│                                 │
│  ─────────────────              │
│                                 │
│  [Login]                        │
│  [Start Free]                   │
│                                 │
└─────────────────────────────────┘
```

**Mobile Menu Specs**:

- Full-screen overlay
- Background: `rgba(10, 15, 25, 0.98)` with backdrop blur
- Animation: Slide down from top (300ms ease-out)
- Links: Larger text (18px), more spacing (24px vertical)
- Buttons: Full width, stacked

---

## Authenticated App Navbar (Post-Login)

### Desktop Layout

```
┌─────────────────────────────────────────────────────────────┐
│ [Logo] Dashboard  Clients  Search    [Upgrade] [Avatar ▾]   │
└─────────────────────────────────────────────────────────────┘
```

### Specifications

**Logo**:

- Same as public site
- Links to `/dashboard`

**Navigation Links**:

- Dashboard, Clients, Search
- Same styling as public nav
- Active state: White with subtle background pill

**Upgrade Button** (Free users only):

- Style: Subtle gradient border
- Text: "Upgrade to Pro"
- Icon: Sparkle or crown
- Color: Accent blue
- Hover: Glow effect

**User Avatar Dropdown**:

- Avatar: 36px circle with user initials or photo
- Border: 1px solid `rgba(255, 255, 255, 0.2)`
- Dropdown trigger: Click or hover
- Dropdown menu:
  ```
  ┌─────────────────────┐
  │ [Name]              │
  │ [Email]             │
  ├─────────────────────┤
  │ Settings            │
  │ Billing             │
  │ Help & Support      │
  ├─────────────────────┤
  │ Logout              │
  └─────────────────────┘
  ```

**Dropdown Specs**:

- Width: 220px
- Background: `rgba(20, 25, 35, 0.95)` with backdrop blur
- Border: 1px solid `rgba(255, 255, 255, 0.1)`
- Border radius: 12px
- Shadow: `0 8px 24px rgba(0, 0, 0, 0.4)`
- Animation: Fade + slide down (200ms)
- Item hover: Subtle background highlight

---

## Mobile Authenticated Navbar (< 768px)

### Layout (Bottom Tab Bar)

```
┌─────────────────────────────────┐
│                                 │
│         [Content Area]          │
│                                 │
└─────────────────────────────────┘
┌─────────────────────────────────┐
│ [🏠] [👥] [🔍] [⚙️]             │
│ Home Clients Search Settings    │
└─────────────────────────────────┘
```

**Bottom Tab Bar Specs**:

- Fixed position at bottom
- Height: 64px
- Background: `rgba(10, 15, 25, 0.95)` with backdrop blur
- Border top: 1px solid `rgba(255, 255, 255, 0.08)`
- 4 tabs: Dashboard, Clients, Search, Settings
- Icon size: 24px
- Label: 11px, below icon
- Active state: Blue accent color + subtle glow
- Inactive state: `rgba(255, 255, 255, 0.5)`

---

## Scroll Behavior

### Public Site

- **Default**: Transparent background with blur
- **On Scroll (> 50px)**: Solid background fades in
- **Scroll Up**: Navbar slides in
- **Scroll Down**: Navbar slides out (hides)
- **Near Top**: Navbar reappears

### Authenticated App

- **Always Visible**: Navbar stays fixed
- **No Hide on Scroll**: Users need constant access to navigation

---

## Interaction States

### Link Hover Animation

```css
.nav-link {
  position: relative;
  transition: color 0.2s ease;
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s ease;
}

.nav-link:hover::after {
  transform: scaleX(1);
}
```

### Button Hover

```css
.nav-button {
  transition: all 0.2s ease;
}

.nav-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
```

### Avatar Dropdown

```css
.dropdown {
  opacity: 0;
  transform: translateY(-8px);
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.dropdown.open {
  opacity: 1;
  transform: translateY(0);
}
```

---

## Accessibility

### Keyboard Navigation

- Tab order: Logo → Links → Buttons → Avatar
- Focus visible: 2px outline with offset
- Escape key: Close mobile menu or dropdown
- Arrow keys: Navigate dropdown items

### Screen Readers

- Logo: `aria-label="EchoHub Home"`
- Mobile menu button: `aria-label="Open navigation menu"`
- Avatar button: `aria-label="User menu"`
- Dropdown: `role="menu"` with `aria-expanded`

### Touch Targets

- Minimum 44px × 44px for all interactive elements
- Adequate spacing between links (minimum 8px)

---

## Dark Theme Integration

### Color Tokens (from globals.css)

```css
--nav-bg: oklch(0.12 0.02 250);
--nav-border: oklch(0.25 0.02 250);
--nav-text: oklch(0.85 0.02 250);
--nav-text-muted: oklch(0.6 0.02 250);
--nav-accent: oklch(0.65 0.2 250);
--nav-hover-bg: oklch(0.18 0.02 250);
```

### Backdrop Blur

- Use `backdrop-filter: blur(12px)` for glass effect
- Fallback: Solid background for browsers without support

---

## Component Structure (React)

### Public Navbar Component

```tsx
// app/components/PublicNavbar.tsx
"use client";

export default function PublicNavbar() {
  return (
    <nav className="fixed top-0 w-full z-50 navbar-glass">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="logo">
          EchoHub
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink href="/features">Features</NavLink>
          <NavLink href="/pricing">Pricing</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/blog">Blog</NavLink>
        </div>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" href="/login">
            Login
          </Button>
          <Button variant="primary" href="/signup">
            Start Free
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" aria-label="Menu">
          <MenuIcon />
        </button>
      </div>
    </nav>
  );
}
```

### Authenticated Navbar Component

```tsx
// app/components/AuthNavbar.tsx
"use client";

export default function AuthNavbar() {
  return (
    <nav className="fixed top-0 w-full z-50 navbar-solid">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/dashboard" className="logo">
          EchoHub
        </Link>

        <div className="flex items-center gap-8">
          <NavLink href="/dashboard">Dashboard</NavLink>
          <NavLink href="/clients">Clients</NavLink>
          <NavLink href="/search">Search</NavLink>
        </div>

        <div className="flex items-center gap-3">
          {isFreeUser && (
            <Button variant="upgrade" href="/pricing">
              Upgrade to Pro
            </Button>
          )}
          <UserMenu />
        </div>
      </div>
    </nav>
  );
}
```

---

## Animation Timing

- **Link hover**: 200ms ease
- **Button hover**: 200ms ease with 1px lift
- **Dropdown open**: 200ms ease-out
- **Mobile menu**: 300ms ease-out
- **Scroll hide/show**: 300ms ease-in-out

---

## Performance Considerations

- Use CSS transforms for animations (GPU-accelerated)
- Lazy load dropdown content
- Debounce scroll events (100ms)
- Preload avatar images
- Use `will-change` sparingly

---

## Testing Checklist

- [ ] Logo links to correct page
- [ ] All navigation links work
- [ ] Mobile menu opens and closes
- [ ] Dropdown opens on click/hover
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Scroll behavior smooth
- [ ] Responsive on all breakpoints
- [ ] Works with screen readers
- [ ] Touch targets adequate on mobile
- [ ] Animations respect `prefers-reduced-motion`

---

## Future Enhancements (Post-MVP)

- Search bar in navbar (authenticated app)
- Notification bell with badge count
- Quick add button (+ icon) for new client/project
- Breadcrumb navigation for deep pages
- Command palette (Cmd+K) for power users
- Theme toggle (light/dark mode)
- Language selector for i18n

---

## Design Tokens (Tailwind Classes)

```tsx
// Navbar container
className =
  "fixed top-0 w-full h-16 bg-[var(--nav-bg)]/80 backdrop-blur-xl border-b border-[var(--nav-border)] z-50";

// Logo
className =
  "text-xl font-semibold text-white hover:opacity-80 transition-opacity";

// Nav link
className =
  "text-[15px] font-medium text-[var(--nav-text-muted)] hover:text-white transition-colors relative nav-link";

// Primary button
className =
  "px-5 py-2 bg-[var(--nav-accent)] text-white rounded-lg font-semibold hover:brightness-110 hover:-translate-y-0.5 transition-all";

// Ghost button
className =
  "px-4 py-2 border border-white/20 text-white rounded-lg hover:border-white/40 transition-colors";

// Avatar
className =
  "w-9 h-9 rounded-full border border-white/20 overflow-hidden cursor-pointer hover:border-white/40 transition-colors";
```

---

## Implementation Priority

**Phase 1 (MVP)**:

- Public navbar with logo, links, CTAs
- Mobile hamburger menu
- Basic authenticated navbar
- User dropdown menu

**Phase 2 (Post-MVP)**:

- Scroll behavior (hide on scroll down)
- Bottom tab bar for mobile app
- Upgrade button for free users
- Smooth animations and transitions

**Phase 3 (Future)**:

- Search in navbar
- Notifications
- Command palette
- Theme toggle
