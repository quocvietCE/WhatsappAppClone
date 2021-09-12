export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  Contacts: undefined;
  ChatRoom: {
    id: string;
    name: string;
    myId?: string | undefined;
  };
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type User = {
  id: string;
  name: string;
  imageUri: string;
  status: string;
};

export type Message = {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
  };
  updatedAt: string;
};

export type ChatRoom = {
  chatRoom: {
    id: string;
    users: User[];
    lastMessage: Message;
    chatRoomUsers: {
      items: Array<{ user: User }>;
    };
  };
};

export type TopTabStackParamType = {
  Camera: undefined;
  ChatList: undefined;
  Status: undefined;
  Calls: undefined;
};
