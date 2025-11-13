# Release Checklist Template

Use this checklist for every app release to ensure quality and completeness.

## Release Information

- **Version**: ___________
- **Release Date**: ___________
- **Release Type**: [ ] Patch  [ ] Minor  [ ] Major
- **Platforms**: [ ] iOS  [ ] Android  [ ] Both

---

## Pre-Release Testing

### Functionality
- [ ] All new features working as expected
- [ ] All existing features still working
- [ ] All buttons and navigation working
- [ ] Forms validation working correctly
- [ ] Error handling works properly
- [ ] Loading states display correctly
- [ ] Empty states display correctly

### Authentication & User Flow
- [ ] Login works
- [ ] Signup works
- [ ] Profile setup flow works
- [ ] Photo upload works
- [ ] Logout works
- [ ] Session persistence works

### Core Features
- [ ] Card swiping works smoothly
- [ ] Like/Pass actions work
- [ ] Super like works
- [ ] Match notifications appear
- [ ] Matches screen displays correctly
- [ ] Messages screen works
- [ ] Profile screen displays user info correctly

### Performance
- [ ] App starts quickly (< 3 seconds)
- [ ] Smooth animations (60fps)
- [ ] No memory leaks
- [ ] Images load efficiently
- [ ] No lag when swiping cards
- [ ] App handles low memory situations
- [ ] Background tasks work properly

### Cross-Device Testing
#### iOS
- [ ] iPhone SE (small screen)
- [ ] iPhone 14/15 (standard screen)
- [ ] iPhone 14/15 Pro Max (large screen)
- [ ] iPad (if supported)
- [ ] iOS 15.0 (minimum version)
- [ ] iOS 17.x (latest version)

#### Android
- [ ] Small phone (< 5.5")
- [ ] Standard phone (5.5" - 6.5")
- [ ] Large phone (> 6.5")
- [ ] Tablet (if supported)
- [ ] Android 8.0 (minimum version)
- [ ] Android 14 (latest version)
- [ ] Various manufacturers (Samsung, Google, OnePlus, etc.)

### Network Conditions
- [ ] Works on WiFi
- [ ] Works on 4G/LTE
- [ ] Works on 5G
- [ ] Handles poor connection gracefully
- [ ] Handles offline mode (if supported)
- [ ] Reconnection works properly

### Edge Cases
- [ ] Fresh install works
- [ ] App update works (data persists)
- [ ] Handles system permission denials
- [ ] Handles system interruptions (calls, notifications)
- [ ] Handles low battery mode
- [ ] Handles device rotation (if supported)
- [ ] Works with different system fonts/sizes
- [ ] Works with Dark Mode (if supported)

---

## Code Quality

### Code Review
- [ ] All code reviewed by team member(s)
- [ ] No TODO/FIXME comments for critical items
- [ ] No console.log statements in production code
- [ ] No commented-out code blocks
- [ ] No hardcoded credentials or secrets

### Testing
- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] E2E tests passing (if available)
- [ ] Code coverage > 70% (if applicable)
- [ ] Manual testing completed

### Code Quality Tools
- [ ] ESLint passes with no errors
- [ ] TypeScript compilation succeeds with no errors
- [ ] No security vulnerabilities in dependencies
- [ ] Bundle size is acceptable

---

## Build & Configuration

### Version Management
- [ ] Version number updated in package.json
- [ ] Version code incremented (Android)
- [ ] Build number incremented (iOS)
- [ ] CHANGELOG.md updated

### iOS Configuration
- [ ] Bundle identifier correct
- [ ] App icon set (all sizes)
- [ ] Launch screen configured
- [ ] Signing certificate valid
- [ ] Provisioning profile valid
- [ ] Capabilities configured correctly
- [ ] Info.plist permissions configured
- [ ] exportOptions.plist updated

### Android Configuration
- [ ] Application ID correct
- [ ] App icon set (all densities)
- [ ] Splash screen configured
- [ ] Keystore configured
- [ ] ProGuard rules tested
- [ ] Permissions in AndroidManifest.xml
- [ ] versionCode incremented
- [ ] versionName updated

### Environment Configuration
- [ ] API endpoints pointing to production
- [ ] Feature flags configured
- [ ] Analytics keys configured
- [ ] Crash reporting configured
- [ ] Push notification keys configured

---

## App Store Preparation

### iOS App Store
#### App Information
- [ ] App name
- [ ] Subtitle
- [ ] Primary category
- [ ] Secondary category (optional)
- [ ] Content rights information
- [ ] Age rating completed

#### Pricing & Availability
- [ ] Price tier selected
- [ ] Territories selected
- [ ] Pre-order settings (if applicable)

#### Screenshots & Media
- [ ] iPhone 6.7" screenshots (3-10)
- [ ] iPhone 6.5" screenshots (3-10)
- [ ] iPhone 5.5" screenshots (3-10)
- [ ] iPad Pro 12.9" screenshots (if iPad supported)
- [ ] App preview videos (optional)
- [ ] All screenshots show latest version

#### App Store Text
- [ ] What's New (4000 chars max)
- [ ] Description (4000 chars max)
- [ ] Keywords (100 chars max)
- [ ] Promotional text (170 chars, optional)
- [ ] Support URL
- [ ] Marketing URL (optional)
- [ ] Privacy policy URL

#### App Review Information
- [ ] Contact information
- [ ] Demo account credentials (if required)
- [ ] Notes for reviewer
- [ ] Attachment (if needed)

### Google Play Store
#### Store Listing
- [ ] App name (30 chars max)
- [ ] Short description (80 chars max)
- [ ] Full description (4000 chars max)
- [ ] App icon (512x512)
- [ ] Feature graphic (1024x500)
- [ ] Phone screenshots (2-8)
- [ ] Tablet screenshots (if tablet supported)
- [ ] Screenshots show latest version

#### Store Settings
- [ ] Application type
- [ ] Category
- [ ] Tags (if applicable)
- [ ] Contact details
- [ ] Privacy policy URL
- [ ] Support email

#### Content Rating
- [ ] Content rating questionnaire completed
- [ ] Certificate obtained

#### Pricing & Distribution
- [ ] Countries selected
- [ ] Pricing set
- [ ] Device categories
- [ ] Android TV/Wear (if applicable)

---

## Release Notes

### User-Facing Changes
```
Write release notes here in user-friendly language:

New Features:
-

Improvements:
-

Bug Fixes:
-
```

### Internal Notes
```
Technical changes for team reference:

-
```

---

## Deployment

### Build Process
- [ ] Clean build completed successfully
- [ ] iOS: IPA file generated
- [ ] Android: AAB file generated
- [ ] Build tested on physical device

### Upload
- [ ] iOS: Build uploaded to App Store Connect
- [ ] Android: Build uploaded to Play Console
- [ ] Build processing completed
- [ ] Build appears in TestFlight/Internal testing

### Beta Testing (Optional)
- [ ] Internal testing completed
- [ ] External beta testing completed
- [ ] Critical bugs resolved
- [ ] Feedback incorporated

### Submission
- [ ] iOS: Submitted for review
- [ ] Android: Submitted for review
- [ ] Submission dates recorded

---

## Post-Submission

### Monitoring
- [ ] App Store Connect/Play Console checked for status
- [ ] Crash reports monitored
- [ ] Analytics dashboard checked
- [ ] User reviews monitored
- [ ] Server logs checked for errors

### Documentation
- [ ] Release notes published
- [ ] Team notified of release
- [ ] Stakeholders notified
- [ ] Support team briefed on changes
- [ ] Known issues documented

### Rollout Strategy (if applicable)
- [ ] Phased rollout percentage set
- [ ] Monitoring plan in place
- [ ] Rollback plan ready
- [ ] Success metrics defined

---

## Post-Release (After Approval)

### Launch
- [ ] iOS: App approved and released
- [ ] Android: App approved and released
- [ ] App visible in stores
- [ ] Download links working

### Marketing (if applicable)
- [ ] Social media posts scheduled
- [ ] Email notifications sent
- [ ] Website updated
- [ ] Blog post published
- [ ] Press release sent

### Verification
- [ ] Fresh install tested from App Store
- [ ] Fresh install tested from Play Store
- [ ] Update tested (from previous version)
- [ ] Analytics tracking confirmed working
- [ ] Crash reporting confirmed working

### Team Actions
- [ ] Git tag created for release
- [ ] Release branch merged (if applicable)
- [ ] Sprint/milestone closed
- [ ] Post-mortem scheduled (if needed)
- [ ] Next release planning started

---

## Sign-off

**Prepared by**: ___________
**Date**: ___________

**Reviewed by**: ___________
**Date**: ___________

**Approved by**: ___________
**Date**: ___________

---

## Notes

Additional notes or issues encountered during release:

```
[Add any notes here]
```
