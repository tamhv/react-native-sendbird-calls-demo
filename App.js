/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Button,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { SendBirdCalls, SendBirdCallsVideo } from 'react-native-sendbird-calls';

const Section = ({ children, title }): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [connected, setConnected] = React.useState(false);
  const [calling, setCalling] = React.useState(false);
  const [callId, setCallId] = React.useState(null);
  const [isVideoCall, setIsVideoCall] = React.useState(false);

  React.useEffect(() => {
    SendBirdCalls.setup('<appId>');
    SendBirdCalls.addEventListener(
      'DirectCallDidConnect',
      onDirectCallDidConnect,
    );
    SendBirdCalls.addEventListener('DirectCallDidEnd', onDirectCallDidEnd);
    const caller = '1111';
    SendBirdCalls.authenticate(caller);
    SendBirdCalls.setupVoIP();

    return function cleanup () {
      SendBirdCalls.removeAllEventListeners();
    };
  });

  const onDirectCallDidConnect = data => {
    console.log('onDirectCallDidConnect', data);
    setConnected(true);
    setCalling(true);
    setCallId(data.callId);
  };

  const onDirectCallDidEnd = data => {
    console.log('onDirectCallDidEnd', data);
    setConnected(false);
    setCalling(false);
    setCallId(null);
  };

  const call = async (callee, videoCall) => {
    //5
    const data = await SendBirdCalls.dial(callee, videoCall);
    setCalling(true);
    setIsVideoCall(videoCall);
    setCallId(data.callId);
  };

  const endCall = async () => {
    //6
    const data = await SendBirdCalls.endCall(callId);
    console.log('endcall', data);
    setCalling(false);
    setCallId(null);
    setConnected(false);
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}/>
      <View style={styles.container}>
        {calling ? (
          <View style={styles.container}>
            {connected ? (
              <View>
                {callId && isVideoCall ? (
                  <SendBirdCallsVideo
                    callId={callId}
                    local={false}
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <SendBirdCallsVideo
                      callId={callId}
                      local={true}
                      style={{ flex: 1, width: 100, height: 100 }}
                    />
                    <View
                      style={{
                        flex: 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text>Connected (00:01...)</Text>
                      <Button title={'End call'} onPress={endCall}/>
                    </View>
                  </SendBirdCallsVideo>
                ) : (
                  <View>
                    <Text>Connected (00:01...)</Text>
                    <Button title={'End call'} onPress={endCall}/>
                  </View>
                )}
              </View>
            ) : (
              <View style={styles.container}>
                {callId && isVideoCall ? (
                  <View style={styles.container}>
                    <SendBirdCallsVideo
                      callId={callId}
                      local={true}
                      style={{ flex: 1 }}>
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text>Calling...</Text>
                        <Button title={'End call'} onPress={endCall}/>
                      </View>
                    </SendBirdCallsVideo>
                  </View>
                ) : (
                  <View style={styles.container}>
                    <Text>Calling...</Text>
                    <Button title={'End call'} onPress={endCall}/>
                  </View>
                )}
              </View>
            )}
          </View>
        ) : (
          <View style={styles.container}>
            <Text>Current userId: 1111</Text>

            <Button
              title={'Voice call to userId=123'}
              onPress={() => call('123', false)}
            />
            <Button
              title={'Video call to userId=123'}
              onPress={() => call('123', true)}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  calling: {},
});

export default App;
