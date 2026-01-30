#!/usr/bin/env node

/**
 * WhyLayer Server Test
 * Tests the static server functionality
 */

const http = require('http');
const { spawn } = require('child_process');
const path = require('path');

const TEST_PORT = 9999;
const TEST_TIMEOUT = 10000;

// ANSI colors
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  bold: '\x1b[1m'
};

function log(message, status = 'info') {
  const timestamp = new Date().toISOString();
  let prefix = '';
  
  switch(status) {
    case 'pass':
      prefix = `${colors.green}✓ PASS${colors.reset}`;
      break;
    case 'fail':
      prefix = `${colors.red}✗ FAIL${colors.reset}`;
      break;
    case 'info':
      prefix = `${colors.blue}ℹ INFO${colors.reset}`;
      break;
  }
  
  console.log(`[${timestamp}] ${prefix} ${message}`);
}

function testHTTPRequest(port, path, expectedContent) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: port,
      path: path,
      method: 'GET'
    };
    
    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          if (expectedContent && !data.includes(expectedContent)) {
            reject(new Error(`Response doesn't contain expected content: ${expectedContent}`));
          } else {
            resolve({ statusCode: res.statusCode, data, contentType: res.headers['content-type'] });
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}`));
        }
      });
    });
    
    req.on('error', (err) => {
      reject(err);
    });
    
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    req.end();
  });
}

async function main() {
  console.log(`\n${colors.bold}${colors.blue}╔════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.bold}${colors.blue}║   WhyLayer Server Test                ║${colors.reset}`);
  console.log(`${colors.bold}${colors.blue}╚════════════════════════════════════════╝${colors.reset}\n`);
  
  let serverProcess = null;
  
  try {
    // Start the server
    log(`Starting static server on port ${TEST_PORT}...`, 'info');
    serverProcess = spawn('node', ['static-server.js', TEST_PORT], {
      cwd: __dirname,
      stdio: ['ignore', 'pipe', 'pipe']
    });
    
    let serverReady = false;
    
    serverProcess.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('Static server')) {
        serverReady = true;
        log('Server started successfully', 'pass');
      }
    });
    
    serverProcess.stderr.on('data', (data) => {
      console.error(`Server error: ${data}`);
    });
    
    // Wait for server to start
    log('Waiting for server to be ready...', 'info');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (!serverReady) {
      log('Server may not be fully ready yet, proceeding with tests...', 'info');
    }
    
    // Test 1: Request index.html
    log('Testing: GET /index.html', 'info');
    try {
      const result = await testHTTPRequest(TEST_PORT, '/index.html', 'WhyLayer');
      if (result.contentType && result.contentType.includes('text/html')) {
        log(`GET /index.html - HTML served correctly (${result.contentType})`, 'pass');
      } else {
        log(`GET /index.html - Wrong content type: ${result.contentType}`, 'fail');
      }
    } catch (error) {
      log(`GET /index.html - ${error.message}`, 'fail');
    }
    
    // Test 2: Request app.js
    log('Testing: GET /app.js', 'info');
    try {
      const result = await testHTTPRequest(TEST_PORT, '/app.js', 'function');
      if (result.contentType && result.contentType.includes('javascript')) {
        log(`GET /app.js - JavaScript served correctly (${result.contentType})`, 'pass');
      } else {
        log(`GET /app.js - Wrong content type: ${result.contentType}`, 'fail');
      }
    } catch (error) {
      log(`GET /app.js - ${error.message}`, 'fail');
    }
    
    // Test 3: Request root (should redirect to index.html)
    log('Testing: GET / (root)', 'info');
    try {
      const result = await testHTTPRequest(TEST_PORT, '/', 'WhyLayer');
      log('GET / - Root redirects to index.html', 'pass');
    } catch (error) {
      log(`GET / - ${error.message}`, 'fail');
    }
    
    // Test 4: Request non-existent file
    log('Testing: GET /nonexistent.html (404 test)', 'info');
    try {
      await testHTTPRequest(TEST_PORT, '/nonexistent.html');
      log('GET /nonexistent.html - Should return 404 but got 200', 'fail');
    } catch (error) {
      if (error.message.includes('404')) {
        log('GET /nonexistent.html - 404 handled correctly', 'pass');
      } else {
        log(`GET /nonexistent.html - Unexpected error: ${error.message}`, 'fail');
      }
    }
    
    console.log(`\n${colors.green}${colors.bold}✓ Server tests completed!${colors.reset}\n`);
    
  } catch (error) {
    console.error(`${colors.red}Test error: ${error.message}${colors.reset}`);
    process.exit(1);
  } finally {
    // Clean up: kill server process
    if (serverProcess) {
      log('Stopping server...', 'info');
      serverProcess.kill('SIGTERM');
      
      // Force kill after timeout
      setTimeout(() => {
        if (!serverProcess.killed) {
          serverProcess.kill('SIGKILL');
        }
      }, 2000);
    }
    
    // Wait a bit for cleanup
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

main().catch(error => {
  console.error(`${colors.red}Fatal error: ${error.message}${colors.reset}`);
  process.exit(1);
});
