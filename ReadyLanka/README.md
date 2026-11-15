# ReadyLanka — Expo Router Structure

ReadyLanka is an offline emergency-preparedness app built with Expo React Native. This version has been reorganized to follow the route-based structure from the supplied Student App reference project.

## Structure

```text
ReadyLanka/
├── app/
│   ├── _layout.jsx
│   ├── index.jsx
│   ├── guides.jsx
│   ├── kit.jsx
│   ├── contacts.jsx
│   ├── saved.jsx
│   ├── about.jsx
│   └── guide/
│       └── [id].jsx
├── assets/
│   └── img/
│       ├── dark.png
│       ├── light.png
│       └── image.jpg
├── components/
│   └── UI.jsx
├── constants/
│   └── Colors.js
├── contexts/
│   ├── AppDataContext.jsx
│   └── ThemeContext.jsx
├── data/
│   └── emergencies.js
├── storage/
│   └── storage.js
├── app.json
├── package.json
└── package-lock.json
```

## Features

- Offline emergency guides for floods, fires, severe storms, earthquakes, and landslides.
- Searchable guide list.
- Dynamic guide detail routes using `app/guide/[id].jsx`.
- Preparation, During, and After emergency advice.
- Emergency-kit checklist with progress.
- Saved emergency guides.
- Emergency contacts list.
- AsyncStorage persistence for favorites, checklist items, and contacts.
- Shared light and dark theme system.
- Theme toggle in the top-right header.
- Expo Router tabs and file-based navigation.

## Theme system

The theme is defined in `constants/Colors.js` and provided through `contexts/ThemeContext.jsx`.

Routes and shared components access the active colors with:

```jsx
const { theme } = useTheme();
```

The top-right button in `app/_layout.jsx` switches between light and dark mode. The tab bar, headers, cards, text, buttons, fields, and detail screens use the active theme colors.

## Setup

```bash
npm install
npx expo-doctor
npx expo start
```

For the web preview:

```bash
npx expo start --web
```

For Android:

```bash
npx expo start --android
```

For iOS:

```bash
npx expo start --ios
```

## Validation

The project currently passes:

```bash
npx expo-doctor
npx expo export --platform web
```

## Important files

`app/_layout.jsx` creates the shared theme provider, data provider, tab navigation, theme toggle, and footer.

`contexts/ThemeContext.jsx` controls light and dark mode.

`contexts/AppDataContext.jsx` shares favorites, checklist progress, and contacts across routes.

`constants/Colors.js` contains the light and dark palettes.

`storage/storage.js` stores user data locally with AsyncStorage.

## Safety note

ReadyLanka is an educational preparedness application. It does not replace instructions from emergency services, medical professionals, government agencies, or local authorities. Always follow current official emergency guidance.
