# WhyLayer Process Verification Guide

## Overview
This document describes all the processes in the WhyLayer system and how to verify they are working correctly.

## Process Inventory

### 1. Frontend Static Server
- **File**: `static-server.js`
- **Purpose**: Serves HTML, JavaScript, CSS, and other static files
- **Port**: 8080 (default) or configurable
- **Status**: ✅ WORKING

### 2. Core Application (Frontend)
- **File**: `app.js`
- **Purpose**: Main application logic including:
  - API Configuration
  - Memory Management
  - Replay State Management
  - Data Fetching
- **Status**: ✅ WORKING

### 3. Neural Network Module
- **File**: `neural.js`
- **Purpose**: AI/ML functionality for predictive analysis
- **Status**: ✅ WORKING

### 4. Voice Recognition Module
- **File**: `voice.js`
- **Purpose**: Voice command and speech recognition
- **Status**: ✅ WORKING

### 5. Data Management Module
- **File**: `data.js`
- **Purpose**: Mock data and data structure definitions
- **Status**: ✅ WORKING

### 6. Frontend UI
- **File**: `index.html`
- **Purpose**: User interface and visualization dashboard
- **Dependencies**: TailwindCSS, Chart.js, FontAwesome
- **Status**: ✅ WORKING

### 7. Environment Configuration
- **Files**: `.env`, `env.js`
- **Purpose**: API keys and configuration management
- **Status**: ✅ WORKING

## Automated Testing

### Run All Health Checks
```bash
# Comprehensive health check
node health-check.js

# Server functionality test
node test-server.js

# Run both sequentially
node health-check.js && node test-server.js
```

### Expected Output
When all processes are working correctly:
```
✓ ALL PROCESSES ARE WORKING!
Pass Rate: 100.00%
```

## Manual Verification

### 1. Start the Static Server
```bash
npm run frontend
# or
node static-server.js 8080
```

Expected output:
```
Static server serving /path/to/project on http://localhost:8080
```

### 2. Access the Dashboard
Open your browser and navigate to:
```
http://localhost:8080
```

You should see the WhyLayer dashboard with:
- Header with logo and navigation
- Multiple tabs (Dashboard, Time Machine, Console, Predictive AI)
- Service health indicators
- Real-time monitoring visualizations

### 3. Test API Configuration
Open browser console and check:
```javascript
// Should show API base URL
localStorage.getItem('api_base_url')
// Should show: http://localhost:3001/api or similar
```

### 4. Test Memory Manager
In browser console:
```javascript
// Check if memory is enabled
MemoryManager.isEnabled()
// Should return true or false
```

### 5. Verify JavaScript Modules Load
In browser console, check for errors:
- No 404 errors for JavaScript files
- No syntax errors
- Console should show: "WhyLayer initialized" or similar

## Troubleshooting

### Issue: Server Won't Start
**Symptoms**: Port already in use, cannot bind to port

**Solution**:
```bash
# Check if port is in use
lsof -i :8080  # On Linux/Mac
netstat -ano | findstr :8080  # On Windows

# Kill the process or use a different port
node static-server.js 8081
```

### Issue: Files Not Loading (404)
**Symptoms**: Browser shows 404 errors for CSS/JS files

**Solution**:
- Verify all files exist in the root directory
- Check file permissions
- Run health check: `node health-check.js`

### Issue: API Connection Failed
**Symptoms**: Console shows API errors

**Solution**:
- Backend server is not running (expected - not implemented yet)
- App falls back to mock data automatically
- Check console for: "Using mock data" message

### Issue: Environment Variables Missing
**Symptoms**: API features not working

**Solution**:
```bash
# Check .env file exists
cat .env

# Should contain:
# GOOGLE_API_KEY=your_key_here
# MONGO_URI=your_mongo_uri
```

## Process Status Summary

| Process | Status | File | Tested |
|---------|--------|------|--------|
| Static Server | ✅ Working | static-server.js | ✅ Yes |
| Main App | ✅ Working | app.js | ✅ Yes |
| Neural Network | ✅ Working | neural.js | ✅ Yes |
| Voice Module | ✅ Working | voice.js | ✅ Yes |
| Data Module | ✅ Working | data.js | ✅ Yes |
| Frontend UI | ✅ Working | index.html | ✅ Yes |
| Environment | ✅ Working | .env, env.js | ✅ Yes |

## CI/CD Integration

### GitHub Actions (Recommended)
Create `.github/workflows/health-check.yml`:
```yaml
name: Health Check

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - name: Run Health Checks
        run: |
          node health-check.js
          node test-server.js
```

## Monitoring in Production

### Health Check Endpoint
Consider adding a health check endpoint to your server:
```javascript
// In static-server.js
if (req.url === '/health') {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'ok', timestamp: Date.now() }));
  return;
}
```

### Recommended Monitoring
- Uptime monitoring (e.g., UptimeRobot, Pingdom)
- Error tracking (e.g., Sentry)
- Performance monitoring (e.g., New Relic)

## Next Steps

1. **Backend Server**: Implement the backend API (currently documented but not present)
2. **Database**: Set up MongoDB connection
3. **Real-time Updates**: Add WebSocket support
4. **Authentication**: Implement user authentication
5. **Advanced Testing**: Add unit tests for individual components

## Support

For issues or questions:
1. Run `node health-check.js` to identify problems
2. Check this documentation for troubleshooting
3. Review the BACKEND_SETUP.md and FULLSTACK_SETUP.md guides
4. Check GitHub issues for known problems

---

**Last Updated**: 2026-01-30
**Version**: 1.0.0
