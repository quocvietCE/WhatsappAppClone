import React, { FunctionComponent } from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import { User, RootStackParamList } from '../../constants/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import { createChatRoom, createChatRoomUser } from '../../graphql/mutations';

export type ContactListItemProps = {
  user: User;
};

const ContactListItem: FunctionComponent<ContactListItemProps> = ({ user }) => {
  const navigation =
    useNavigation<NativeStackScreenProps<RootStackParamList>>();

  const onClick = async () => {
    try {
      console.log('onClick');
      //  1. Create a new Chat Room
      const newChatRoomData = await API.graphql(
        graphqlOperation(createChatRoom, {
          input: {
            lastMessageID: 'zz753fca-e8c3-473b-8e85-b14196e84e16',
          },
        }),
      );
      console.log('onClick newChatRoomData: ', newChatRoomData);
      if (!newChatRoomData.data) {
        console.log(' Failed to create a chat room');
        return;
      }
      const newChatRoom = newChatRoomData.data.createChatRoom;
      // 2. Add `user` to the Chat Room
      await API.graphql(
        graphqlOperation(createChatRoomUser, {
          input: {
            userID: user.id,
            chatRoomID: newChatRoom.id,
          },
        }),
      );
      //  3. Add authenticated user to the Chat Room
      const userInfo = await Auth.currentAuthenticatedUser();
      console.log('userInfo: ', userInfo);
      await API.graphql(
        graphqlOperation(createChatRoomUser, {
          input: {
            userID: userInfo.attributes.sub,
            chatRoomID: newChatRoom.id,
          },
        }),
      );
      navigation.navigate('ChatRoom', {
        id: newChatRoom.id,
        name: 'Hardcoded name',
        myId: userInfo.attributes.sub,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.lefContainer}>
          <Image source={{ uri: user.imageUri }} style={styles.avatar} />

          <View style={styles.midContainer}>
            <Text style={styles.username}>{user.name}</Text>
            <Text numberOfLines={2} style={styles.status}>
              {user.status}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    padding: 10,
  },
  lefContainer: {
    flexDirection: 'row',
  },
  midContainer: {
    justifyContent: 'space-around',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 15,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  status: {
    fontSize: 16,
    color: 'grey',
  },
});

export default ContactListItem;
