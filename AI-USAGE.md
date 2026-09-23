# AI usage

This project was built with AI assistance. This file is the record of it. It is
graded as the finals badge, and it is worth 100 points.

Start it in week 1 and keep it up as you go. The commit history of this file is
part of the evidence: a file written all at once the night before the deadline
looks exactly like what it is.

## 1. How I used AI

At least six entries. One per real use. Every entry needs a commit link.

### 2026-09-20 - UI Design Refinement

* **Tool:** Excalidraw, Figma, Google Stitch, and ChatGPT
* **What I asked for:** I first created my initial UI ideas and layouts using Excalidraw and Figma. I then used Google Stitch for further UI refinement and used ChatGPT to help coordinate the visual design, including the color palette, font style, spacing, layout, and interface elements.
* **What it gave back:** The tools helped refine the original UI concept into a more consistent futuristic interface. ChatGPT helped suggest a coordinated color palette, typography, spacing, and interface elements that could be applied consistently across the different screens.
* **What I kept, what I changed, and why:** I used my own initial UI concept as the starting point and reviewed the suggestions from the tools. I kept design elements that matched the look and usability I wanted, while changing or removing elements that did not fit my intended application or project scope.
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/5266abe083b21adfb9333efc03453d4a2d6d5503

### 2026-09-23 - React Page Implementation

* **Tool:** ChatGPT
* **What I asked for:** I asked AI to help me turn the completed UI designs into React pages and components for WAKE Protocol. I asked for code that was straightforward and easy for me to understand and work with in React.
* **What it gave back:** AI provided React component structures and code for the different application screens, including Home, Manage Alarms, Create/Edit Alarm, and Active Alarm interfaces.
* **What I kept, what I changed, and why:** I kept the basic React structures because they were simple enough for me to understand and modify. I reviewed the generated code while implementing and testing each screen, and changed parts when they did not match the intended design or behavior. I handled the connection between the pages myself through `App.jsx` and the navigation components.
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/5266abe083b21adfb9333efc03453d4a2d6d5503

## 2. Where the AI got it wrong

Three cases. Be specific. If you write that the AI was never wrong, this section
scores zero.

### Case 1 - Unnecessary Features and Scope

* **What it gave me:** AI suggested and incorporated several interface features that were not part of the application's intended scope.
* **What was wrong with it:** Some of the suggested features added unnecessary functionality or made the application more complicated than needed for the approved WAKE Protocol concept.
* **What I did instead:** I reviewed the suggestions individually and removed features that were not useful for the project. I kept the weekday/weekend alarm filtering because it could make alarms easier to find, and I kept the roller-style time selector because I liked the interaction and it fit the alarm configuration screen. Some other ideas were removed, while a few were left for consideration as development continues.
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/5266abe083b21adfb9333efc03453d4a2d6d5503

## 3. Who wrote what

At least a fifth of this project is code you wrote yourself. Name it, and explain
it in your own words.

> Group projects: give each member their own heading below, and use your GitHub
> handle as the heading. You are graded on your own section.

### Written by me

#### Navigation Buttons

* **File:** `client/src/components/BottomNav.jsx`
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/5266abe083b21adfb9333efc03453d4a2d6d5503
* **What it does and why it is built this way:** I worked on the navigation buttons used for the Home and Manage screens. Each button calls the navigation function with the page it should open, and the current page is used to show which navigation item is active. I understand this because it uses React props, button events, and conditional class names.

#### Alarm Toggle

* **File:** `client/src/pages/ManageAlarms.jsx`
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/5266abe083b21adfb9333efc03453d4a2d6d5503
* **What it does and why it is built this way:** I worked on the alarm enable/disable toggle. The function finds the alarm with the selected ID and creates an updated alarm object with its `enabled` value switched. React state is then updated with the modified alarm list. This was kept simple so the alarm status could be changed directly from the Manage Alarms screen.

#### Page Connection

* **File:** `client/src/App.jsx`
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/5266abe083b21adfb9333efc03453d4a2d6d5503
* **What it does and why it is built this way:** I connected the different React pages myself through `App.jsx`. The `page` state stores which screen is currently being displayed, and the navigation function changes that state. `App.jsx` then conditionally renders the corresponding page component, such as Home, Manage Alarms, Create Alarm, or Active Alarm. I used this approach because it was straightforward and I could understand how React state and conditional rendering connect the different screens.

### The AI-written part I understand best

* **File:** `client/src/styles.css`
* **Commit:** https://github.com/kumaarrkkshitij/WAKE_PROTOCOL/commit/5266abe083b21adfb9333efc03453d4a2d6d5503
* **What it does and why we kept it:** A larger portion of the visual styling was AI-assisted, particularly the card layouts, borders, spacing, glow effects, and responsive behavior. I understand how these styles are used to create the visual structure of the application, even though some of the more detailed CSS would have taken me longer to write from scratch. I understand that the card styling uses properties such as borders, border radius, padding, backgrounds, and shadows to create the visual components, while the responsive rules change the layout depending on the screen width. We kept this approach because it allows the same application to work in a desktop browser while also presenting the interface in a mobile-sized viewport.
