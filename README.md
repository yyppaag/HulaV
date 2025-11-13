# Hula - Dating App

A modern, feature-rich dating application built with React Native and TypeScript.

## 🚀 Tech Stack

- **Framework**: React Native 0.76.5
- **Language**: TypeScript
- **State Management**: Zustand
- **Navigation**: React Navigation v6
- **Form Handling**: React Hook Form + Zod
- **API Client**: Axios
- **UI Components**: Custom components with React Native Paper
- **Animations**: React Native Reanimated 3
- **Gestures**: React Native Gesture Handler

## 📋 Features

### Implemented
- ✅ Project setup with TypeScript
- ✅ Navigation system (Auth & Main flows)
- ✅ State management with Zustand
- ✅ Authentication screens (Welcome, Login, Signup)
- ✅ Form validation with Zod
- ✅ API service architecture
- ✅ Theme system with colors and spacing
- ✅ Reusable UI components (Button, Input)

### In Progress
- 🚧 Complete authentication flow
- 🚧 Profile setup and onboarding
- 🚧 Photo upload functionality

### Planned
- 📝 Swipeable card interface for browsing profiles
- 📝 Matching system
- 📝 Real-time chat/messaging
- 📝 Location-based filtering
- 📝 Push notifications
- 📝 User preferences and filters
- 📝 Report and block functionality
- 📝 Premium features

## 🏗️ Project Structure

```
hula/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── common/        # Common components (Button, Input)
│   │   └── cards/         # Card-specific components
│   ├── screens/           # App screens
│   │   ├── auth/          # Authentication screens
│   │   └── main/          # Main app screens
│   ├── navigation/        # Navigation configuration
│   ├── services/          # API services
│   ├── store/            # Zustand stores
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Helper functions
│   ├── types/            # TypeScript types
│   ├── constants/        # App constants, colors, theme
│   └── assets/           # Images, fonts, etc.
├── ios/                  # iOS native code
├── android/             # Android native code
└── App.tsx              # Root component
```

## 🛠️ Installation

### Prerequisites
- Node.js >= 18
- npm or yarn
- React Native development environment set up
  - For iOS: Xcode, CocoaPods
  - For Android: Android Studio, JDK

### Steps

1. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Install iOS pods** (iOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

3. **Start Metro bundler**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run the app**

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
- **Primary**: #FF6B6B (Coral Red)
- **Secondary**: #4ECDC4 (Turquoise)
- **Accent**: #FFE66D (Yellow)
- **Success**: #51CF66 (Green)
- **Error**: #FF6B6B (Red)

### Typography
- Font sizes: xs (12px) to xxxl (32px)
- Font weights: regular, medium, semibold, bold

### Spacing
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, xxl: 48px

## 🔒 Security Features (Planned)

- User verification
- Report and block functionality
- Data encryption
- Secure authentication
- Privacy controls

## 📱 Screens

### Authentication Flow
1. Welcome Screen
2. Login Screen
3. Signup Screen
4. Phone Verification
5. Profile Setup
6. Photo Upload
7. Interests Selection

### Main App Flow
1. Discover (Swipe Cards)
2. Matches
3. Messages
4. Profile

## 🔧 Configuration

### API Configuration
Update the API base URL in `src/constants/index.ts`:
```typescript
export const API_BASE_URL = __DEV__
  ? 'http://localhost:3000/api'
  : 'https://api.hula.com';
```

### Theme Customization
Modify colors and theme in `src/constants/colors.ts` and `src/constants/theme.ts`

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

## 📝 Development Roadmap

### Phase 1: Foundation ✅
- [x] Project setup
- [x] Navigation
- [x] Basic authentication screens
- [x] State management

### Phase 2: Core Features (In Progress)
- [ ] Complete authentication
- [ ] User profiles
- [ ] Swipe interface
- [ ] Matching logic

### Phase 3: Communication
- [ ] Chat system
- [ ] Push notifications
- [ ] Real-time updates

### Phase 4: Enhancement
- [ ] Location features
- [ ] Advanced filters
- [ ] Premium features
- [ ] Analytics

### Phase 5: Polish
- [ ] UI/UX refinements
- [ ] Performance optimization
- [ ] Testing
- [ ] App store deployment

## 🤝 Contributing

This is a personal project. Contributions, issues, and feature requests are welcome!

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ using React Native

---

**Note**: This is an active development project. Features are being added continuously.
