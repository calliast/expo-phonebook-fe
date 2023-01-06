import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import PhoneBookBox from "./src/features/contact";
// import Phonebook from "./src/components/UserChat";
import { store } from "./src/app/store";

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <PhoneBookBox />
        {/* <Phonebook /> */}
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
