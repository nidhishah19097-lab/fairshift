# FairShift — Work Should Be Fair

> **Prompt Wars 2026 Hackathon** | Organized with **SRM ACM Student Chapter**  
> Aligned with **UN SDG 8: Decent Work and Economic Growth** (Targets 8.5 & 8.8)

FairShift is a mobile-first, responsive workforce fairness and safety platform designed to address unfair wage calculations, unrecorded overtime, fear of reporting workplace hazards, excessive working hours, and employers' lack of visibility into workforce wellbeing.

---

## 🌟 The Problem Statement

Across emerging infrastructure projects and institutional operations, vulnerable and contract workers face systemic barriers:
- **Opaque Wage Calculations & Unrecorded Overtime**: Overtime hours are routinely shaved or omitted from subcontractor paper logs.
- **Fear of Reprisal for Hazard Reporting**: Workers hesitate to report unsafe scaffolding, faulty electrical lines, or extreme heat conditions due to fear of termination.
- **Fatigue & Excessive Working Hours**: Rushed deadlines lead to 12+ hour consecutive shifts with inadequate rest intervals, driving severe worksite accidents.
- **Lack of Employer Operational Visibility**: Facility managers and site engineers lack centralized, aggregated visibility into workforce exhaustion and unresolved hazards.

---

## 🏭 Two Supported Industry Use Cases

### 1. Construction & Civil Infrastructure (e.g., Metro Projects, High-Rise Sites)
* **Operational Challenges**: Heavy concrete pour deadlines, crane swing blind spots, scaffolding fall risks, intense afternoon heat exhaustion (38°C+), and migrant workers facing language barriers.
* **FairShift In Action**: 
  - Trilingual interface in **English**, **Hindi (हिन्दी)**, and **Gujarati (ગુજરાતી)**.
  - Real-time timestamped shift logging with configurable standard shift benchmarks (8.0 hours).
  - SafeVoice anonymous hazard reports for missing perimeter catch nets and damaged PPE with anonymous tracking tokens (e.g. `#ANON-7712`).
  - FatigueGuard heat hydration and rest gap monitoring.

### 2. College & Campus Facilities (e.g., SRM University Campus Maintenance)
* **Operational Challenges**: Round-the-clock maintenance across academic blocks, research lab chemical exhaust shafts, campus electrical substations, night sanitation crews, and student schedule variations.
* **FairShift In Action**:
  - Transparent itemized wage calculator for contract workers showing base hourly rate, overtime multipliers (1.5x / 2.0x for rest days/night duty), and clear deduction auditing.
  - Cross-industry comparison dashboard allowing campus estate managers to benchmark overtime exposure against civil infrastructure contractors.
  - Digital Skill Passport verifying campus HVAC certifications and LOTO electrical safety training.

---

## 🚀 5 Core Functional Features + Skill Passport

### 1. Smart Attendance
- **Start Shift (Clock In) & End Shift (Clock Out)** with live elapsed shift timer down to the second.
- Automatic overtime detection when shift duration exceeds standard shift benchmark (configurable 8.0h default).
- Strict validation: Prevents ending shifts that haven't started and prohibits duplicate active shifts.
- Detailed historical shift log with timestamps and estimated pay.

### 2. Wage Transparency Calculator
- Interactive, editable sliders and inputs for **base hourly rate (₹/hr)**, **regular hours**, **overtime hours**, **overtime multiplier (1.5x / 2.0x)**, and **statutory/canteen deductions**.
- Automated itemized calculation breakdown into gross earnings, overtime premium, deductions, and net take-home pay in **Indian Rupee (₹)**.
- Clear statutory disclaimer explaining that figures are rule-based estimates complying with statutory labor standards.

### 3. SafeVoice (Anonymous Hazard Reporting)
- Submit safety issues (scaffolding fall hazard, heavy machinery blind spots, electrical cables, chemical fumes, heat exhaustion) without disclosing name, employee ID, or phone number.
- Generates an anonymous receipt token (e.g. `#ANON-9043`) allowing the worker to track incident remediation anonymously.
- Supervisor incident console in the Employer Portal with full workflow controls: **Open → In Progress → Resolved** and supervisor action notes.
- Strict privacy boundary note explaining prototype isolation.

### 4. FatigueGuard (Work Hours & Rest Monitor)
- Continuous shift duration and rest-interval monitoring based on labour standard benchmarks.
- Multi-tier alert matrix:
  - **Normal** (<6h)
  - **Moderate Caution** (6h–8h)
  - **High Overtime Alert** (>8.5h)
  - **Critical Fatigue Risk** (>10h continuous or <11h recovery gap between shifts)
- Actionable hydration, shade breaks, and recovery sleep guidance.
- Interactive shift simulator allowing users to test risk levels across varying shift lengths.
- Explicit rule-based indicator disclaimer (not a medical diagnosis).

### 5. Employer Insights & Roster Command
- High-level KPIs: Active Demo Workers, Workers Currently on Shift, Overtime Alerts, Open Safety Hazards, and Fatigue Warnings.
- **Cross-Industry Visualizer**: Comparison bar chart displaying regular vs. overtime exposure between Construction Sites and Campus Facilities.
- Multi-industry filter allowing instant switching between All Sectors, Construction Sites, and Campus Facilities.
- SafeVoice management board with accessible severity badges (symbol + color + text contrast).
- Live shift attendance roster showing real-time active duty and compensation totals.

### 🎁 Optional: Digital Skill Passport
- Portable workforce credential profile displaying verified safety training hours (48+ hrs), technical competencies, NSDC-aligned certificates, and a printable/previewable digital worker ID pass.

---

## 🌍 UN SDG 8 Alignment

FairShift directly advances:
- **Target 8.8**: Protect labour rights and promote safe and secure working environments for all workers, including precarious contract labour.
- **Target 8.5**: Productive employment and decent work for all, with transparent statutory overtime calculations preventing wage theft.

---

## 🛠️ Architecture & Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide React icons, Motion animations.
- **Backend & Database**: Firebase Authentication (Email/Password & Session Persistence), Cloud Firestore Enterprise Edition (`ai-studio-fairshift-fdaf4048-4bca-4dd3-bf13-f017832923c0`).
- **Security & Authorization**: Attribute-Based Access Control (ABAC) in `firestore.rules` deployed to Firebase project `august-federation-nbcxw`.
- **Runtime & Deployment**: Production Node.js 22 runtime with multi-stage `Dockerfile` and Express server (`server.ts`) configured for Google Cloud Run deployment.
- **Resilience**: Real-time Firestore synchronization (`onSnapshot`) with offline caching fallback.

---

## 🔐 Firebase Authentication & Security Model

- **Worker Authentication**: Workers register with their email, name, sector, worksite, and base wage rate. Their role is locked to `worker` in both the application and Firestore security rules.
- **Employer Authorization**: Employers must register using the validated organization authorization code (`FAIRSHIFT-2026-SRM`) which provisions a document in `/employers/{uid}`. This prevents workers from self-promoting to Employer role.
- **Fast Evaluation Sign-In**: Includes one-click demo sign-in buttons for judges:
  - **Demo Worker**: `worker@fairshift.demo`
  - **Demo Employer**: `employer@fairshift.demo`
- **SafeVoice Privacy Shield**: Hazard reports submitted to `/safetyReports` never store or leak worker user UIDs, preserving strict anonymity while allowing authorized employers to resolve incidents.

---

## 🚢 Google Cloud Run Deployment

1. **Build Container Image**:
   ```bash
   gcloud builds submit --tag gcr.io/august-federation-nbcxw/fairshift:latest
   ```

2. **Deploy to Cloud Run**:
   ```bash
   gcloud run deploy fairshift \
     --image gcr.io/august-federation-nbcxw/fairshift:latest \
     --platform managed \
     --region asia-south1 \
     --allow-unauthenticated \
     --port 3000
   ```

---

## 🧪 Automated Testing Suite & Verification

The application includes an automated test suite implemented with **Vitest**:

### Running the Tests:
```bash
npm run test
```

### Test Coverage Summary:
- **`src/utils/__tests__/calculations.test.ts` (17 tests)**:
  - Standard shift wage calculations (8-hour shift, base rate ₹140/hr)
  - Overtime calculation accuracy at statutory 1.5x and 2.0x multipliers
  - Resilience against negative hourly rates, negative hours, and zero values
  - Net take-home wage protection against deductions exceeding gross earnings
  - Precise timestamp-based shift duration calculation and invalid date error handling
  - FatigueGuard threshold engine validation (Normal <6h, Caution 6–8.5h, Warning 8.5–11h, Critical ≥11h or rest gap <8h)
  - Input sanitization against cross-site scripting (XSS tag stripping and character escaping)
  - SafeVoice hazard report field validation and minimum character requirements
  - Employer authorization code verification (`FAIRSHIFT-2026-SRM`)
- **`src/utils/__tests__/security.test.ts` (4 tests)**:
  - SafeVoice strict anonymous identity shielding (invariants ensuring reporter UID/email/name are never stored)
  - Worker self-promotion prevention (blocking elevation to employer role)
  - Authorized employer verification through organization credentials
  - Chronological shift timestamp validation preventing reversed or spoofed records

All **21 automated tests execute and pass in ~700ms**.

---

## 🧪 Sprint Verification & Test Report

| Priority Test Case | Status | Verification Details |
| :--- | :--- | :--- |
| **1. Worker registration & login** | **PASSED** | Firebase Auth email/pass sign-up & sign-in creates `users/{uid}` with `role: 'worker'`. |
| **2. Employer registration & authorization** | **PASSED** | Requires code `FAIRSHIFT-2026-SRM`; verifies `/employers/{uid}`; blocks privilege escalation. |
| **3. Correct dashboard routing** | **PASSED** | Authenticated workers route to Worker Portal; authorized employers route to Employer Command. |
| **4. Logout and session persistence** | **PASSED** | Firebase `browserLocalPersistence` persists sessions; `signOut(auth)` clears credentials. |
| **5. Firestore data creation & retrieval** | **PASSED** | `shifts` and `safetyReports` write and subscribe via real-time `onSnapshot`. |
| **6. Attendance and wage record access** | **PASSED** | Clock in/out writes timestamped shift docs; overtime calculated transparently in ₹. |
| **7. Unauthorized access attempts** | **PASSED** | Restrictive `firestore.rules` deployed; unauthenticated writes and self-promotion denied. |
| **8. Automated unit & security test suite** | **PASSED** | 21 unit & security tests executed with Vitest; 100% pass rate. |
| **9. Application build & runtime** | **PASSED** | `compile_applet` passed; `lint_applet` passed; `npm run build` completed with 0 errors. |


