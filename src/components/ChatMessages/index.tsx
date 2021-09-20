import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Message } from '../../constants/types';
import Colors from '../../constants/Colors';
import moment from 'moment';

export type ChatMessageProps = {
  message: Message;
  myId: string;
};

const ChatMessages: FunctionComponent<ChatMessageProps> = ({
  message,
  myId,
}) => {
  console.log('ChatMessages myId: ', myId);
  console.log('ChatMessages message: ', message);
  const isMyMessage = () => {
    return message.user?.id === myId || true;
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
