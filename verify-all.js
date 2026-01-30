#!/usr/bin/env node

/**
 * WhyLayer Master Verification Script
 * Runs all checks to verify that all processes are working
 */

const { spawn } = require('child_process');
const path = require('path');

// ANSI colors
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  bold: '\x1b[1m',
  magenta: '\x1b[35m'
};

function runScript(scriptPath, description) {
  return new Promise((resolve, reject) => {
    console.log(`\n${colors.blue}${colors.bold}Running: ${description}${colors.reset}`);
    console.log(`${colors.blue}Script: ${scriptPath}${colors.reset}\n`);
    
    const child = spawn('node', [scriptPath], {
      stdio: 'inherit',
      cwd: __dirname
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        console.log(`\n${colors.green}${colors.bold}✓ ${description} - PASSED${colors.reset}\n`);
        resolve(true);
      } else {
        console.log(`\n${colors.red}${colors.bold}✗ ${description} - FAILED (exit code: ${code})${colors.reset}\n`);
        resolve(false);
      }
    });
    
    child.on('error', (error) => {
      console.error(`\n${colors.red}Error running ${description}: ${error.message}${colors.reset}\n`);
      resolve(false);
    });
  });
}

async function main() {
  console.log(`\n${colors.magenta}${colors.bold}╔════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.magenta}${colors.bold}║   WhyLayer Master Verification System         ║${colors.reset}`);
  console.log(`${colors.magenta}${colors.bold}║   Checking ALL Processes                       ║${colors.reset}`);
  console.log(`${colors.magenta}${colors.bold}╚════════════════════════════════════════════════╝${colors.reset}\n`);
  
  const startTime = Date.now();
  const results = [];
  
  // Run all verification scripts
  const checks = [
    { script: 'health-check.js', description: 'Component Health Check' },
    { script: 'test-server.js', description: 'Server Functionality Test' }
  ];
  
  for (const check of checks) {
    const result = await runScript(check.script, check.description);
    results.push({ name: check.description, passed: result });
  }
  
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);
  
  // Print summary
  console.log(`\n${colors.bold}${colors.blue}═══════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bold}${colors.blue}                 FINAL SUMMARY                     ${colors.reset}`);
  console.log(`${colors.bold}${colors.blue}═══════════════════════════════════════════════════${colors.reset}\n`);
  
  const passed = results.filter(r => r.passed).length;
  const total = results.length;
  
  results.forEach(result => {
    const status = result.passed 
      ? `${colors.green}✓ PASS${colors.reset}` 
      : `${colors.red}✗ FAIL${colors.reset}`;
    console.log(`  ${status}  ${result.name}`);
  });
  
  console.log(`\n${colors.bold}Total Checks: ${total}${colors.reset}`);
  console.log(`${colors.green}${colors.bold}Passed: ${passed}${colors.reset}`);
  console.log(`${colors.red}${colors.bold}Failed: ${total - passed}${colors.reset}`);
  console.log(`${colors.blue}${colors.bold}Duration: ${duration}s${colors.reset}\n`);
  
  if (passed === total) {
    console.log(`${colors.green}${colors.bold}╔════════════════════════════════════════════════╗${colors.reset}`);
    console.log(`${colors.green}${colors.bold}║  ✓✓✓ ALL PROCESSES ARE WORKING! ✓✓✓          ║${colors.reset}`);
    console.log(`${colors.green}${colors.bold}║  System is healthy and ready to use.          ║${colors.reset}`);
    console.log(`${colors.green}${colors.bold}╚════════════════════════════════════════════════╝${colors.reset}\n`);
    
    console.log(`${colors.blue}To start the application:${colors.reset}`);
    console.log(`  ${colors.bold}npm run frontend${colors.reset}  or  ${colors.bold}node static-server.js 8080${colors.reset}`);
    console.log(`  Then open: ${colors.bold}http://localhost:8080${colors.reset}\n`);
    
    process.exit(0);
  } else {
    console.log(`${colors.red}${colors.bold}╔════════════════════════════════════════════════╗${colors.reset}`);
    console.log(`${colors.red}${colors.bold}║  ✗✗✗ SOME PROCESSES HAVE ISSUES! ✗✗✗         ║${colors.reset}`);
    console.log(`${colors.red}${colors.bold}║  Please review the errors above.              ║${colors.reset}`);
    console.log(`${colors.red}${colors.bold}╚════════════════════════════════════════════════╝${colors.reset}\n`);
    
    console.log(`${colors.yellow}Troubleshooting:${colors.reset}`);
    console.log(`  1. Check PROCESS_VERIFICATION.md for details`);
    console.log(`  2. Review error messages above`);
    console.log(`  3. Run individual checks to isolate issues\n`);
    
    process.exit(1);
  }
}

main().catch(error => {
  console.error(`${colors.red}${colors.bold}Fatal error: ${error.message}${colors.reset}`);
  process.exit(1);
});
