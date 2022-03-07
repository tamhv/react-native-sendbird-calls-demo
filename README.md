## ios

```
yarn
cd ios
pod install
cd ..
yarn start
open ios/RNSendBirdCallsDemo.xcworkspace
```

### xcode setup
```
#Info.plist
...
<key>NSCameraUsageDescription</key>
<string>Enable camera access so that others can see you during video calls.</string>
<key>NSMicrophoneUsageDescription</key>
<string>Enable microphone access so that others can hear you.</string>
...

#Add capabilities
Background modes > Voice over IP
Push notification
```

### RUN ON REAL DEVICE! Not work on ios simulator!!!

### TODO
- [x] ios
- [ ] android
