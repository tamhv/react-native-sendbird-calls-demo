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

## android

#### android/build.gradle
```

...
buildscript{
    ext{
        ...
        firebaseMessagingVersion = "20.1.0"
    }
    ...
    dependencies{
        ...
        classpath("com.android.tools.build:gradle:4.2.2")
        classpath 'com.google.gms:google-services:4.3.10'
    }
}

allprojects{
    repositories{
        ...
        maven { url "https://repo.sendbird.com/public/maven" }
        maven {
          url "$rootDir/../node_modules/@notifee/react-native/android/libs"
        }    
        ...
    }
}
...


```
#### android/app/google-services.json
```
Create project firebase
Create app android for package name
Download google-services.json 
```

#### android/app/build.gradle
```
apply plugin: "com.android.application"
apply plugin: 'com.google.gms.google-services'
...

dependencies {
    ...
    implementation 'com.google.firebase:firebase-messaging:20.1.0'
    ...
}
```

#### android/app/src/main/AndroidManifest.xml
```
<manifest..>
<application...>
    ...
    <service android:name=".MyFirebaseMessagingService">
        <intent-filter>
            <action android:name="com.google.firebase.MESSAGING_EVENT" />
        </intent-filter>
    </service>
</application>
</manifest>
```

#### android/app/src/main/java/com/rnsendbirdcallsdemo/MyFirebaseMessagingService.java
```
import com.rnsendbirdcalls.RNSendBirdCallsModule;
public class MyFirebaseMessagingService extends FirebaseMessagingService {
    @Override public void onMessageReceived(@NonNull RemoteMessage remoteMessage){
        RNSendBirdCallsModule.onMessageReceived(remoteMessage.getData());
    }
    @Override public void onNewToken(@NonNull String token){
        RNSendBirdCallsModule.onNewToken(token);
    }
}
```

#### android/gradle/wrapper/gradle-wrapper.properties
```
distributionUrl=https\://services.gradle.org/distributions/gradle-6.9-all.zip
```

### RUN ON REAL DEVICE! Not work on ios simulator!!!
