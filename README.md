# WireMit - Send Pocket Money App

A modern, responsive web application for international money transfers built with React, TypeScript, and Tailwind CSS. This project was created as part of a frontend developer interview showcase.

## 🚀 Live Demo

Visit the live application: [WireMit App](https://lovable.dev/projects/d6e1aa99-07f5-479e-8743-28fabd924fff)

## 🛠 Tech Stack

- **Frontend Framework**: Vite + React 18
- **Type Safety**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **State Management**: React Context API
- **Routing**: React Router DOM
- **Data Fetching**: TanStack Query
- **Form Handling**: React Hook Form with Zod validation

## 🎨 Design Philosophy

### Color Scheme
- **Primary Green**: `hsl(159 61% 51%)` - Trust and financial security
- **Secondary Green**: `hsl(151 55% 41.5%)` - Supporting actions
- **Success Green**: `hsl(142 76% 36%)` - Completed transactions
- **White/Gray Scale**: Clean, professional interface

### Design System Features
- **Custom gradients** for CTAs and hero sections
- **Consistent shadows** with primary color integration
- **Responsive design** with mobile-first approach
- **Semantic color tokens** for maintainability
- **Smooth animations** for enhanced UX

## 🏗 Architecture & Component Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui base components
│   ├── Navbar.tsx       # Main navigation
│   ├── OnboardingModal.tsx
│   ├── SignInForm.tsx
│   ├── SignUpForm.tsx
│   ├── SendMoney.tsx    # Multi-step money transfer
│   ├── ReviewTransaction.tsx
│   ├── TransactionHistory.tsx
│   ├── AdsCarousel.tsx  # Promotional content
│   └── Pagination.tsx
├── context/             # Global state management
│   ├── AuthContext.tsx  # User authentication
│   └── RatesContext.tsx # Exchange rates
├── data/                # Static JSON data
│   ├── fees.json        # Transfer fees by currency
│   ├── ads.json         # Promotional content
│   └── transactions.json # Mock transaction history
├── pages/               # Main application pages
│   ├── LandingPage.tsx  # Marketing homepage
│   ├── Dashboard.tsx    # User dashboard
│   └── NotFound.tsx     # 404 error page
└── assets/              # Static images and icons
```

## 🔄 Data Flow Architecture

### Authentication Flow
1. **Local Storage Mock Auth**: User credentials stored in browser localStorage
2. **Context Provider**: AuthContext manages global authentication state
3. **Protected Routes**: Dashboard accessible only when authenticated
4. **Automatic Login**: Persists session across browser refreshes

### Exchange Rates Integration
1. **External API**: Fetches real-time rates from MockAPI endpoint
2. **Context Provider**: RatesContext manages global exchange rate state
3. **Fallback Data**: Graceful degradation with hardcoded rates if API fails
4. **Manual Refresh**: Users can update rates with refresh button

### Transaction Processing
1. **Multi-step Form**: Progressive disclosure for complex transfer process
2. **Real-time Validation**: Immediate feedback on form inputs
3. **Fee Calculation**: Dynamic fee computation based on currency and amount
4. **Exchange Rate Application**: Automatic conversion with rate rounding
5. **Local Storage**: Transaction history persisted in browser

## 🎯 Key Features Implemented

### Landing Page
- **Hero Section**: Compelling value proposition with animated cards
- **Feature Highlights**: Trust indicators and key benefits
- **Statistics Display**: Social proof with user numbers
- **Responsive Design**: Optimized for all device sizes
- **Call-to-Action**: Clear path to account creation

### Authentication System
- **Modal-based Onboarding**: Smooth signup/signin experience
- **Form Validation**: Real-time input validation with error states
- **Password Security**: Show/hide toggle with minimum length requirements
- **User Persistence**: Session management with localStorage
- **Error Handling**: User-friendly error messages

### Money Transfer Flow
- **4-Step Process**: 
  1. Destination & Amount
  2. Delivery Method Selection  
  3. Recipient Details
  4. Review & Confirm
- **Progress Indicator**: Visual step progression
- **Fee Calculation**: Transparent fee display
- **Exchange Rate Display**: Real-time conversion rates
- **Payment Methods**: Credit/debit card integration ready
- **Collection Instructions**: Clear recipient guidance

### Dashboard Features
- **Tabbed Interface**: Send Money, History, Overview
- **Transaction History**: Paginated list with search/filter
- **Status Tracking**: Visual status indicators
- **Promotional Carousel**: Auto-playing ads with pause on hover
- **Quick Stats**: Account summary information

## 🔧 Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation
```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📊 Design Decisions & Trade-offs

### localStorage for Authentication
**Decision**: Mock authentication using browser localStorage
**Rationale**: 
- Simulates real authentication without backend complexity
- Allows full user flow demonstration
- Persists across browser sessions for better UX
- Easy to extend to real API integration

### JSON for Dashboard Data
**Decision**: Static JSON files for fees, ads, and transaction history
**Rationale**:
- Demonstrates data structure and component integration
- Easy to modify for different scenarios
- Simulates real API responses
- Allows focus on frontend implementation

### Context API for State Management
**Decision**: React Context instead of Redux/Zustand
**Rationale**:
- Sufficient for application complexity
- Reduces bundle size and complexity
- Built-in to React ecosystem
- Easy to understand and maintain

### Component-based Architecture
**Decision**: Granular component separation
**Rationale**:
- Enhances reusability and testing
- Follows single responsibility principle
- Easier maintenance and debugging
- Better team collaboration

## 🔮 Scalability Considerations

### Adding More Currencies
- Extend `currencies` array in SendMoney component
- Add corresponding fee rates in `fees.json`
- Update exchange rate API integration
- Implement currency-specific validation

### Enhanced Delivery Methods
- Add new methods to `deliveryMethods` array
- Implement method-specific validation rules
- Add collection instruction templates
- Integrate with payment provider APIs

### Advanced Features
- **Real-time Notifications**: WebSocket integration for status updates
- **Saved Recipients**: Frequently used recipient storage
- **Transaction Scheduling**: Future-dated transfers
- **Multi-currency Wallets**: Account balance management
- **KYC Integration**: Identity verification workflows

### Performance Optimizations
- **Code Splitting**: Route-based lazy loading
- **Image Optimization**: WebP format and lazy loading
- **API Caching**: React Query for data management
- **Bundle Analysis**: Webpack bundle analyzer integration

## 🐛 Known Issues & Future Improvements

### Current Limitations
- Mock authentication (no real security)
- Static exchange rates (need real-time updates)
- No actual payment processing
- Limited error handling for edge cases

### Planned Enhancements
- Real backend API integration
- Stripe/PayPal payment processing
- Push notifications for transaction updates
- Advanced filtering and search
- Export transaction history to PDF/CSV
- Multi-language support (i18n)

## 🔒 Security Considerations

### Current Implementation
- Client-side validation only
- No real authentication tokens
- Local data storage only

### Production Requirements
- JWT token authentication
- HTTPS enforcement
- Input sanitization and validation
- Rate limiting for API calls
- PCI DSS compliance for payments
- Data encryption for sensitive information

## 📱 Mobile Responsiveness

The application is built with a mobile-first approach:
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Flexible Layouts**: CSS Grid and Flexbox for responsive design
- **Touch Interactions**: Optimized button sizes and hover states
- **Progressive Enhancement**: Core functionality works on all devices

## 🧪 Testing Strategy

### Recommended Testing Approach
- **Unit Tests**: Component testing with React Testing Library
- **Integration Tests**: User flow testing with Cypress
- **E2E Tests**: Complete application workflows
- **Accessibility Tests**: WCAG compliance verification
- **Performance Tests**: Lighthouse audits

## 📄 License

This project was created for interview purposes and demonstrates frontend development capabilities.

---

*Built with ❤️ using React, TypeScript, and Tailwind CSS*