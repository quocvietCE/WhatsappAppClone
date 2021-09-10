import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import chatRoomData from '../../constants/Chats';

import ChatMessage from '../../components/ChatMessages';
import InputBox from '../../components/InputBox';
import BG from '../../assets/BG.png';

const ChatRoomScreen = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute();
  console.log('route.params: ', route.params);
  return (
    <ImageBackground
      source={BG}
      style={[styles.container, { paddingBottom: insets.bottom }]}>
      <FlatList
        data={chatRoomData.messages}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <ChatMessage message={item} />}
        inverted
      />
      <InputBox />
    </ImageBackground>
  );
};

export default ChatRoomScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
