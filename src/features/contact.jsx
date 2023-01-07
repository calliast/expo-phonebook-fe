import UserList from "../components/UserList";
import UserForm from "../components/UserForm";
import UserSearch from "../components/UserSearch";
import { useState } from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";

export default function PhoneBookBox(props) {
  const [tab, setTab] = useState("search");

  // const handleChangeTab = (value) => {
  //   setTab(value)
  // }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainFrame}>
        <Text style={styles.mainTitle}>PhoneBook</Text>
        <View style={styles.componentSpacing}>
          <View style={styles.tabTitle}>
            <Text style={[styles.tabTitleText, { textDecorationLine: tab === "search" ? "underline" : "none" }]} onPress={() => setTab('search')}
            >
              Search
            </Text>
            <Text style={[styles.tabTitleText, { textDecorationLine: tab === "add" ? "underline" : "none" }]} onPress={() => setTab('add')}>Add</Text>
          </View>
        </View>
        {/* Phonebook Search */}
        <View style={[styles.componentSpacing, { display: tab === "search" ? "show": "none" }]}>
          <UserSearch />
        </View>
        {/* Phonebook Add */}
        <View style={[styles.componentSpacing, { display: tab === "add" ? "show": "none" }]}>
          <UserForm />
        </View>
        {/* Phonebook Linebar */}
        <View style={styles.componentSpacing}>
          <View style={styles.lineBar}></View>
        </View>
        {/* Phonebook List */}
        <View style={styles.componentSpacing}>
          <UserList />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  mainFrame: {
    width: "100%",
    height: 700,
    marginTop: 25,
    paddingHorizontal: 20,
    justifyContent: "flex-start",
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  tabTitle: {
    width: 125,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tabTitleText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  componentSpacing: {
    marginBottom: 25,
  },
  lineBar: {
    width: 345,
    height: 2,
    color: "black",
    backgroundColor: "black",
  },
});
