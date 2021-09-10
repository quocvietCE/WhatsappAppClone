/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';

import { withAuthenticator } from 'aws-amplify-react-native';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import config from './src/aws-exports';
Amplify.configure(config);

const App = () => {
  const colorScheme = useColorScheme();
  return (
    <SafeAreaProvider>
      <Navigation colorScheme={colorScheme} />
    </SafeAreaProvider>
  );
};

export default withAuthenticator(App);
