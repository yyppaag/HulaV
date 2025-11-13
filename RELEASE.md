# Hula App Release Guide

This guide covers the release process for publishing Hula to the App Store (iOS) and Play Store (Android).

## Prerequisites

### General
- Node.js >= 18
- React Native CLI
- Git

### Android (Play Store)
- Android Studio installed
- Java Development Kit (JDK) 17 or higher
- Android SDK with API Level 34+
- Keystore file for signing (see Android Setup below)

### iOS (App Store)
- macOS with Xcode 15+
- CocoaPods installed
- Valid Apple Developer Account ($99/year)
- Distribution certificate and provisioning profile

## Version Management

The app version is managed in `package.json`. Use these commands to bump versions:

```bash
# Patch version (1.0.0 -> 1.0.1) for bug fixes
npm run version:patch

# Minor version (1.0.0 -> 1.1.0) for new features
npm run version:minor

# Major version (1.0.0 -> 2.0.0) for breaking changes
npm run version:major
```

## Android Release Setup

### 1. Generate Signing Key

Create a keystore file for signing your app:

```bash
keytool -genkeypair -v -storetype PKCS12 -keystore hula-release-key.keystore -alias hula-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

Save this file in a secure location (NOT in the repository).

### 2. Configure Gradle

Create or edit `android/gradle.properties` and add:

```properties
HULA_RELEASE_STORE_FILE=hula-release-key.keystore
HULA_RELEASE_KEY_ALIAS=hula-key-alias
HULA_RELEASE_STORE_PASSWORD=your_store_password
HULA_RELEASE_KEY_PASSWORD=your_key_password
```

Add this to your `.gitignore`:
```
# Keystore files
*.keystore
*.jks
gradle.properties
```

### 3. Update android/app/build.gradle

Add signing configuration:

```gradle
android {
    ...
    signingConfigs {
        release {
            if (project.hasProperty('HULA_RELEASE_STORE_FILE')) {
                storeFile file(HULA_RELEASE_STORE_FILE)
                storePassword HULA_RELEASE_STORE_PASSWORD
                keyAlias HULA_RELEASE_KEY_ALIAS
                keyPassword HULA_RELEASE_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
        }
    }
}
```

### 4. Build Android Release

```bash
# Build AAB (Android App Bundle) - Recommended for Play Store
npm run android:release

# Or build APK
npm run android:build

# Install release build on connected device for testing
npm run android:install
```

The release files will be in:
- AAB: `android/app/build/outputs/bundle/release/app-release.aab`
- APK: `android/app/build/outputs/apk/release/app-release.apk`

### 5. Upload to Play Console

1. Go to [Google Play Console](https://play.google.com/console)
2. Create a new app or select existing app
3. Navigate to Production > Create new release
4. Upload the AAB file
5. Fill in release notes
6. Review and roll out

## iOS Release Setup

### 1. Configure Xcode Project

1. Open `ios/Hula.xcworkspace` in Xcode
2. Select your project in the navigator
3. Update Bundle Identifier (e.g., `com.yourcompany.hula`)
4. Set Version and Build numbers
5. Configure Signing & Capabilities:
   - Select your Team
   - Choose Automatic or Manual signing
   - Select appropriate Provisioning Profile

### 2. Update Export Options

Edit `ios/exportOptions.plist`:
- Replace `YOUR_TEAM_ID` with your Apple Team ID
- Update `com.hula.app` with your actual Bundle ID
- Update provisioning profile name

### 3. Install Dependencies

```bash
npm run ios:pods
```

### 4. Build iOS Release

```bash
# Full release build (archive + export)
npm run ios:release

# Or step by step:
npm run ios:archive  # Create archive
npm run ios:export   # Export IPA
```

The IPA file will be in: `ios/build/Release/`

### 5. Upload to App Store Connect

#### Option 1: Using Xcode
1. Open Xcode
2. Window > Organizer
3. Select your archive
4. Click "Distribute App"
5. Choose "App Store Connect"
6. Follow the prompts

#### Option 2: Using Transporter
1. Download [Transporter](https://apps.apple.com/app/transporter/id1450874784) from Mac App Store
2. Drag and drop your IPA file
3. Click "Deliver"

#### Option 3: Using Command Line
```bash
xcrun altool --upload-app -f ios/build/Release/Hula.ipa -t ios -u "YOUR_APPLE_ID" -p "APP_SPECIFIC_PASSWORD"
```

### 6. Submit for Review

1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Select your app
3. Create a new version
4. Fill in required information:
   - What's New in This Version
   - Screenshots for all device sizes
   - App description
   - Keywords
   - Support URL
   - Marketing URL (optional)
   - Privacy Policy URL
5. Select the build you uploaded
6. Submit for review

## Quick Release Commands

### Release Both Platforms
```bash
# Bump version and build both platforms
npm run release:both
```

### Release Android Only
```bash
npm run release:android
```

### Release iOS Only
```bash
npm run release:ios
```

## Testing Release Builds

### Android
```bash
# Install release build on device
npm run android:install

# Or manually:
adb install android/app/build/outputs/apk/release/app-release.apk
```

### iOS
1. Archive the build in Xcode
2. Distribute to TestFlight for internal testing
3. Invite testers via App Store Connect

## App Store Requirements

### iOS App Store
- App icon (1024x1024px)
- Screenshots for:
  - iPhone 6.7" Display (1290 x 2796)
  - iPhone 6.5" Display (1242 x 2688)
  - iPhone 5.5" Display (1242 x 2208)
  - iPad Pro 12.9" Display (2048 x 2732)
- Privacy policy URL
- Age rating questionnaire
- App review information
- Export compliance information

### Google Play Store
- App icon (512x512px)
- Feature graphic (1024x500px)
- Screenshots:
  - Phone: At least 2 (up to 8)
  - Tablet: At least 1 (up to 8)
  - Minimum dimension: 320px
  - Maximum dimension: 3840px
- Short description (80 characters max)
- Full description (4000 characters max)
- Privacy policy URL
- Content rating questionnaire

## Troubleshooting

### Android Build Fails
```bash
# Clean and rebuild
npm run clean:android
cd android && ./gradlew clean
cd .. && npm run android:build:aab
```

### iOS Build Fails
```bash
# Clean and rebuild
npm run clean:ios
cd ios && pod install --repo-update
cd .. && npm run ios:release
```

### General Issues
```bash
# Full clean
npm run clean
npm install
npm run ios:pods  # iOS only
```

## Environment-Specific Builds

For different environments (staging, production), consider:

1. Create separate schemes in Xcode (iOS)
2. Create product flavors in Gradle (Android)
3. Use environment variables for API endpoints
4. Implement feature flags

## Automation with Fastlane (Optional)

Consider using Fastlane for automated builds and deployments:

```bash
# Install Fastlane
sudo gem install fastlane -NV

# iOS setup
cd ios && fastlane init

# Android setup
cd android && fastlane init
```

## Security Best Practices

1. **Never commit sensitive data**:
   - Keystore files
   - Passwords
   - API keys
   - Signing certificates

2. **Use environment variables** for sensitive configuration

3. **Enable ProGuard/R8** (Android) for code obfuscation

4. **Use App Transport Security** (iOS) for network security

5. **Implement certificate pinning** for API calls

6. **Regular security audits** of dependencies

## Release Checklist

Before releasing:

- [ ] Version number updated
- [ ] Changelog/release notes prepared
- [ ] All tests passing
- [ ] No console warnings
- [ ] Tested on physical devices
- [ ] Screenshots updated
- [ ] Privacy policy updated
- [ ] Terms of service updated
- [ ] App store metadata reviewed
- [ ] Beta testing completed
- [ ] Performance profiling done
- [ ] Analytics configured
- [ ] Crash reporting enabled
- [ ] Backend ready for increased load

## Support

For issues:
- React Native: https://reactnative.dev/docs/debugging
- Android: https://developer.android.com/studio/publish
- iOS: https://developer.apple.com/support/app-store-connect/

## Version History

- **1.0.0** - Initial release
