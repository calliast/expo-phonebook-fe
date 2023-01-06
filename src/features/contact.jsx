import UserList from "../components/UserList";
import UserForm from "../components/UserForm";
import UserSearch from "../components/UserSearch";
import { useState } from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";

export default function PhoneBookBox(props) {
  const [tab, setTab] = useState("search-form");

  const handleTabClick = (value) => {
    setTab(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.FormWrapper}>
        <Text style={styles.sectionTitle}>PhoneBook</Text>
        <View style={styles.items}>
          {/* Phonebook Search */}
          <View style={styles.subSection}>
          <Text style={styles.subSectionTitle}>Search</Text>
            <UserSearch />
          </View>
          {/* Phonebook List */}
          <View style={styles.subSection}>
          <Text style={styles.subSectionTitle}>
            Contact List
          </Text>
            <UserList />
          </View>
          {/* Phonebook Add */}
          <View style={styles.subSection}>
          <Text style={styles.subSectionTitle}>Add</Text>
            <UserForm />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  FormWrapper: {
    height: 750,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subSectionTitle: {
    //   borderStyle: "solid",
    //   borderWidth: 1,
    //   borderColor: "green",
    fontSize: 18,
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginVertical: 5,
  },
  subSection: {
    marginVertical: 5,
  },
  items: {
    marginVertical: 20,
  },
});
