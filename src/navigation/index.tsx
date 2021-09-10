import React from 'react';
import { View, StyleSheet, ColorSchemeName, Text } from 'react-native';

import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NotFoundScreen from '../screens/NotFoundScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import ContactsScreen from '../screens/ContactsScreen';
import MainTab from './MainTabNavigator';

import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../constants/Colors';

FontAwesome.loadFont();
Octicons.loadFont();
MaterialCommunityIcons.loadFont();
MaterialIcons.loadFont();

export type RootStackParamType = {
  Root: undefined;
  ChatRoom: undefined;
  Contacts: undefined;
  NotFound: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamType>();

const RootRouter = ({ colorScheme }: { colorScheme: ColorSchemeName }) => (
  <NavigationContainer
    theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <RootStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.light.tint,
        },
        headerTintColor: Colors.light.background,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: () => (
          <View style={styles.headerRight}>
            <Octicons name="search" size={22} color={Colors.light.background} />
            <MaterialCommunityIcons
              name="dots-vertical"
              size={22}
              color={Colors.light.background}
            />
          </View>
        ),
      }}>
      <RootStack.Screen
        name="Root"
        component={MainTab}
        options={{
          title: '',
          headerTitleAlign: 'left',
          headerLeft: () => {
            return (
              <Text
                style={{
                  color: Colors.light.background,
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>
                WhatsApp
              </Text>
            );
          },
          headerShadowVisible: false,
        }}
      />
      <RootStack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={({ route }) => ({
          // title: route.params.name,
          headerRight: () => (
            <View
              style={{
                flexDirection: 'row',
                width: 100,
                justifyContent: 'space-between',
                marginRight: 10,
              }}>
              <FontAwesome name="video-camera" size={22} color={'white'} />
              <MaterialIcons name="call" size={22} color={'white'} />
              <MaterialCommunityIcons
                name="dots-vertical"
                size={22}
                color={'white'}
              />
            </View>
          ),
        })}
      />
      <RootStack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <RootStack.Screen name="Contacts" component={ContactsScreen} />
    </RootStack.Navigator>
  </NavigationContainer>
);
export default RootRouter;

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
    width: 60,
    justifyContent: 'space-between',
    marginRight: 10,
  },
});
