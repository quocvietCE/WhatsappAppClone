import React, { useEffect, useState, FunctionComponent } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { API, graphqlOperation } from 'aws-amplify';
import { messagesByChatRoom } from '../../graphql/queries';
import { onCreateMessage } from '../../graphql/subscriptions';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import chatRoomData from '../../constants/Chats';

import ChatMessage from '../../components/ChatMessages';
import InputBox from '../../components/InputBox';
import { RootStackParamList } from '../../constants/types';
import BG from '../../assets/BG.png';

export type ChatRoomScreenProps = {
  navigation: NativeStackScreenProps<RootStackParamList, 'ChatRoom'>;
  route: RouteProp<RootStackParamList, 'ChatRoom'>;
};

const ChatRoomScreen: FunctionComponent<ChatRoomScreenProps> = ({
  navigation,
  route,
}) => {
  const [messages, setMessages] = useState([]);

  const myId = route.params.myId;
  console.log('ChatRoomScreen route: ', route);
  const insets = useSafeAreaInsets();

  const fetchMessages = async () => {
    const messagesData = await API.graphql(
      graphqlOperation(messagesByChatRoom, {
        chatRoomID: route.params.id,
        sortDirection: 'DESC',
      }),
    );
    console.log('FETCH MESSAGES: ', messagesData);
    setMessages(messagesData.data.messagesByChatRoom.items);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    const fetchChatRooms = async () => {};
    fetchChatRooms();
  }, []);

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onCreateMessage),
    ).subscribe({
      next: (data) => {
        console.log('onCreateMessage data: ', data);
        const newMessage = data.value.data.onCreateMessage;

        if (newMessage.chatRoomID !== route.params.id) {
          console.log('Message is in another room!');
          return;
        }

        fetchMessages();
        // setMessages([newMessage, ...messages]);
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <ImageBackground
      source={BG}
      style={[styles.container, { paddingBottom: insets.bottom }]}>
      <FlatList
        // data={chatRoomData.messages}
        data={messages}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <ChatMessage message={item} myId={myId} />}
        inverted
      />
      <InputBox myUserId={myId} chatRoomID={route.params.id} />
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
