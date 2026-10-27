# FairShift Security Specification & Invariants (Phase 4)

## 1. System Invariants & RBAC Boundaries
1. **No Client Role Promotion**: Users cannot set `role: "employer"` on their profile during registration or updates. Employer role requires an authorized entry in `/employers/{uid}`.
2. **Worker Isolation**: Workers can only read and write their own shift attendance records (`shifts/{shiftId}`) where `workerId == request.auth.uid`.
3. **Identity Shielding in SafeVoice**: Reports stored in `/safetyReports/{reportId}` do NOT contain the reporter's user UID or identity, guaranteeing retaliation protection. Any signed-in user can file a report.
4. **Restricted Report Remediation**: Only authorized employers (`isEmployer()`) can update report status (`Open -> In Progress -> Resolved`) and append supervisor remediation logs.
5. **Data Immutability**: On shift completion, `workerId` and `id` cannot be modified.

## 2. The Dirty Dozen Security Threat Payloads
1. **Self-Promotion to Employer**:
   - Attack: Worker sends `setDoc(doc(db, 'users', uid), { role: 'employer' })`.
   - Expected: `PERMISSION_DENIED` unless verified against `employers` collection.
2. **Shift Tampering by Other Workers**:
   - Attack: Worker A attempts `updateDoc(doc(db, 'shifts', shiftBId), { estimatedPay: 999999 })`.
   - Expected: `PERMISSION_DENIED` (workerId mismatch).
3. **Ghost Employer Elevation**:
   - Attack: User attempts to create an entry in `employers/{uid}` without the secret verification code.
   - Expected: `PERMISSION_DENIED`.
4. **Safety Report Sabotage**:
   - Attack: Worker attempts to delete or alter an open hazard report.
   - Expected: `PERMISSION_DENIED` (only `isEmployer()` can update status).
5. **Unauthenticated Shift Creation**:
   - Attack: Request with `auth == null` attempts to write to `/shifts/`.
   - Expected: `PERMISSION_DENIED` (global default deny).
6. **Malicious ID Injection**:
   - Attack: Attempt to write document with ID containing path traversal `../../`.
   - Expected: `PERMISSION_DENIED` (`isValidId` regex `^[a-zA-Z0-9_\-]+$` constraint).
7. **Junk Field Flooding**:
   - Attack: Submitting unexpected arbitrary fields.
   - Expected: Schema rejection.
8. **Worker Snooping**:
   - Attack: Worker queries shifts belonging to another user.
   - Expected: Query rejected because rule enforces `resource.data.workerId == request.auth.uid`.
9. **Tampering with Terminal State**:
   - Attack: Reopening resolved reports without supervisor authorization.
   - Expected: `PERMISSION_DENIED`.
10. **Orphaned Writes**:
    - Attack: Writing shifts without required timestamp or status.
    - Expected: `PERMISSION_DENIED`.
11. **Admin Impersonation via Header / Token Spoofing**:
    - Attack: Relying on client claims.
    - Expected: `PERMISSION_DENIED` (Firestore rules evaluate server-side document existence only).
12. **SafeVoice Anonymity Extraction**:
    - Attack: Attempting to fetch reporter UID from safety report.
    - Expected: Field does not exist in schema.
