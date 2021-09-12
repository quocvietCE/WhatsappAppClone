import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatListScreen from '../screens/ChatListScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import {
  TabOneParamList,
  TabTwoParamList,
  TopTabStackParamType,
} from '../constants/types';

Fontisto.loadFont();

const TopTab = createMaterialTopTabNavigator<TopTabStackParamType>();

const MainTabNavigator = () => {
  const colorScheme = useColorScheme();
  console.log('colorScheme: ', colorScheme);
  return (
    <TopTab.Navigator
      initialRouteName="ChatList"
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
      <TopTab.Screen name="ChatList" component={ChatListScreen} />
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
        component={ChatListScreen}
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
