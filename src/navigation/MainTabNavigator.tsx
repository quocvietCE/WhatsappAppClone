import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import {createStackNavigator} from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Camera from '../screens/CameraScreen';
import Calls from '../screens/CallsScreen';
import ChatsScreen from '../screens/ChatsScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
// import Status from '../screens/StatusScreen';

import Fontisto from 'react-native-vector-icons/Fontisto';
import Colors from '../constants/Colors';
// import { useColorScheme } from 'react-native';
import useColorScheme from '../hooks/useColorScheme';

import { TabOneParamList, TabTwoParamList } from '../constants/types';

Fontisto.loadFont();

export type TopTabStackParamType = {
  Camera: undefined;
  Chats: undefined;
  Status: undefined;
  Calls: undefined;
};

const TopTab = createMaterialTopTabNavigator<TopTabStackParamType>();

const MainTabNavigator = () => {
  const colorScheme = useColorScheme();
  console.log('colorScheme: ', colorScheme);
  return (
    <TopTab.Navigator
      initialRouteName="Chats"
      // screenOptions={{
      //   activeTintColor: Colors[colorScheme].background,
      //   style: {
      //     backgroundColor: Colors[colorScheme].tint,
      //   },
      //   indicatorStyle: {
      //     backgroundColor: Colors[colorScheme].background,
      //     height: 4,
      //   },
      //   labelStyle: {
      //     fontWeight: 'bold',
      //   },
      //   showIcon: true,
      // }}
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].background,
        style: {
          backgroundColor: Colors[colorScheme].tint,
        },
        indicatorStyle: {
          backgroundColor: Colors[colorScheme].background,
          height: 4,
        },
        labelStyle: {
          fontWeight: 'bold',
        },
        showIcon: true,
      }}>
      <TopTab.Screen
        name="Camera"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Fontisto name="camera" color={color} size={18} />
          ),
          tabBarLabel: () => null,
        }}
      />
      <TopTab.Screen name="Chats" component={ChatsScreen} />
      <TopTab.Screen name="Status" component={TabTwoNavigator} />
      <TopTab.Screen name="Calls" component={TabTwoNavigator} />
    </TopTab.Navigator>
  );
};

const TabOneStack = createNativeStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={ChatsScreen}
        options={{ headerTitle: 'Tab One Title' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createNativeStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Tab Two Title' }}
      />
    </TabTwoStack.Navigator>
  );
}

export default MainTabNavigator;
