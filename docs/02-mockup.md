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

![WAKE Protocol Home screen](assets/mockup-home.png)

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

![WAKE Protocol Manage Alarms screen](assets/mockup-manage-alarms.png)

### Empty State

When no alarms have been created, Manage Alarms displays an empty state instead of an alarm list. The user is provided with a clear way to create their first alarm.

![WAKE Protocol Manage Alarms empty state](assets/mockup-manage-alarms-empty.png)

---

## 3. Create Alarm

The Create Alarm screen allows the user to configure and save a new alarm.

### Final UI includes

* Alarm name
* Alarm time
* AM/PM period
* Repeat-day selection
* Local music file selection
* Challenge type selection

  * Math
  * Typing
* Save alarm action
* Cancel/back navigation

The selected audio file is stored locally in the browser using IndexedDB. The audio itself is not uploaded to the backend.

![WAKE Protocol Create Alarm screen](assets/mockup-create-alarm.png)

---

## 4. Edit Alarm

The Edit Alarm screen allows the user to modify an existing alarm using the same core configuration options available when creating an alarm.

### Final UI includes

* Existing alarm name
* Existing alarm time
* Existing AM/PM period
* Existing repeat days
* Existing music selection
* Existing challenge type
* Save changes action
* Cancel/back navigation

Changes are persisted through the backend API and PostgreSQL database.

### Interface refinements

The original wireframe showed Edit as a management action for an existing alarm. In the final UI, the user accesses Edit by selecting the **pencil icon directly on the corresponding alarm card** in Manage Alarms.

The Edit Alarm screen itself remains focused on changing the alarm's configuration rather than providing separate delete controls.

![WAKE Protocol Edit Alarm screen](assets/mockup-edit-alarm.png)

---

## 5. Active Alarm / Challenge

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

![WAKE Protocol Active Alarm screen](assets/mockup-active-alarm.png)

---

## 6. Mobile Presentation

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

![WAKE Protocol mobile presentation](assets/mockup-mobile.png)

---

## 7. Visual Design

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

## 8. Feature Refinements from the Original Wireframes

The original M6A2 wireframes established the five main screens:

1. Home
2. Manage Alarms
3. Create Alarm
4. Edit Alarm
5. Active Alarm / Challenge

All five screens remain in the finalized application.

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

## 9. Screen and Feature Coverage

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

## 10. Mockup-to-Implementation Check

The mockup represents the finalized application rather than an earlier proposed design.

The five original screens remain present, while the interface has been refined during implementation to improve usability, especially on mobile devices.

The mockup therefore reflects the application that was actually built and deployed rather than a separate redesign that differs from the final product.

---

## 11. Assets

The exported mockup screenshots are stored in the repository under:

```text
assets/
├── mockup-home.png
├── mockup-manage-alarms.png
├── mockup-manage-alarms-empty.png
├── mockup-create-alarm.png
├── mockup-edit-alarm.png
├── mockup-active-alarm.png
└── mockup-mobile.png
```

The images above are referenced directly by this document using relative Markdown paths. Once the corresponding files are placed in `assets/`, GitHub will automatically display them here without requiring any further changes to `mockup.md`.

---

## 12. Notes on the Final Mockup

The finalized mockup preserves the main user flow established in the original wireframes:

**Home → Create Alarm → Manage Alarms → Edit Alarm → Active Alarm / Challenge → Home**

The core functionality remains consistent with the approved wireframes. The differences are primarily visual and interaction refinements made during implementation to provide a cleaner and more practical mobile interface.

The mockup also reflects the final implemented backend-connected alarm system, local music storage, challenge system, alarm triggering, and alarm-management controls.
