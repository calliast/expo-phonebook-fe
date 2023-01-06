import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, FlatList, SafeAreaView } from 'react-native';

const Phonebook = () => {
  const [contacts, setContacts] = useState([
    { id: '1', name: 'John', phone: '555-555-1212' },
    { id: '2', name: 'Jane', phone: '555-555-2323' },
    { id: '3', name: 'Mike', phone: '555-555-3434' },
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchPhone, setSearchPhone] = useState('');

  const handleEdit = (id, name, phone) => {
    setIsEditing(true);
    setName(name);
    setPhone(phone);
  };

  const handleSubmit = () => {
    if (isEditing) {
      // Send edited data to server and update list
      setContacts(
        contacts.map((contact) =>
          contact.id === id ? { ...contact, name, phone } : contact
        )
      );
      setIsEditing(false);
    } else {
      // Send new data to server and update list
      setContacts([...contacts, { id: Date.now(), name, phone }]);
    }
    setName('');
    setPhone('');
  };

  const handleSearch = () => {
    // Send search data to server and update list
  };
  
    const handleDelete = (id) => {
      // Send delete request to server and update list
      setContacts(contacts.filter((contact) => contact.id !== id));
    };
  
    return (
      <SafeAreaView style={styles.container}>
        {isEditing ? (
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={phone}
              onChangeText={setPhone}
            />
            <Button title="Submit" onPress={handleSubmit} />
          </View>
        ) : (
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={searchText}
              onChangeText={setSearchText}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={searchPhone}
              onChangeText={setSearchPhone}
              />
            <Button title="Search" onPress={handleSearch} />
        </View>
      )}
      <FlatList
        data={contacts}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text>{index + 1}</Text>
            <Text>{item.name}</Text>
            <Text>{item.phone}</Text>
            <Button title="Edit" onPress={() => handleEdit(item.id, item.name, item.phone)} />
            <Button title="Delete" onPress={() => handleDelete(item.id)} />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <Button title="Add" onPress={() => setIsEditing(true)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 8,
    width: '45%',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginBottom: 10,
  },
});

export default Phonebook;

