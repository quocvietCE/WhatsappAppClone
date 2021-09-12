import React, { FunctionComponent, useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Auth } from 'aws-amplify';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { ChatRoom, User, RootStackParamList } from '../../constants/types';

const ChatListItem: FunctionComponent<ChatRoom> = ({ chatRoom }) => {
  const [otherUser, setOtherUser] = useState<User | null>(null);
  const [myId, setMyId] = useState('');

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const getOtherUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();

      if (chatRoom.chatRoomUsers.items[0].user.id === userInfo.attributes.sub) {
        setOtherUser(chatRoom.chatRoomUsers.items[1].user);
      } else {
        setOtherUser(chatRoom.chatRoomUsers.items[0].user);
      }
      setMyId(userInfo.attributes.sub);
    };
    getOtherUser();
  }, []);

  const onClick = () => {
    navigation.navigate('ChatRoom', {
      id: chatRoom.id,
      name: otherUser?.name || '',
      myId,
    });
  };

  if (!otherUser) {
    return null;
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onClick}>
      <View style={styles.leftContainer}>
        <Image source={{ uri: otherUser.imageUri }} style={styles.avatar} />
        <View style={styles.midContainer}>
          <Text style={styles.userName}>{otherUser.name}</Text>
          {/* <Text style={styles.lastMessage}>{chatRoom.lastMessage.content}</Text> */}
        </View>
      </View>
      <Text style={styles.time}>
        {/* {moment(chatRoom.lastMessage.createdAt).format('DD/MM/YYYY')} */}
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
