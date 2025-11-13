# Hula - Dating App 💃

A modern, feature-rich dating application built with React Native and TypeScript. Hula provides a complete dating experience with swipeable profiles, real-time matching, and an intuitive user interface.

## 🚀 Tech Stack

- **Framework**: React Native 0.76.5
- **Language**: TypeScript 5.0.4
- **State Management**: Zustand 5.0.2
- **Navigation**: React Navigation v6
- **Form Handling**: React Hook Form 7.54 + Zod 3.24
- **API Client**: Axios 1.7.9
- **Animations**: React Native Reanimated 3.16.4
- **Gestures**: React Native Gesture Handler 2.20.2
- **Icons**: React Native Vector Icons 10.2.0

## ✨ Features

### ✅ Fully Implemented

#### Authentication & Onboarding
- Welcome screen with branding
- Login/Signup with email validation
- Form validation using React Hook Form + Zod
- Persistent authentication state
- **Profile Setup** - Custom date picker, gender selection, bio input
- **Photo Upload** - Grid layout with 6 photo slots, main photo indicator
- **Interests Selection** - 70+ interests with multi-select chips (min 3, max 10)

#### Core Dating Features
- **Swipeable Cards** - Tinder-style card interface with smooth animations
  - Pan gesture handling with React Native Reanimated
  - Like/Nope labels with dynamic opacity
  - Multi-photo browsing with dots navigation
  - Rotation and translation animations
- **Discover Screen** - Browse potential matches
  - Card deck with next card preview
  - Action buttons (Undo, Pass, SuperLike, Like, Boost)
  - Loading and empty states
- **Matches Screen** - Grid view of all matches
  - 2-column layout with photos
  - Heart indicator overlay
  - Unread message badges
- **Messages Screen** - Conversation list
  - Avatar with verified badge
  - Last message preview
  - Unread indicators
  - Timestamp formatting
- **Profile Screen** - User profile management
  - Photo with edit button
  - Display name, age, verified badge
  - Interests chips
  - Menu items (Settings, Safety, Help, About)
  - Logout functionality

#### UI Components
- **Button** - Primary, secondary, outline variants with loading states
- **Input** - Text input with label and error display
- **DatePicker** - Custom modal picker with month/day/year selection
- **RadioGroup** - Gender selection with visual feedback
- Reusable, type-safe components with consistent styling

#### State Management
- **AuthStore** - User authentication, login, signup, logout, persistence
- **ProfileStore** - Profile browsing, like/pass/superlike actions, 5 mock profiles
- **MatchStore** - Match management and message tracking

#### Utilities
- Form validation schemas (login, signup, profile setup)
- Storage utilities (AsyncStorage wrapper)
- Date utilities (age calculation, message time formatting)
- Distance calculation (geolocation math)

#### Design System
- Comprehensive color palette
- Typography scale (xs to xxxl)
- Spacing system (4px to 48px)
- Border radius scale
- Shadow definitions
- Theme constants

### 📝 Ready for Implementation (Backend Required)

- Real-time chat/messaging
- Push notifications
- Actual image picker and upload
- Location-based filtering (permission handling included)
- User preferences editing
- Report and block functionality
- Premium features
- Video calls
- Stories feature

## 🏗️ Project Structure

```
hula/
├── src/
│   ├── components/
│   │   ├── common/          # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── DatePicker.tsx
│   │   │   └── RadioGroup.tsx
│   │   └── cards/           # Card-specific components
│   │       └── ProfileCard.tsx
│   ├── screens/
│   │   ├── auth/            # Authentication screens
│   │   │   ├── WelcomeScreen.tsx
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── SignupScreen.tsx
│   │   │   ├── ProfileSetupScreen.tsx
│   │   │   ├── PhotoUploadScreen.tsx
│   │   │   └── InterestsScreen.tsx
│   │   └── main/            # Main app screens
│   │       ├── DiscoverScreen.tsx
│   │       ├── MatchesScreen.tsx
│   │       ├── MessagesScreen.tsx
│   │       └── ProfileScreen.tsx
│   ├── navigation/          # Navigation configuration
│   │   ├── AppNavigator.tsx
│   │   ├── AuthNavigator.tsx
│   │   └── MainNavigator.tsx
│   ├── services/            # API services
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   └── profileService.ts
│   ├── store/              # Zustand stores
│   │   ├── authStore.ts
│   │   ├── profileStore.ts
│   │   └── matchStore.ts
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Helper functions
│   │   ├── storage.ts
│   │   ├── validation.ts
│   │   ├── date.ts
│   │   └── distance.ts
│   ├── types/              # TypeScript types
│   │   ├── user.ts
│   │   ├── match.ts
│   │   └── navigation.ts
│   ├── constants/          # App constants
│   │   ├── colors.ts
│   │   ├── theme.ts
│   │   └── interests.ts
│   └── assets/             # Images, fonts, etc.
├── ios/                    # iOS native code
├── android/                # Android native code
├── App.tsx                 # Root component
└── package.json            # Dependencies
```

## 🛠️ Installation

### Prerequisites
- Node.js >= 18
- npm or yarn
- React Native development environment
  - For iOS: Xcode 14+, CocoaPods
  - For Android: Android Studio, JDK 17

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd HulaV
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install iOS pods** (iOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Start Metro bundler**
   ```bash
   npm start
   # or
   yarn start
   ```

5. **Run the app**

   For iOS:
   ```bash
   npm run ios
   # or
   yarn ios
   ```

   For Android:
   ```bash
   npm run android
   # or
   yarn android
   ```

## 🎨 Design System

### Colors
- **Primary**: #FF6B6B (Coral Red) - Main actions, buttons
- **Secondary**: #4ECDC4 (Turquoise) - Accents
- **Accent**: #FFE66D (Yellow) - Highlights
- **Success**: #51CF66 (Green) - Like actions
- **Error**: #FF6B6B (Red) - Pass actions
- **Info**: #4DABF7 (Blue) - Verified badges, super likes

### Typography
- Font sizes: xs (12px) to xxxl (32px)
- Font weights: regular (400), medium (500), semibold (600), bold (700)

### Spacing
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, xxl: 48px

## 📱 Key Screens

### Authentication Flow
1. **Welcome Screen** - App branding and sign-in options
2. **Login Screen** - Email/password with validation
3. **Signup Screen** - Account creation with password confirmation
4. **Profile Setup** - Name, date of birth, gender, bio
5. **Photo Upload** - Add 2-6 photos with main photo selection
6. **Interests** - Select 3-10 interests from 70+ options

### Main App Flow
1. **Discover** - Swipeable cards with like/pass actions
2. **Matches** - Grid view of all matches
3. **Messages** - Conversation list
4. **Profile** - User profile with settings menu

## 🎯 User Flow

```
Welcome → Signup/Login → Profile Setup → Photo Upload → Interests
  ↓
Main App (Bottom Tabs):
  ├── Discover (Swipe Cards)
  ├── Matches (Grid View)
  ├── Messages (Chat List)
  └── Profile (Settings)
```

## 🧪 Testing

```bash
# Run tests
npm test
# or
yarn test

# Run linter
npm run lint
# or
yarn lint
```

## 🔒 Security Features

- Form validation with Zod schemas
- Secure password requirements (8+ chars, uppercase, lowercase, number)
- Age verification (18+ required)
- Authenticated API requests with token interceptors
- Secure storage with AsyncStorage

## 📝 Configuration

### API Configuration
Update the API base URL in `src/constants/index.ts`:
```typescript
export const API_BASE_URL = __DEV__
  ? 'http://localhost:3000/api'
  : 'https://api.hula.com';
```

### Theme Customization
Modify colors in `src/constants/colors.ts`:
```typescript
export const Colors = {
  primary: '#FF6B6B',
  // ... other colors
};
```

## 📊 Project Stats

- **Total Files**: 60+
- **Lines of Code**: 4,300+
- **Components**: 15+
- **Screens**: 13
- **Type Definitions**: Full TypeScript coverage
- **State Stores**: 3 (Auth, Profile, Match)

## 🎨 Features Highlights

### Swipeable Cards
- Smooth gesture-based swiping with React Native Reanimated
- Rotation animation based on pan direction
- Dynamic like/nope labels with opacity transitions
- Next card preview with scale animation
- Photo navigation with dots indicator

### Form Validation
- Real-time validation with React Hook Form
- Schema-based validation with Zod
- Custom error messages
- Field-level and form-level validation
- Age verification (18+ requirement)

### Mock Data
- 5 detailed user profiles with multiple photos
- 70+ interest categories
- Realistic profile bios and information
- Location data for distance calculations

## 🚀 Future Enhancements

- Real-time chat with Socket.io
- Push notifications with Firebase
- Image upload with compression
- Video profiles
- Stories feature
- Advanced matching algorithm
- Premium subscription features
- In-app purchases
- Social media integration
- Profile verification
- Location-based search
- Advanced filters

## 🤝 Contributing

This is a demonstration project. For production use, you would need to:
1. Connect to a real backend API
2. Implement actual authentication
3. Add real-time messaging
4. Integrate payment systems
5. Add analytics and crash reporting
6. Implement proper security measures
7. Add comprehensive testing
8. Optimize performance
9. Add accessibility features
10. Implement internationalization

## 📄 License

MIT License

## 👨‍💻 Development

Built with modern React Native best practices:
- TypeScript for type safety
- Zustand for lightweight state management
- React Navigation for seamless navigation
- Reanimated for smooth 60fps animations
- Custom hooks for reusable logic
- Modular component architecture
- Consistent design system
- Comprehensive error handling

---

**Hula** - Where connections happen through swipes ❤️

*Note: This is a fully functional dating app template ready for backend integration.*
