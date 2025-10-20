# Mobile Testing Guide - Local Network Access

## Setup Complete! ✅

Your EchoHub app is now configured to work on both localhost and your local network.

## Configuration Changes Made:

### Backend (`backend/src/main.ts`)

- ✅ Server now listens on `0.0.0.0` (all network interfaces)
- ✅ CORS configured to accept requests from:
  - `http://localhost:3000`
  - `http://127.0.0.1:3000`
  - `http://192.168.100.10:3000`
  - Any IP matching pattern `http://192.168.x.x:3000`

### Frontend (`frontend/app/lib/api.ts`)

- ✅ API URL dynamically determined based on hostname
- ✅ When accessed via `192.168.x.x`, automatically uses network IP for backend
- ✅ When accessed via `localhost`, uses localhost for backend

## How to Test on Your Phone:

### Step 1: Start the Backend

```bash
cd backend
npm run start:dev
```

You should see:

```
🚀 EchoHub Backend running on:
   - Local:   http://localhost:3001
   - Network: http://192.168.100.10:3001
📚 API available at:
   - Local:   http://localhost:3001/api/v1
   - Network: http://192.168.100.10:3001/api/v1
```

### Step 2: Start the Frontend

```bash
cd frontend
npm run dev
```

You should see:

```
▲ Next.js 15.5.6 (Turbopack)
- Local:        http://localhost:3000
- Network:      http://192.168.100.10:3000
```

### Step 3: Connect Your Phone

1. **Make sure your phone is on the same WiFi network** as your computer
2. Open your phone's browser (Chrome, Safari, etc.)
3. Navigate to: `http://192.168.100.10:3000`
4. The app should load and work perfectly!

## Testing Checklist:

### On Your Phone:

- [ ] App loads at `http://192.168.100.10:3000`
- [ ] Login works
- [ ] Dashboard displays correctly
- [ ] Bottom navigation works
- [ ] Tabs scroll horizontally
- [ ] Can create/edit clients
- [ ] Can create/edit projects
- [ ] Can upload files (up to 50MB)
- [ ] Can add/edit notes
- [ ] Touch interactions feel responsive
- [ ] No CORS errors in console

### On Desktop (Verify Still Works):

- [ ] App loads at `http://localhost:3000`
- [ ] All features work as before
- [ ] No breaking changes

## Troubleshooting:

### Issue: Can't connect from phone

**Solution**:

- Verify both devices are on the same WiFi network
- Check your computer's firewall isn't blocking port 3000 or 3001
- Try disabling Windows Firewall temporarily to test

### Issue: CORS errors

**Solution**:

- Restart the backend server
- Clear browser cache on phone
- Check the backend console for CORS-related errors

### Issue: API calls fail

**Solution**:

- Verify backend is running and accessible at `http://192.168.100.10:3001/api/v1`
- Check network connectivity
- Look at browser console for specific error messages

## Network IP Changes:

If your network IP changes (e.g., from `192.168.100.10` to `192.168.100.15`):

1. **No code changes needed!** The configuration uses regex patterns
2. Just restart both servers
3. Access the new IP on your phone

## Security Note:

This configuration is for **local development only**. For production:

- Use proper domain names
- Configure CORS with specific allowed origins
- Use HTTPS
- Implement rate limiting
- Add proper authentication headers

## Additional Tips:

### Test PWA Installation:

1. Open `http://192.168.100.10:3000` on your phone
2. **iOS**: Tap Share → Add to Home Screen
3. **Android**: Tap Menu → Add to Home Screen
4. The app will install as a PWA!

### Debug on Phone:

- **iOS**: Connect phone to Mac → Safari → Develop → [Your Phone] → [Page]
- **Android**: Chrome → `chrome://inspect` → Select your device

### Check Network IP:

```bash
# Windows
ipconfig

# Mac/Linux
ifconfig
```

Look for your local IP (usually starts with `192.168.`)

---

**Ready to test!** 🚀📱

Start both servers and access `http://192.168.100.10:3000` from your phone!
