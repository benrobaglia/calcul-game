Quick app I built to practice mental math. Play here: https://benrobaglia.github.io/calcul-game/


## Prerequisites

- Node.js (v18 or higher recommended)
- npm (comes with Node.js)

## Installation

```sh
npm install
```

## Running the App

### Development Mode
```sh
npm run dev
```
- Runs the app in development mode
- Access at: http://localhost:5173/
- Features hot-reload for instant updates

### Production Build
```sh
npm run build
npm run preview
```
- Creates optimised production build
- Runs preview server to test production build

## Project Structure

```
src/
├── components/       # Vue components
│   ├── SettingsPage.vue
│   ├── GamePage.vue
│   └── ResultsPage.vue
├── App.vue           # Main app component
├── main.ts           # App entry point
└── assets/           # Static assets
```
