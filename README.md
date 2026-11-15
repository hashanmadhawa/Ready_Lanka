# ReadyLanka

ReadyLanka is an offline emergency-preparedness mobile application built with Expo and React Native. It provides simple emergency guidance, preparation checklists, saved guides, and personal emergency contacts in one easy-to-use app.

The application is designed as an educational project focused on helping users prepare for common emergencies while keeping essential information available without relying on an online API.

## Features

- Offline emergency guidance for floods, fires, severe storms, earthquakes, and landslides.
- Search emergency guides by title, category, or summary.
- Detailed guidance divided into Preparation, During the emergency, and After the emergency sections.
- Emergency-kit checklist with completion progress.
- Save and unsave useful emergency guides.
- Saved Guides section for quick access.
- Add personal emergency contacts.
- Tap a saved contact to call them.
- Delete contacts with confirmation.
- Local data persistence using AsyncStorage.
- Android, iOS, and web support through Expo.
- Offline-first design with no external emergency-data API required.

## Technology Stack

- React Native
- Expo SDK 57
- JavaScript
- AsyncStorage
- Expo Status Bar
- React Native Web

## Project Structure

```text
ReadyLanka/
├── App.js
├── app.json
├── package.json
├── package-lock.json
├── README.md
└── src/
    ├── data/
    │   └── emergencies.js
    └── storage/
        └── storage.js
```

`App.js` contains the main application state, navigation, screens, forms, checklist logic, favorites logic, and contact management.

`src/data/emergencies.js` contains the offline emergency guides and emergency-kit items.

`src/storage/storage.js` contains the AsyncStorage functions used to save and load favorites, checklist progress, and contacts.

## Requirements

Before running the project, install Node.js LTS and npm. Android or iOS development also requires a compatible emulator or physical device setup. The web version can be run directly in a browser.

## Installation

Clone the repository and enter the project folder:

```bash
git clone https://github.com/hashanmadhawa/Ready_Lanka.git
cd ReadyLanka
```

Install the dependencies:

```bash
npm install
```

Check the Expo project configuration:

```bash
npx expo-doctor
```

## Run the Application

Start the Expo development server:

```bash
npx expo start
```

Run the web version:

```bash
npx expo start --web
```

Run on Android:

```bash
npx expo start --android
```

Run on iOS:

```bash
npx expo start --ios
```

The Android and iOS commands require the appropriate emulator or development environment.

## How Local Storage Works

ReadyLanka uses AsyncStorage to save user data locally on the device. The following information is persisted:

- Favorite emergency-guide IDs.
- Completed emergency-kit item IDs.
- Emergency contacts entered by the user.

The emergency guide content is included locally in the application and does not require an internet connection or external database.

## Suggested User Flow

1. Open the Home screen.
2. Select Guides to browse emergency situations.
3. Search for a specific emergency.
4. Open a guide and review the Preparation, During, and After sections.
5. Save important guides for quick access.
6. Open the Kit tab and mark the supplies already prepared.
7. Add trusted people in the Contacts tab.
8. Reopen the app to confirm that saved information remains available.

## Development Commits

The project was developed incrementally through feature-based commits:

1. Create the Expo React Native foundation.
2. Add offline emergency guides and search.
3. Add the emergency-kit checklist.
4. Add saved emergency guides.
5. Complete contacts, local persistence, and final application behavior.

## Validation

The final project was checked with:

```bash
npx expo-doctor
npx expo export --platform web
```

The Expo project passed all Expo Doctor checks and successfully exported for the web.


