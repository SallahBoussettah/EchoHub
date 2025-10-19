# EchoHub Testing Guide

## Quick Start Testing

### 1. Start the Application

```bash
# Terminal 1 - Backend
cd backend
npm run start:dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 2. Access the App

- **Desktop**: http://localhost:3000
- **Mobile**: http://[your-ip]:3000

## Desktop Testing

### Dashboard

1. Navigate to `/dashboard`
2. Check stats display correctly
3. Click on client cards
4. Verify upcoming deadlines
5. Check recent projects

### Clients

1. Navigate to `/dashboard/clients`
2. Click "Add Client" button
3. Fill form and submit
4. Verify client appears in list
5. Click on a client card
6. Test all tabs (Overview, Projects, Notes, Files)

### Projects

1. From client hub, go to Projects tab
2. Click "Add Project"
3. Create a project with milestones
4. Click on project card
5. Test milestone completion
6. Test AI summary generation
7. Test notes and file uploads

### Search

1. Navigate to `/dashboard/search`
2. Search for clients
3. Search for projects
4. Test filters (All/Clients/Projects)

### Settings

1. Navigate to `/dashboard/settings`
2. Test all tabs
3. Update profile
4. Check AI usage display
5. Test notification toggles

## Mobile Testing

### Resize Browser Window

1. Open Chrome DevTools (F12)
2. Click device toolbar (Ctrl+Shift+M)
3. Select "iPhone 12 Pro" or similar
4. Test all features

### Real Device Testing

#### Get Your Local IP

```bash
# Windows
ipconfig

# Mac/Linux
ifconfig
```

#### Access on Mobile

1. Connect phone to same WiFi
2. Open browser on phone
3. Go to `http://[your-ip]:3000`
4. Test all features

### Mobile Features to Test

#### Bottom Navigation

- [ ] All 4 nav items work
- [ ] Active state highlights correctly
- [ ] Icons are visible
- [ ] Labels are readable

#### Mobile Header

- [ ] Logo is visible
- [ ] Menu button works
- [ ] Slide-out menu appears
- [ ] Logout works

#### Touch Interactions

- [ ] All buttons are tappable
- [ ] No accidental taps
- [ ] Buttons scale on tap
- [ ] Forms are usable

#### Layout

- [ ] No horizontal scroll
- [ ] Content fits screen
- [ ] Cards are readable
- [ ] Spacing looks good

#### PWA Installation

- [ ] Install prompt appears
- [ ] App installs successfully
- [ ] Icon appears on home screen
- [ ] App opens in standalone mode

## Feature Testing Checklist

### Authentication

- [ ] Sign up with new account
- [ ] Log in with existing account
- [ ] Log out
- [ ] Protected routes redirect to login

### Client Management

- [ ] Create client
- [ ] View client details
- [ ] Edit client
- [ ] Delete client (with confirmation)
- [ ] Filter clients by status
- [ ] Search clients

### Project Management

- [ ] Create project
- [ ] View project details
- [ ] Edit project
- [ ] Delete project (with confirmation)
- [ ] Add milestones
- [ ] Complete milestones
- [ ] Delete milestones
- [ ] Update project status

### Notes

- [ ] Add note to client
- [ ] Edit note
- [ ] Delete note (with confirmation)
- [ ] Add note to project
- [ ] View all notes

### Files

- [ ] Upload file to client
- [ ] Download file
- [ ] Delete file (with confirmation)
- [ ] Upload file to project
- [ ] File size limit works (10MB)

### AI Summaries

- [ ] Generate summary for project
- [ ] View summary in modal
- [ ] Copy summary to clipboard
- [ ] Check AI usage counter
- [ ] Verify 24-hour cache

### Search

- [ ] Search finds clients
- [ ] Search finds projects
- [ ] Search finds notes
- [ ] Filter by type works
- [ ] Results link correctly

### Dashboard

- [ ] Stats display correctly
- [ ] Upcoming deadlines show
- [ ] Recent projects show
- [ ] Recent clients show
- [ ] All links work

### Settings

- [ ] Update profile name
- [ ] Update email
- [ ] Change password
- [ ] Toggle notifications
- [ ] View AI usage
- [ ] View current plan

## Error Testing

### Network Errors

1. Stop backend server
2. Try to create client
3. Verify error toast appears
4. Restart backend
5. Verify app recovers

### Validation Errors

1. Try to submit empty forms
2. Verify validation messages
3. Try invalid email format
4. Try short password

### Edge Cases

1. Upload file > 10MB
2. Create project without deadline
3. Delete client with projects
4. Generate AI summary multiple times

## Performance Testing

### Load Times

- [ ] Dashboard loads < 2 seconds
- [ ] Client list loads < 1 second
- [ ] Search results appear instantly
- [ ] AI summary generates < 5 seconds

### Smooth Animations

- [ ] Page transitions are smooth
- [ ] Modal open/close is smooth
- [ ] Toast notifications slide in
- [ ] Bottom nav transitions smoothly

### Memory Usage

- [ ] No memory leaks
- [ ] App stays responsive
- [ ] No console errors

## Browser Testing

### Desktop Browsers

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile Browsers

- [ ] Safari iOS (14+)
- [ ] Chrome Android (90+)
- [ ] Samsung Internet (14+)
- [ ] Firefox Mobile (90+)

## Accessibility Testing

### Keyboard Navigation

- [ ] Tab through all elements
- [ ] Enter/Space activate buttons
- [ ] Escape closes modals
- [ ] Focus visible on all elements

### Screen Reader

- [ ] All images have alt text
- [ ] Buttons have labels
- [ ] Forms have labels
- [ ] Headings are hierarchical

### Color Contrast

- [ ] Text is readable
- [ ] Buttons are visible
- [ ] Links are distinguishable
- [ ] Focus states are visible

## Security Testing

### Authentication

- [ ] Can't access dashboard without login
- [ ] Token expires correctly
- [ ] Logout clears token
- [ ] Can't access other users' data

### Input Validation

- [ ] XSS protection works
- [ ] SQL injection prevented
- [ ] File upload validation works
- [ ] Form validation works

## Bug Reporting Template

```markdown
## Bug Description

[Clear description of the bug]

## Steps to Reproduce

1. Go to...
2. Click on...
3. See error...

## Expected Behavior

[What should happen]

## Actual Behavior

[What actually happens]

## Environment

- Device: [iPhone 12, Desktop, etc.]
- Browser: [Safari, Chrome, etc.]
- OS: [iOS 15, Windows 11, etc.]

## Screenshots

[If applicable]

## Console Errors

[If any]
```

## Common Issues & Solutions

### Issue: Bottom nav not showing

**Solution**: Check screen width is < 1024px

### Issue: PWA not installing

**Solution**: Must use HTTPS or localhost

### Issue: File upload fails

**Solution**: Check file size < 10MB

### Issue: AI summary not generating

**Solution**: Check Gemini API key in .env

### Issue: Search returns no results

**Solution**: Check database has data

### Issue: Mobile menu not opening

**Solution**: Check z-index and click handler

## Test Data

### Sample Clients

```
Name: Acme Corp
Email: contact@acme.com
Company: Acme Corporation
Status: ACTIVE

Name: Tech Startup
Email: hello@techstartup.io
Company: Tech Startup Inc
Status: ACTIVE
```

### Sample Projects

```
Title: Website Redesign
Description: Complete redesign of company website
Status: IN_PROGRESS
Deadline: [Next month]

Title: Mobile App Development
Description: Build iOS and Android apps
Status: NOT_STARTED
Deadline: [Next quarter]
```

## Automated Testing (Future)

### Unit Tests

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

### E2E Tests

```bash
# Playwright
npm run test:e2e
```

### Integration Tests

```bash
# API tests
npm run test:api
```

---

## Quick Test Checklist

**Before Launch:**

- [ ] All features work on desktop
- [ ] All features work on mobile
- [ ] PWA installs correctly
- [ ] No console errors
- [ ] No broken links
- [ ] Forms validate correctly
- [ ] Error messages display
- [ ] Success messages display
- [ ] Loading states work
- [ ] Authentication works
- [ ] Data persists correctly

**Ready to launch!** 🚀
