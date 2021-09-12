import React, { useState, FunctionComponent } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { API, graphqlOperation } from 'aws-amplify';

import { createMessage, updateChatRoom } from '../../graphql/mutations';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';

import Colors from '../../constants/Colors';

MaterialCommunityIcons.loadFont();
MaterialIcons.loadFont();
Entypo.loadFont();
Fontisto.loadFont();

interface InputBoxProps {
  chatRoomID: string;
  myUserId: string | undefined;
}

const InputBox: FunctionComponent<InputBoxProps> = ({
  chatRoomID,
  myUserId,
}) => {
  const [message, setMessage] = useState('');

  const onMicrophonePress = () => {
    console.warn('Microphone');
  };
  console.log('myUserId: ', myUserId);
  const updateChatRoomLastMessage = async (messageId: string) => {
    try {
      await API.graphql(
        graphqlOperation(updateChatRoom, {
          input: {
            id: chatRoomID,
            lastMessageID: messageId,
          },
        }),
      );
    } catch (e) {
      console.log(e);
    }
  };

  const onSendPress = async () => {
    try {
      const inputData = {
        content: message,
        userID: myUserId || '',
        chatRoomID,
      };
      console.log('inputData: ', inputData);
      const newMessageData = await API.graphql(
        graphqlOperation(createMessage, {
          input: {
            content: message,
            userID: myUserId || '',
            chatRoomID,
          },
        }),
      );
      console.log('newMessageData: ', newMessageData);
      await updateChatRoomLastMessage(newMessageData.data.createMessage.id);
    } catch (e) {
      console.log(e);
    }

    setMessage('');
  };

  const onPress = () => {
    if (!message) {
      onMicrophonePress();
    } else {
      onSendPress();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
      style={{ width: '100%' }}>
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <Fontisto name="laughing" size={24} color="grey" />
          <TextInput
            style={styles.textInput}
            multiline
            maxLength={500}
            value={message}
            onChangeText={(value) => setMessage(value)}
            placeholder={'Type a message'}
          />
          <Entypo
            name="attachment"
            size={24}
            color="grey"
            style={styles.icon}
          />
          {!message && (
            <Fontisto
              name="camera"
              size={24}
              color="grey"
              style={styles.icon}
              numberOfLines={6}
            />
          )}
        </View>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.buttonContainer}>
            {!message ? (
              <MaterialCommunityIcons
                name="microphone"
                size={28}
                color="white"
              />
            ) : (
              <MaterialIcons name="send" size={28} color="white" />
            )}
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    // alignItems: 'center',
    alignItems: 'flex-end',
  },
  buttonContainer: {
    backgroundColor: Colors.light.tint,
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    marginRight: 10,
    borderRadius: 25,
    flex: 1,
    alignItems: 'center',
    // alignItems: 'flex-end',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    marginHorizontal: 10,
    // backgroundColor: 'red',
  },
  icon: {
    marginHorizontal: 5,
  },
});

export default InputBox;
