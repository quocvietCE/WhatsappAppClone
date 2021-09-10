// import { StackScreenProps } from '@react-navigation/stack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';

import { RootStackParamList } from '../../constants/types';

export type NotFoundScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'NotFound'>;
  route: RouteProp<RootStackParamList, 'NotFound'>;
};

// const NotFoundScreen = ({
//   navigation,
// }: NativeStackNavigationProp<RootStackParamList, 'NotFound'>) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>This screen doesn't exist.</Text>
//       <TouchableOpacity
//         onPress={() => navigation.replace('Root')}
//         style={styles.link}>
//         <Text style={styles.linkText}>Go to home screen!</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

const NotFoundScreen: FunctionComponent<NotFoundScreenProps> = ({
  navigation,
  route,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This screen doesn't exist.</Text>
      <TouchableOpacity
        onPress={() => navigation.replace('Root')}
        style={styles.link}>
        <Text style={styles.linkText}>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotFoundScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
