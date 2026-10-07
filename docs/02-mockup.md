# Mockup

The prelim wireframes submitted for M6A2 are not being redone. This mockup shows the finalized visual design of WAKE Protocol using the actual colours, typography, spacing, content, controls, and responsive mobile layout of the implemented application.

The core features and five-screen structure from the original wireframes remain present. Some interface details were refined during implementation to make the application more compact, intuitive, and suitable for mobile use.

## 1. Home

The Home screen is the main dashboard of WAKE Protocol. It allows the user to quickly see their current time and next upcoming alarm while providing access to alarm management.

### Final UI includes

* Friendly "Good day!" greeting
* Live local time
* Next upcoming enabled alarm
* Alarm name and scheduled time
* Wake-up consistency information
* Quick access to create and manage alarms
* Automatic alarm triggering when a scheduled alarm is reached
* Bottom navigation

<p align="center">
  <img src="assets/home.png" alt="WAKE Protocol Home screen" width="340"/>
</p>

---

## 2. Manage Alarms

Manage Alarms is the main screen for viewing and managing saved alarms.

Each alarm is displayed as an individual alarm card containing its important information and management controls.

### Final UI includes

* Alarm name
* Alarm time and AM/PM period
* Repeat days
* Enabled/disabled status
* Enable/disable toggle
* Edit action
* Delete action
* Chronological alarm sorting
* All / Workdays / Weekend / Inactive filters
* Create Alarm action
* Bottom navigation

### Interface refinements

The original wireframe included separate Edit and Delete controls for managing an alarm. In the final implementation, these actions are integrated directly into each alarm card using **pencil and delete icons**. This keeps the card compact and makes the actions easier to access on a phone.

The Create Alarm action remains available from the Manage Alarms screen.

<p align="center">
  <img src="assets/manage-alarms.png" alt="WAKE Protocol Manage Alarms screen" width="340"/>
</p>

### Empty State

When no alarms have been created, Manage Alarms displays an empty state instead of an alarm list. The user is provided with a clear way to create their first alarm.

---

## 3. Create & Edit Alarm

The Create and Edit Alarm screens allow the user to configure a new alarm or modify an existing one using the same core configuration options.

### Final UI includes

* Alarm name
* Alarm time and AM/PM period
* Repeat-day selection (`M`, `T`, `W`, `TH`, `F`, `SA`, `SU`)
* Local music file selection (stored in browser IndexedDB)
* Challenge type selection (Math or Typing)
* Save and Cancel/Back navigation actions

Changes to existing alarms are persisted through the backend API and PostgreSQL database.

### Interface refinements

The original wireframe showed Edit as a separate management action. In the final UI, the user accesses Edit by selecting the **pencil icon directly on the corresponding alarm card** in Manage Alarms.

<p align="center">
  <img src="assets/create%3Aedit-alarm.png" alt="WAKE Protocol Create & Edit Alarm screen" width="340"/>
</p>

---

## 4. Active Alarm / Challenge

The Active Alarm / Challenge screen appears automatically when a scheduled alarm reaches its configured time.

The selected local music begins playing and the user must successfully complete the selected challenge before the alarm can be dismissed.

### Final UI includes

* Active alarm information
* Current time
* Selected local music
* Math or Typing challenge
* Answer input
* Challenge validation
* Incorrect-answer feedback
* Full 3/3 challenge progress indicator
* Completion feedback
* Alarm dismissal after successful completion

If the user provides an incorrect answer, the challenge remains active and the alarm cannot be dismissed.

After successful completion, the alarm workflow finishes and the user returns to the Home screen.

If the alarm music finishes before the required challenge is completed, the alarm is recorded as missed.

<table align="center" width="100%">
  <tr>
    <td align="center" width="50%">
      <b>Math Mission</b><br/><br/>
      <img src="assets/active-math.png" alt="WAKE Protocol Math Mission" width="300"/>
    </td>
    <td align="center" width="50%">
      <b>Typing Mission</b><br/><br/>
      <img src="assets/active-typing.png" alt="WAKE Protocol Typing Mission" width="300"/>
    </td>
  </tr>
</table>

---

## 5. Mobile Presentation

WAKE Protocol is a responsive web application designed around a mobile-first interface.

The finalized application uses a compact phone layout with:

* Touch-friendly controls
* Responsive spacing
* Scrollable screen content
* Bottom navigation within the application
* Consistent card-based layout
* Stark Protocol-inspired dark visual design
* Blue accent elements
* Clear alarm and challenge status indicators

<p align="center">
  <img src="assets/Square%20image_WAKE%20PROTOCOL.png" alt="WAKE Protocol mobile presentation" width="580"/>
</p>

---

## 6. Visual Design

The finalized mockup uses the visual design implemented throughout WAKE Protocol.

### Visual characteristics

* Dark Stark Protocol-inspired theme
* High-contrast text
* Blue accent elements
* Rounded cards and controls
* Consistent spacing and typography
* Clear visual hierarchy
* Touch-friendly controls
* Mobile-oriented layout
* Focused alarm and challenge information

The mockup uses real application content rather than placeholder text.

---

## 7. Feature Refinements from the Original Wireframes

The original M6A2 wireframes established the main screen functions:

1. Home
2. Manage Alarms
3. Create & Edit Alarm
4. Active Alarm / Challenge

All core screens remain present in the finalized application.

The implementation introduced several UI refinements while keeping the original functionality intact:

* **Edit alarm:** represented by a pencil icon directly on the alarm card instead of a large standalone Edit button.
* **Delete alarm:** represented by a delete icon directly on the alarm card instead of placing the action inside the Create/Edit screen.
* **Alarm enable/disable:** implemented as a direct toggle on the alarm card.
* **Alarm management:** filtering and chronological sorting were added to make multiple alarms easier to manage.
* **Home:** expanded to include live local time and wake-up consistency information.
* **Active Alarm:** uses a single full 3/3 progress indicator rather than separate challenge stages.
* **Navigation:** implemented through a persistent bottom navigation interface on the main screens.
* **Music:** implemented using browser-local IndexedDB storage for the selected audio files.
* **Challenges:** implemented using backend-provided Math and Typing challenge pools.
* **Responsive layout:** refined for a compact phone-style interface while remaining a responsive web application.

These changes are UI and implementation refinements rather than removal of the original core features.

---

## 8. Screen and Feature Coverage

| Original Wireframe Feature                    | Final Implementation           |
| --------------------------------------------- | ------------------------------ |
| Home screen                                   | Yes                            |
| Current time                                  | Yes, live local time           |
| Next upcoming alarm                           | Yes                            |
| Manage Alarms                                 | Yes                            |
| Multiple alarms                               | Yes                            |
| Enable/disable alarm                          | Yes, direct card toggle        |
| Edit alarm                                    | Yes, pencil icon on alarm card |
| Delete alarm                                  | Yes, delete icon on alarm card |
| Create Alarm                                  | Yes                            |
| Alarm name                                    | Yes                            |
| Alarm time                                    | Yes                            |
| Repeat days                                   | Yes                            |
| Local music                                   | Yes                            |
| Challenge selection                           | Yes                            |
| Math challenge                                | Yes                            |
| Typing challenge                              | Yes                            |
| Active Alarm                                  | Yes                            |
| Challenge validation                          | Yes                            |
| Prevent dismissal before successful challenge | Yes                            |
| Return to Home after completion               | Yes                            |
| Mobile layout                                 | Yes                            |

---

## 9. Mockup-to-Implementation Check

The mockup represents the finalized application rather than an earlier proposed design.

The core screens remain present, while the interface has been refined during implementation to improve usability, especially on mobile devices.

The mockup therefore reflects the application that was actually built and deployed rather than a separate redesign that differs from the final product.

---

## 10. Assets

The exported application screenshots are stored in the repository under:

```text
docs/assets/
├── Square image_WAKE PROTOCOL.png
├── active-math.png
├── active-typing.png
├── create:edit-alarm.png
├── home.png
└── manage-alarms.png
```

The images above are referenced directly by this document using relative Markdown paths.

---

## 11. Notes on the Final Mockup

The finalized mockup preserves the main user flow established in the original wireframes:

**Home → Create & Edit Alarm → Manage Alarms → Active Alarm / Challenge → Home**

The core functionality remains consistent with the approved wireframes. The differences are primarily visual and interaction refinements made during implementation to provide a cleaner and more practical mobile interface.

The mockup also reflects the final implemented backend-connected alarm system, local music storage, challenge system, alarm triggering, and alarm-management controls.
