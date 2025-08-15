# WireMit - Money Transfer App

A modern, responsive money transfer application built with React, TypeScript, and Tailwind CSS.

## Features

- **Dark Mode Support**: Full dark/light theme switching with system preference detection
- **Responsive Design**: Mobile-first approach with beautiful UI components
- **Authentication**: User signup, signin, and dashboard functionality
- **Money Transfer**: Multi-step money sending process
- **Transaction History**: Complete transaction tracking and management
- **Modern UI**: Built with shadcn/ui components and Framer Motion animations

## Dark Mode

The app includes comprehensive dark mode support:

- **Theme Toggle**: Click the theme button (sun/moon icon) in the navbar or dashboard header
- **Persistent**: Your theme choice is saved in localStorage
- **Smooth Transitions**: All theme changes include smooth animations and transitions

### Theme Options

- **Light**: Classic light theme with white backgrounds
- **Dark**: Dark theme with dark backgrounds and light text

### Usage

1. **Navbar**: Click the theme toggle button in the top navigation
2. **Dashboard**: Use the theme toggle in the dashboard header
3. **Theme Status**: View your current theme setting in the dashboard header

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser and navigate to the app

## Tech Stack

- React 18 + TypeScript
- Tailwind CSS with custom design system
- shadcn/ui components
- Framer Motion for animations
- Vite for build tooling

## Project Structure

```
src/
├── components/     # Reusable UI components
├── context/       # React context providers
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
└── assets/        # Images and static assets
```

## Contributing

Feel free to submit issues and enhancement requests!