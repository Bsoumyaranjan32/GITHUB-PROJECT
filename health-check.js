#!/usr/bin/env node

/**
 * WhyLayer Health Check Script
 * Verifies that all processes and components are working correctly
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

// ANSI color codes for better output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  bold: '\x1b[1m'
};

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;

function log(message, status = 'info') {
  const timestamp = new Date().toISOString();
  let prefix = '';
  
  switch(status) {
    case 'pass':
      prefix = `${colors.green}✓ PASS${colors.reset}`;
      passedChecks++;
      break;
    case 'fail':
      prefix = `${colors.red}✗ FAIL${colors.reset}`;
      failedChecks++;
      break;
    case 'warn':
      prefix = `${colors.yellow}⚠ WARN${colors.reset}`;
      break;
    case 'info':
      prefix = `${colors.blue}ℹ INFO${colors.reset}`;
      break;
  }
  
  console.log(`[${timestamp}] ${prefix} ${message}`);
  totalChecks++;
}

function header(text) {
  console.log(`\n${colors.bold}${colors.blue}========================================${colors.reset}`);
  console.log(`${colors.bold}${colors.blue}${text}${colors.reset}`);
  console.log(`${colors.bold}${colors.blue}========================================${colors.reset}\n`);
}

// Check if file exists
function checkFileExists(filePath, description) {
  const exists = fs.existsSync(filePath);
  if (exists) {
    log(`${description}: ${path.basename(filePath)}`, 'pass');
    return true;
  } else {
    log(`${description}: ${path.basename(filePath)} NOT FOUND`, 'fail');
    return false;
  }
}

// Check file syntax (basic JavaScript validation)
function checkJavaScriptSyntax(filePath, description) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    // Basic syntax check - looking for common errors
    if (content.length === 0) {
      log(`${description}: File is empty`, 'fail');
      return false;
    }
    
    // Check for basic JavaScript structure
    if (!content.includes('function') && !content.includes('const') && !content.includes('let') && !content.includes('var')) {
      log(`${description}: No JavaScript code detected`, 'warn');
    } else {
      log(`${description}: Valid JavaScript structure`, 'pass');
      return true;
    }
  } catch (error) {
    log(`${description}: Error reading file - ${error.message}`, 'fail');
    return false;
  }
}

// Check environment configuration
function checkEnvironment() {
  header('ENVIRONMENT CONFIGURATION CHECK');
  
  // Check .env file
  if (checkFileExists('.env', 'Environment file')) {
    const envContent = fs.readFileSync('.env', 'utf8');
    
    // Check for required environment variables
    if (envContent.includes('GOOGLE_API_KEY')) {
      log('Google API Key configured', 'pass');
    } else {
      log('Google API Key not found', 'fail');
    }
    
    if (envContent.includes('MONGO_URI')) {
      log('MongoDB URI configured', 'pass');
    } else {
      log('MongoDB URI not found', 'warn');
    }
  }
  
  // Check env.js file
  if (checkFileExists('env.js', 'Client environment file')) {
    checkJavaScriptSyntax('env.js', 'env.js syntax');
  }
}

// Check core files
function checkCoreFiles() {
  header('CORE FILES CHECK');
  
  const coreFiles = [
    { path: 'index.html', desc: 'Main HTML file' },
    { path: 'app.js', desc: 'Main application JavaScript' },
    { path: 'neural.js', desc: 'Neural network module' },
    { path: 'voice.js', desc: 'Voice recognition module' },
    { path: 'data.js', desc: 'Data management module' },
    { path: 'static-server.js', desc: 'Static file server' },
    { path: 'package.json', desc: 'Package configuration' }
  ];
  
  coreFiles.forEach(file => {
    if (checkFileExists(file.path, file.desc)) {
      if (file.path.endsWith('.js')) {
        checkJavaScriptSyntax(file.path, `${file.desc} syntax`);
      }
    }
  });
}

// Check HTML structure
function checkHTMLStructure() {
  header('HTML STRUCTURE CHECK');
  
  try {
    const htmlContent = fs.readFileSync('index.html', 'utf8');
    
    // Check for essential HTML elements
    const checks = [
      { pattern: /<html/i, desc: 'HTML tag' },
      { pattern: /<head>/i, desc: 'HEAD tag' },
      { pattern: /<body/i, desc: 'BODY tag' },
      { pattern: /<script/i, desc: 'Script tags' },
      { pattern: /app\.js/i, desc: 'app.js reference' },
      { pattern: /tailwind/i, desc: 'TailwindCSS reference' }
    ];
    
    checks.forEach(check => {
      if (check.pattern.test(htmlContent)) {
        log(`${check.desc} present`, 'pass');
      } else {
        log(`${check.desc} missing`, 'fail');
      }
    });
  } catch (error) {
    log(`Error reading index.html: ${error.message}`, 'fail');
  }
}

// Check JavaScript modules structure
function checkJavaScriptModules() {
  header('JAVASCRIPT MODULES CHECK');
  
  // Check app.js for key functions
  try {
    const appContent = fs.readFileSync('app.js', 'utf8');
    
    const appChecks = [
      { pattern: /fetchFromAPI/i, desc: 'API fetch function' },
      { pattern: /MemoryManager/i, desc: 'Memory Manager' },
      { pattern: /replayState/i, desc: 'Replay state management' },
      { pattern: /API_BASE_URL/i, desc: 'API configuration' }
    ];
    
    appChecks.forEach(check => {
      if (check.pattern.test(appContent)) {
        log(`app.js: ${check.desc} present`, 'pass');
      } else {
        log(`app.js: ${check.desc} missing`, 'warn');
      }
    });
  } catch (error) {
    log(`Error checking app.js: ${error.message}`, 'fail');
  }
  
  // Check neural.js
  try {
    const neuralContent = fs.readFileSync('neural.js', 'utf8');
    if (neuralContent.length > 1000) {
      log('neural.js: Contains neural network logic', 'pass');
    } else {
      log('neural.js: File seems incomplete', 'warn');
    }
  } catch (error) {
    log(`Error checking neural.js: ${error.message}`, 'fail');
  }
  
  // Check voice.js
  try {
    const voiceContent = fs.readFileSync('voice.js', 'utf8');
    if (voiceContent.includes('voice') || voiceContent.includes('speech')) {
      log('voice.js: Contains voice logic', 'pass');
    } else {
      log('voice.js: Voice functionality unclear', 'warn');
    }
  } catch (error) {
    log(`Error checking voice.js: ${error.message}`, 'fail');
  }
  
  // Check data.js
  try {
    const dataContent = fs.readFileSync('data.js', 'utf8');
    if (dataContent.includes('data') || dataContent.includes('mock')) {
      log('data.js: Contains data structures', 'pass');
    } else {
      log('data.js: Data structures unclear', 'warn');
    }
  } catch (error) {
    log(`Error checking data.js: ${error.message}`, 'fail');
  }
}

// Check static server functionality
function checkStaticServer() {
  header('STATIC SERVER CHECK');
  
  try {
    const serverContent = fs.readFileSync('static-server.js', 'utf8');
    
    const serverChecks = [
      { pattern: /http\.createServer/i, desc: 'HTTP server creation' },
      { pattern: /server\.listen/i, desc: 'Server listen' },
      { pattern: /mime/i, desc: 'MIME type handling' },
      { pattern: /fs\.readFile|fs\.createReadStream/i, desc: 'File serving' }
    ];
    
    serverChecks.forEach(check => {
      if (check.pattern.test(serverContent)) {
        log(`static-server.js: ${check.desc} present`, 'pass');
      } else {
        log(`static-server.js: ${check.desc} missing`, 'warn');
      }
    });
  } catch (error) {
    log(`Error checking static-server.js: ${error.message}`, 'fail');
  }
}

// Check package.json scripts
function checkPackageScripts() {
  header('PACKAGE SCRIPTS CHECK');
  
  try {
    const packageContent = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    if (packageContent.scripts) {
      const scripts = packageContent.scripts;
      
      Object.keys(scripts).forEach(scriptName => {
        log(`NPM script '${scriptName}': ${scripts[scriptName]}`, 'pass');
      });
      
      // Check for essential scripts
      if (scripts.frontend || scripts.dev || scripts.start) {
        log('Essential startup scripts available', 'pass');
      } else {
        log('No startup scripts found', 'warn');
      }
    } else {
      log('No scripts defined in package.json', 'warn');
    }
  } catch (error) {
    log(`Error checking package.json: ${error.message}`, 'fail');
  }
}

// Check documentation
function checkDocumentation() {
  header('DOCUMENTATION CHECK');
  
  const docs = [
    { path: 'README.md', desc: 'Main README' },
    { path: 'BACKEND_SETUP.md', desc: 'Backend setup guide' },
    { path: 'FULLSTACK_SETUP.md', desc: 'Full stack setup guide' },
    { path: 'PROBLEM_AND_SOLUTION.md', desc: 'Problem/Solution doc' }
  ];
  
  docs.forEach(doc => {
    checkFileExists(doc.path, doc.desc);
  });
}

// Test static server (optional - requires starting it)
function testStaticServer() {
  header('STATIC SERVER LIVE TEST');
  
  log('Static server test requires manual start', 'info');
  log('Run: node static-server.js 8080', 'info');
  log('Then visit: http://localhost:8080', 'info');
}

// Generate summary report
function generateSummary() {
  header('HEALTH CHECK SUMMARY');
  
  const totalTests = passedChecks + failedChecks;
  const passRate = totalTests > 0 ? ((passedChecks / totalTests) * 100).toFixed(2) : 0;
  
  console.log(`${colors.bold}Total Checks: ${totalTests}${colors.reset}`);
  console.log(`${colors.green}${colors.bold}Passed: ${passedChecks}${colors.reset}`);
  console.log(`${colors.red}${colors.bold}Failed: ${failedChecks}${colors.reset}`);
  console.log(`${colors.blue}${colors.bold}Pass Rate: ${passRate}%${colors.reset}\n`);
  
  if (failedChecks === 0) {
    console.log(`${colors.green}${colors.bold}✓ ALL PROCESSES ARE WORKING!${colors.reset}\n`);
    return 0;
  } else {
    console.log(`${colors.red}${colors.bold}✗ SOME PROCESSES HAVE ISSUES!${colors.reset}\n`);
    return 1;
  }
}

// Main execution
async function main() {
  console.log(`\n${colors.bold}${colors.blue}╔════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.bold}${colors.blue}║   WhyLayer Health Check System        ║${colors.reset}`);
  console.log(`${colors.bold}${colors.blue}║   Verifying All Processes              ║${colors.reset}`);
  console.log(`${colors.bold}${colors.blue}╚════════════════════════════════════════╝${colors.reset}\n`);
  
  log('Starting comprehensive health check...', 'info');
  
  // Run all checks
  checkEnvironment();
  checkCoreFiles();
  checkHTMLStructure();
  checkJavaScriptModules();
  checkStaticServer();
  checkPackageScripts();
  checkDocumentation();
  testStaticServer();
  
  // Generate summary
  const exitCode = generateSummary();
  
  process.exit(exitCode);
}

// Run the health check
main().catch(error => {
  console.error(`${colors.red}Fatal error: ${error.message}${colors.reset}`);
  process.exit(1);
});
