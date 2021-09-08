import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MessageObject } from '../../constants/types';
import Colors from '../../constants/Colors';
import moment from 'moment';

// import styles from './styles';

const ChatMessages = ({ message = MessageObject }) => {
  const isMyMessage = () => {
    return message.user.id === 'u1';
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.messageBox,
          {
            backgroundColor: isMyMessage() ? '#DCF8C5' : 'white',
            marginLeft: isMyMessage() ? 50 : 0,
            marginRight: isMyMessage() ? 0 : 50,
          },
        ]}>
        {!isMyMessage() && <Text style={styles.name}>{message.user.name}</Text>}
        <Text style={styles.message}>{message.content}</Text>
        <Text style={styles.time}>{moment(message.createdAt).fromNow()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  messageBox: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
  },
  message: {},
  name: {
    color: Colors.light.tint,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  time: {
    alignSelf: 'flex-end',
    color: 'grey',
  },
});

export default ChatMessages;
