# 💰 wiremit-interview-test

A modern, responsive fintech web application built with React, TypeScript, and Tailwind CSS. Experience seamless money transfers, transaction management, and financial services with an intuitive user interface.

## 🚀 Live Demo

**[View Live Demo] https://nashe01-wiremit-interview-test.vercel.app/**

## 🛠️ Tech Stack

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-06B6D4?style=for-the-badge&logo=tailwindcss)
![Radix UI](https://img.shields.io/badge/Radix_UI-1.0.0-161618?style=for-the-badge&logo=radixui)
![React Router](https://img.shields.io/badge/React_Router-6.30.1-CA4245?style=for-the-badge&logo=reactrouter)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23.12-0055FF?style=for-the-badge&logo=framer)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-7.61.1-EC5990?style=for-the-badge&logo=reacthookform)
![Zod](https://img.shields.io/badge/Zod-3.25.76-3B82F6?style=for-the-badge&logo=zod)

## 🎨 Design & Development Decisions

### 🌿 Color Choice: Green Theme

**Primary Color:** `hsl(159 61% 51%)` - A vibrant emerald green

**Why Green?**
- **Trust & Stability**: Green is universally associated with money, growth, and financial security
- **Professional Appeal**: Creates a trustworthy and professional appearance for financial services
- **Accessibility**: High contrast ratios ensure excellent readability for all users
- **Brand Recognition**: Aligns with major financial institutions and fintech companies
- **Psychological Impact**: Promotes feelings of calm, balance, and prosperity


### 🌓 Light & Dark Mode

**Implementation Strategy:**
- **System Preference Detection**: Automatically detects user's OS theme preference
- **Persistent Storage**: Remembers user's choice across sessions using localStorage
- **Smooth Transitions**: 300ms CSS transitions for seamless theme switching
- **Accessibility Compliance**: Maintains WCAG contrast ratios in both themes

**Why Both Modes?**
- **User Preference**: 42% of users prefer dark mode for reduced eye strain
- **Battery Efficiency**: Dark mode saves battery on OLED/AMOLED displays
- **Professional Flexibility**: Accommodates different work environments and lighting conditions
- **Modern Standard**: Expected feature in contemporary web applications

<img src="src/assets/presentation/lightmode.png" alt="Light Mode" style="width: 100%; max-width: 800px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin: 20px auto; display: block;" />

<img src="src/assets/presentation/darkmode.png" alt="Dark Mode" style="width: 100%; max-width: 800px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin: 20px auto; display: block;" />

### 🔐 Local Storage Authentication

**Implementation Details:**
- **Mock User Management**: Simulates real authentication without backend dependencies
- **Session Persistence**: Users remain logged in across browser sessions
- **Data Validation**: Form validation using Zod schema validation
- **Secure Storage**: Passwords are stored locally for demo purposes

**Why Local Storage for Demo?**
- **Rapid Prototyping**: Enables quick development and testing cycles
- **Offline Capability**: Works without internet connection
- **Demo-Friendly**: Perfect for showcasing UI/UX without backend setup
- **Development Efficiency**: Focus on frontend features rather than authentication infrastructure

<img src="src/assets/presentation/sign in.png" alt="Sign In Form" style="width: 100%; max-width: 800px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin: 20px auto; display: block;" />

<img src="src/assets/presentation/signup.png" alt="Sign Up Form" style="width: 100%; max-width: 800px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin: 20px auto; display: block;" />

### 📱 Strategic Ad Placement

**Right-Side Advertisement Strategy:**
- **Non-Intrusive Design**: Ads positioned to avoid interfering with core functionality
- **User Experience Priority**: Main content remains the primary focus
- **Responsive Layout**: Ads adapt to different screen sizes seamlessly
- **Performance Optimized**: Lazy loading and efficient rendering

**Why Right Side?**
- **Reading Pattern**: Users typically scan left-to-right, top-to-bottom
- **Content Focus**: Main features remain in the primary viewing area
- **Revenue Optimization**: Strategic placement for better engagement rates
- **User Satisfaction**: Maintains clean, uncluttered interface

<img src="src/assets/presentation/sendmoney.png" alt="Send Money Interface with Ad Placement" style="width: 100%; max-width: 800px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin: 20px auto; display: block;" />

### 📱 Responsive Design

**Multi-Device Compatibility:**
- **Mobile-First Approach**: Designed for mobile devices first, then enhanced for larger screens
- **Breakpoint Strategy**: Tailwind CSS breakpoints for consistent responsive behavior
- **Touch-Friendly**: Optimized touch targets and gestures for mobile users
- **Performance Optimized**: Efficient rendering across all device types

**Responsive Features:**
- **Flexible Grid System**: Adapts to different screen sizes automatically
- **Mobile Navigation**: Collapsible sidebar and mobile-optimized menus
- **Touch Gestures**: Swipeable carousels and intuitive mobile interactions
- **Adaptive Typography**: Font sizes that scale appropriately across devices

<div style="display: flex; gap: 20px; justify-content: center; margin: 20px 0;">
  <img src="src/assets/presentation/mobilelight.jpg" alt="Mobile Light Mode" style="width: 45%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
  <img src="src/assets/presentation/mobiledark.jpg" alt="Mobile Dark Mode" style="width: 45%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
</div>

## 🏗️ Project Structure

```
pocket-sparkle-flow-main/
├── public/                 # Static assets and public files
│   ├── ads/               # Advertisement images
│   ├── logo.png           # Application logo
│   └── placeholder.svg    # Default placeholder image
├── src/                   # Source code directory
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # Shadcn/ui components
│   │   ├── AdsCarousel.tsx
│   │   ├── Navbar.tsx
│   │   ├── SendMoney.tsx
│   │   └── ...           # Other components
│   ├── context/          # React Context providers
│   │   ├── AuthContext.tsx
│   │   ├── RatesContext.tsx
│   │   └── ThemeContext.tsx
│   ├── data/             # Mock data and static content
│   │   ├── ads.json
│   │   ├── fees.json
│   │   └── transactions.json
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions and helpers
│   ├── pages/            # Application pages and routes
│   │   ├── Dashboard.tsx
│   │   ├── LandingPage.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles and CSS variables
├── package.json           # Dependencies and scripts
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite build configuration
```

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher) or **bun** (v1.0.0 or higher)
- **Git** (for cloning the repository)

### Quick Start

1. **Clone the Repository**
   ```bash
   git clone https://github.com/nashe01/nashe01-wiremit_interview_test.git
   cd wiremit_interview_test
   ```

2. **Install Dependencies**
   ```bash
   # Using npm(recommended)
   npm install
   
   # Using bun 
   bun install
   ```

3. **Start Development Server**
   ```bash
   # Using npm
   npm run dev
   
   # Using bun
   bun dev
   ```

4. **Open in Browser**
   Navigate to `http://localhost:` to view the application

### Build for Production

```bash
# Using npm
npm run build

# Using bun
bun run build
```

### Available Scripts

- `dev` - Start development server with hot reload
- `build` - Build for production
- `build:dev` - Build for development
- `preview` - Preview production build locally
- `lint` - Run ESLint for code quality checks


## 🎯 Key Features

- **💰 Money Transfer System**: Multi-step money transfer with validation
- **📊 Transaction History**: Comprehensive transaction tracking and management
- **🎨 Theme Switching**: Light and dark mode with smooth transitions
- **📱 Responsive Design**: Optimized for all device sizes
- **🔐 User Authentication**: Local storage-based user management
- **📈 Real-time Rates**: Dynamic exchange rate calculations
- **🎪 Ad Integration**: Strategic advertisement placement
- **⚡ Performance**: Optimized with Vite and modern React patterns
- **📊 Transaction Management Showcase**


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Shadcn/ui** for beautiful, accessible components
- **Tailwind CSS** for utility-first styling
- **Radix UI** for accessible primitives
- **Framer Motion** for smooth animations
- **Vite** for fast development experience

---

