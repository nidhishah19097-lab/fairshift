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
- **Ergonomics**: Mobile-first touch-friendly design (≥44px hitboxes, thumb zone navigation, accessible contrast).
- **Backend / Runtime**: Lightweight Express server (`server.ts`) configured for Google Cloud Run deployment.
- **Storage**: Browser LocalStorage synchronization with custom event broadcasting ensuring real-time consistency between Worker and Employer portals.

---

## 💻 Setup & Local Development

1. **Clone repository**:
   ```bash
   git clone <repo-url>
   cd fairshift
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local dev server**:
   ```bash
   npm run dev
   ```
   Access at `http://localhost:3000`.

4. **Production Build & Server**:
   ```bash
   npm run build
   npm start
   ```

---

## ⚠️ Prototype Limitations & Demonstrability

1. **Demonstration Data**: All default workers, worksites, and safety incidents are pre-seeded demonstration data. A "Reset Demo Data" button is provided in the top header.
2. **Browser Storage**: Uses `localStorage` with reactive cross-tab events for prototype simplicity without requiring paid database services or external authentication.
3. **Anonymity Boundary**: SafeVoice demonstrates the privacy boundary by never capturing worker identity; production implementations would connect to zero-knowledge audit logs.
4. **FatigueGuard**: Relies on configurable rule-based time thresholds; it is a workforce safety indicator, not a medical device.
