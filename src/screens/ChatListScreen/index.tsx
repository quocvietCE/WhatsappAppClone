import React, { FunctionComponent, useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { RouteProp } from '@react-navigation/native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
// import { createChatRoom, createChatRoomUser } from '../../graphql/mutations';
import ChatListItem from '../../components/ChatListItem';
// import chatRoomsMock from '../../constants/ChatRoom';
import NewMessageButton from '../../components/NewMessageButton';

import { TopTabStackParamType, ChatRoom } from '../../constants/types';
import { getUser } from './queries';

export type ChatListScreenProps = {
  navigation: MaterialTopTabNavigationProp<TopTabStackParamType, 'ChatList'>;
  route: RouteProp<TopTabStackParamType, 'ChatList'>;
};

const ChatListScreen: FunctionComponent<ChatListScreenProps> = ({
  navigation,
  route,
}) => {
  const [chatRooms, setChatRooms] = useState<Array<ChatRoom>>([]);
  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const userInfo = await Auth.currentAuthenticatedUser();
        const userData = await API.graphql(
          graphqlOperation(getUser, { id: userInfo.attributes.sub }),
        );
        console.log('userData: ', userData);
        setChatRooms(userData.data.getUser.chatRoomUser.items);
      } catch (err) {
        console.log('error: ', err);
      }
    };
    fetchChatRooms();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.chatRoom.id}
        data={chatRooms}
        renderItem={({ item }) => <ChatListItem chatRoom={item.chatRoom} />}
      />
      <NewMessageButton />
    </View>
  );
};

export default ChatListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
