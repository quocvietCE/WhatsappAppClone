import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import ChatListItem from '../../components/ChatListItem';
import chatRooms from '../../constants/ChatRoom';
import NewMessageButton from '../../components/NewMessageButton';

const Chats = () => {
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={({ id }) => id}
        data={chatRooms}
        renderItem={({ item }) => <ChatListItem chatRoom={item} />}
      />
      <NewMessageButton />
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
