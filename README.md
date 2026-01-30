# WhyLayer 🔮
**System Intelligence, Reimagined.**

![WhyLayer Dashboard Concept](https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop)

> **"Don't just see *what* broke. Understand *why*."**

WhyLayer is an AI-powered SRE (Site Reliability Engineering) command center. It transforms raw, chaotic system logs into clear, actionable intelligence. By combining a "Time Machine" replay engine with predictive AI, WhyLayer doesn't just help you fix incidents—it helps you see the future of your infrastructure.

---

## 🚀 Key Features

### 1. 🤖 AI Root Cause Analysis (RCA)
Stop hunting through thousands of log lines.
- **Instant Diagnosis**: Our Gemini-powered engine analyzes log streams in real-time to identify the *exact* root cause of a failure (e.g., "Database Connection Pool Exhausted").
- **Human-Readable Insights**: Get simple explanations and analogies (e.g., "It's like a traffic jam caused by a broken light") instead of cryptic error codes.
- **Actionable Fixes**: Receive concrete, step-by-step remediation plans.

### 2. ⏪ Timeline Replay ("Time Machine")
Rewind the chaos.
- **Interactive Playback**: Scrub through an incident second-by-second to watch how a failure cascaded from one service to another.
- **Visual Map**: Watch services turn from Green (Healthy) to Red (Critical) on a dynamic topology map as the incident unfolds.

### 3. 🔮 Failure Prediction Dashboard
See it coming.
- **Risk Forecasting**: Proprietary heuristic algorithms analyze error trends to predict *when* a service is likely to fail in the next 15 minutes.
- **Cyberpunk UI**: A "NASA Control Room" style dashboard that highlights critical risks with immersive animations and scanning effects.

### 4. 🗺️ Real-Time Health Map
- **Live Topology**: Visualize your entire microservices architecture (Database, API Gateway, Auth, Payment) in a 3D-style orbit view.
- **Status at a Glance**: Instantly spot degraded or failing services with pulsing visual cues.

---

## 🛠️ Tech Stack

Built for speed, aesthetics, and performance.

- **Core**: Vanilla JavaScript (ES6+) for zero-dependency speed.
- **Styling**: TailwindCSS for a premium, glassmorphism-inspired "Future UI".
- **AI Engine**: Google Gemini 1.5 Pro/Flash via API.
- **Charts**: Chart.js for real-time trend visualization.
- **Icons**: FontAwesome.

---

## ⚡ Quick Start

1.  **Clone the Repo**
    ```bash
    git clone https://github.com/yourusername/whylayer.git
    cd whylayer
    ```

2.  **Configure Environment**
    Create an `env.js` file (added to .gitignore for security):
    ```javascript
    window.ENV = {
      GEMINI_API_KEY: "YOUR_GEMINI_API_KEY_HERE"
    };
    ```

3.  **Verify All Processes**
    Check that everything is working:
    ```bash
    npm run verify
    ```
    This runs comprehensive health checks on all components.

4.  **Run It**
    Start the static server:
    ```bash
    npm run frontend
    ```
    Then open `http://localhost:8080` in your browser!

---

## ✅ Process Verification

WhyLayer includes automated verification tools to check that all processes are working correctly.

### Quick Verification
```bash
# Run all checks
npm run verify

# Individual checks
npm run health-check  # Component health check
npm run test-server   # Server functionality test
```

### What Gets Verified
- ✓ Frontend static server functionality
- ✓ JavaScript modules (app.js, neural.js, voice.js, data.js)
- ✓ Environment configuration
- ✓ HTML structure and dependencies
- ✓ API configuration
- ✓ Package scripts

See [PROCESS_VERIFICATION.md](PROCESS_VERIFICATION.md) for detailed documentation.

---

## 🏆 Why WhyLayer?

Modern distributed systems are complex. When they break, standard monitoring tools give you *graphs*. WhyLayer gives you **answers**.

- **Innovation**: First-of-its-kind "Time Machine" for incidents.
- **Impact**: Reduces Mean Time to Resolution (MTTR) from hours to minutes.
- **Design**: A UI that makes SRE work feel like piloting a spacecraft.

