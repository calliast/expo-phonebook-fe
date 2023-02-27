import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { searchContact, resetQuery } from "../features/contactSlice";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Keyboard
} from "react-native";
import { Button, Icon } from "react-native-elements";

export default function UserSearch(props) {
  const dispatch = useDispatch();
  const [query, setQuery] = useState({
    name: "",
    phone: "",
  });

  const [search, setSearch] = useState(false);

  const [mode, setMode] = useState("and");

  const handleInputChange = (name, value) => {
    setQuery({
      ...query,
      [name]: value,
    });
  };

  const handleOnReset = () => {
    setQuery({
      name: "",
      phone: "",
    });
    setMode("and");
    setSearch(false);
    dispatch(resetQuery());
    Keyboard.dismiss();
  };

  const handleOnSearchSubmit = useCallback(() => {
    if (query.name === "" && query.phone === "") {
      return false;
    }
    dispatch(
      searchContact({
        name: query.name,
        phone: query.phone,
        mode: mode,
      })
    );
    setSearch(true);
    Keyboard.dismiss();
  }, [dispatch, query, mode]);

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.searchBox}
      >
        <View style={styles.searchInput}>
          <TextInput
            name="name"
            style={styles.textInput}
            onChangeText={(text) => handleInputChange("name", text)}
            value={query.name}
            placeholder="Insert name"
            placeholderTextColor="#797979"
          />

          <TextInput
            name="phone"
            style={styles.textInput}
            onChangeText={(text) => handleInputChange("phone", text)}
            value={query.phone}
            placeholder="Insert number"
            placeholderTextColor="#797979"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.searchMode}>
          <Text style={radioStyles.RadioText}>search-mode:</Text>
          <View style={radioStyles.Radio}>
            <TouchableOpacity
              style={[
                radioStyles.RadioButton,
                mode === "and" && radioStyles.RadioButtonActive,
              ]}
              onPress={() => setMode("and")}
            >
              {mode === "and" ? (
                <View style={radioStyles.RadioButtonChecked} />
              ) : (
                <View style={radioStyles.RadioButtonUnchecked} />
              )}
            </TouchableOpacity>
            <Text
              style={[
                radioStyles.RadioText,
                mode === "and" && radioStyles.RadioTextActive,
              ]}
            >
              Strict
            </Text>
          </View>
          <View style={radioStyles.Radio}>
            <TouchableOpacity
              style={[
                radioStyles.RadioButton,
                mode === "or" && radioStyles.RadioButtonActive,
              ]}
              onPress={() => setMode("or")}
            >
              {mode === "or" ? (
                <View style={radioStyles.RadioButtonChecked} />
              ) : (
                <View style={radioStyles.RadioButtonUnchecked} />
              )}
            </TouchableOpacity>
            <Text
              style={[
                radioStyles.RadioText,
                mode === "or" && radioStyles.RadioTextActive,
              ]}
            >
              Any
            </Text>
          </View>
        </View>
        <View style={styles.searchButton}>
          <Button
            title="Search"
            onPress={handleOnSearchSubmit}
            buttonStyle={[styles.Button, { backgroundColor: "#26BAF9" }]}
            titleStyle={{ fontWeight: "bold" }}
          />
          <Button
            title="Reset"
            onPress={handleOnReset}
            buttonStyle={[
              styles.Button,
              { backgroundColor: search ? "#F9A526" : "#949191" },
            ]}
            titleStyle={{ fontWeight: "bold" }}
            disabled={search ? false: true}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    flexDirection: "column",
    justifyContent: "flex-end",
    marginVertical: 5,
    height: 130,
  },
  searchInput: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  textInput: {
    width: "48%",
    borderStyle: "solid",
    borderColor: "black",
    backgroundColor: "#EBEBEB",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 14,
    color: "#797979",
  },
  searchMode: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 18,
  },
  searchButton: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Button: {
    width: 160,
  },
});

const radioStyles = StyleSheet.create({
  // Radio Styles
  RadioText: {
    fontSize: 16,
    fontWeight: "200",
  },
  Radio: {
    flexDirection: "row",
    alignItems: "center",
    width: "30%",
    justifyContent: "space-evenly",
  },
  RadioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#DBDBDB",
    alignItems: "center",
    justifyContent: "center",
  },
  RadioButtonActive: {
    borderColor: "#797979",
  },
  RadioButtonChecked: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#797979",
  },
  RadioButtonUnchecked: {
    width: 0,
    height: 0,
  },
  RadioTextActive: {
    color: "#000",
  },
});
