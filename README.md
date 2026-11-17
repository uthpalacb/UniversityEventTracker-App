# University Event Tracker git 

A cross-platform mobile application built with **React Native**, **Expo (SDK 58)**, **Expo Router**, and **TypeScript** designed to help university students discover, filter, bookmark, and receive reminders for campus events.

---

#1. Overview & Problem Statement

### What is the Application?
**University Event Tracker** is a centralized mobile event management and discovery application tailored for university students. It provides an intuitive interface to browse upcoming academic, technical, sports, and cultural events happening on campus.

### What Problem Does It Solve?
In a typical university environment, announcements for hackathons, workshops, cultural festivals, and sports tournaments are scattered across physical notice boards, emails, and fragmented social media groups. Because of this, students frequently miss important events or struggle to keep track of schedules they are interested in. This application solves that problem by:
- **Centralizing Event Information:** Bringing all campus events into a single, easily accessible mobile feed.
- **Reducing Information Overload:** Allowing students to filter events based on specific interests (Tech, Sports, Cultural).
- **Personalizing Schedules:** Enabling students to bookmark events of interest and receive instant local notifications as confirmation and reminders.

---

#2. Application Screens & Their Purposes

The application consists of **3 primary screens** managed via tab-based and hidden stack routing:

1. **Events Screen (`src/app/index.tsx`):**
   - **Purpose:** Acts as the main landing screen of the application. It displays a scrollable feed of all upcoming university events, provides a category filter modal to narrow down events by type, and allows users to bookmark events directly from the feed.
2. **Bookmarks Screen (`src/app/bookmarks.tsx`):**
   - **Purpose:** Displays a personalized list of events saved by the user. Synchronized globally via React Context (`BookmarkContext`), it dynamically updates whenever an event is bookmarked or unbookmarked and displays an informative empty state when no bookmarks exist.
3. **Event Detail Screen (`src/app/event-detail.tsx`):**
   - **Purpose:** Provides an in-depth view of a selected event. When a user taps on any event card from either the Events feed or the Bookmarks list, they are navigated to this screen to view the full event banner, date, venue location, category, and detailed description.

---

#3. Core React Native Components Used

The user interface and interactive functionality are built using the following core React Native components:

- **`View`:** Used across all screens (`index.tsx`, `bookmarks.tsx`, `event-detail.tsx`) as the fundamental layout container for structuring headers, cards, modals, and screen wrappers.
- **`Text`:** Implemented throughout the application to render event titles, dates, locations, button labels, empty-state messages, and modal options.
- **`FlatList`:** Used in both `index.tsx` and `bookmarks.tsx` to efficiently render performant, scrollable lists of event cards.
- **`Image`:** Implemented inside event cards (`index.tsx`, `bookmarks.tsx`) and on the `event-detail.tsx` header to display event cover banners.
- **`Pressable`:** Used for all interactive touch targets, including event cards (for navigation), the category filter button, modal category selection options, and bookmark toggle buttons.
- **`Modal`:** Implemented in `index.tsx` to render a pop-up overlay menu that allows users to filter the event feed by category (`All`, `Tech`, `Sports`, `Cultural`).

---

#4. Expo Router Directory Structure

The application utilizes **Expo Router's file-based routing** system inside the `src/app/` directory:

```text
src/
├── app/
│   ├── _layout.tsx        # Root layout configuring <Tabs> navigation and wrapping the app in <BookmarkProvider>
│   ├── index.tsx          # Default initial route ("Events" bottom tab)
│   ├── bookmarks.tsx      # Secondary bottom tab route ("Bookmarks" tab)
│   └── event-detail.tsx   # Dynamic detail route hidden from the bottom tab bar using `href: null`
├── context/
│   └── BookmarkContext.tsx # Global React Context state for managing bookmarked events across tabs
└── data/
    └── events.ts          # Structured TypeScript dataset and interfaces for university events

    _layout.tsx: Defines the bottom tab navigator (<Tabs>) with custom @expo/vector-icons (Ionicons) for the Events and Bookmarks tabs, while wrapping the navigation tree inside BookmarkProvider so state is shared seamlessly across screens.

    Hidden Route (event-detail.tsx): Configured with options={{ href: null }} in _layout.tsx so it remains accessible programmatically via router.push() when tapping an event card without cluttering the bottom tab bar.

#5. Implementing Local Notifications (expo-notifications)

Research & Approach
To notify users immediately upon bookmarking an event without requiring a complex backend push-notification server, I researched Expo's native device notification capabilities and selected the expo-notifications library.

Implementation Details
Package Integration: Installed expo-notifications compatible with Expo SDK 58.

Immediate Triggering: Within the handleBookmark function in src/app/index.tsx, Notifications.scheduleNotificationAsync() is invoked asynchronously whenever a user toggles a bookmark.

Configuration: Set trigger: null so the notification fires instantaneously on the device, displaying a custom title ("University Event Tracker") and dynamic body text referencing the specific bookmarked event title, paired with an immediate UI state update via BookmarkContext.


#6. Local Setup & Installation Guide
Follow these steps to clone, install dependencies, and run the project locally on your machine:

Installation & Running Commands

Clone the repository:
git clone [https://github.com/uthpalacb/UniversityEventTracker-App.git](https://github.com/uthpalacb/UniversityEventTracker-App.git)


Navigate into the project directory:
cd UniversityEventTracker-App


Install required dependencies:
npm install


Start the Expo development server:
npx expo start -c



## Demonstration Video
You can watch the full walkthrough and feature demonstration of the University Event Tracker app here:
https://drive.google.com/file/d/1n-aDl5Bb4p7t8Doj15OdpGlBuI9RFJDS/view?usp=sharing