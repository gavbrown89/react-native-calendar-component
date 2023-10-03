/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  View,
} from 'react-native';

import RNCalendar from './components/RNCalendar';

function App(): JSX.Element {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <RNCalendar theme={'#865BF5'} />
    </View>
  );
}

export default App;