import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { ChatRoom } from '../../constants/types';

const ChatListItem = ({ chatRoom = ChatRoom }) => {
  const user = chatRoom.users[1];

  const navigation = useNavigation();

  const onClick = () => {
    navigation.navigate('ChatRoom', {
      id: chatRoom.id,
      name: chatRoom.users[1].name,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onClick}>
      <View style={styles.leftContainer}>
        <Image source={{ uri: user.imageUri }} style={styles.avatar} />
        <View style={styles.midContainer}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.lastMessage}>{chatRoom.lastMessage.content}</Text>
        </View>
      </View>
      <Text style={styles.time}>
        {moment(chatRoom.lastMessage.createdAt).format('DD/MM/YYYY')}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    padding: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    marginRight: 15,
    borderRadius: 50,
  },
  midContainer: {
    justifyContent: 'space-around',
  },
  leftContainer: {
    flexDirection: 'row',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  lastMessage: {
    fontSize: 16,
    color: 'grey',
  },
  time: {
    fontSize: 14,
    color: 'grey',
  },
});

export default ChatListItem;
