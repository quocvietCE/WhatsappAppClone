import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
// import { API, graphqlOperation } from 'aws-amplify';\
// import { View } from '../components/Themed';
import ContactListItem from '../../components/ContactListItem';
import dataMockContact from '../../constants/Users';

// import { listUsers } from '../src/graphql/queries';

const ContactsScreen = () => {
  const [users, setUsers] = useState(dataMockContact);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const usersData = await API.graphql(graphqlOperation(listUsers));
  //       setUsers(usersData.data.listUsers.items);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   fetchUsers();
  // }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={users}
        renderItem={({ item }) => <ContactListItem user={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ContactsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatList: {
    width: '100%',
  },
});
