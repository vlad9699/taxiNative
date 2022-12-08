import type {Node} from 'react';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import HomeScreen from './screens/HomeScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MapScreen from './screens/MapScreen';
import {KeyboardAvoidingView, Platform} from 'react-native';

const App: () => Node = () => {
  const Stack = createNativeStackNavigator();
  const isWhichPlatform = Platform.OS === 'ios' ? 'padding' : 'height';
  const keyboardVerticalOffset = Platform.OS === 'ios' ? -64 : 0
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView keyboardVerticalOffset={keyboardVerticalOffset}  behavior={isWhichPlatform} style={{flex: 1}}>
            <Stack.Navigator>
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="MapScreen"
                component={MapScreen}
                options={{headerShown: false}}
              />
            </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
