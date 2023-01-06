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
  Pressable,
  SafeAreaView,
} from "react-native";
import { Button, Icon } from "react-native-elements";

export default function UserSearch(props) {
  const dispatch = useDispatch();
  const [query, setQuery] = useState({
    name: "",
    phone: "",
  });

  const [search, setSearch] = useState({
    isSearch: false,
  });

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
    setSearch({
      isSearch: false,
    });
    dispatch(resetQuery());
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
    setSearch({
      isSearch: true,
    });
  }, [dispatch, query, mode]);

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.addFormWrapper}
      >
        <View style={styles.formSearch}>
          <View style={styles.singleInput}>
            <Text style={styles.textLabel}>Name</Text>
            <TextInput
              name="name"
              style={styles.input}
              onChangeText={(text) => handleInputChange("name", text)}
              value={query.name}
              placeholder="name to search"
            />
          </View>

          <View style={styles.singleInput}>
            <Text style={styles.textLabel}>Phone</Text>
            <TextInput
              name="phone"
              style={styles.input}
              onChangeText={(text) => handleInputChange("phone", text)}
              value={query.phone}
              placeholder="number to search"
              keyboardType="numeric"
            />
          </View>
        </View>
        <View style={styles.inputGrouped}>
          <View style={styles.searchMode}>
            <Text style={styles.RadioText}>search-mode:</Text>
            <View style={styles.Radio}>
              <TouchableOpacity
                style={[
                  styles.RadioButton,
                  mode === "and" && styles.RadioButtonActive,
                ]}
                onPress={() => setMode("and")}
              >
                {mode === "and" ? (
                  <View style={styles.RadioButtonChecked} />
                ) : (
                  <View style={styles.RadioButtonUnchecked} />
                )}
              </TouchableOpacity>
              <Text
                style={[
                  styles.RadioText,
                  mode === "and" && styles.RadioTextActive,
                ]}
              >
                Strict
              </Text>
            </View>
            <View style={styles.Radio}>
              <TouchableOpacity
                style={[
                  styles.RadioButton,
                  mode === "or" && styles.RadioButtonActive,
                ]}
                onPress={() => setMode("or")}
              >
                {mode === "or" ? (
                  <View style={styles.RadioButtonChecked} />
                ) : (
                  <View style={styles.RadioButtonUnchecked} />
                )}
              </TouchableOpacity>
              <Text
                style={[
                  styles.RadioText,
                  mode === "or" && styles.RadioTextActive,
                ]}
              >
                Any
              </Text>
            </View>
          </View>
          <View style={styles.searchBar}>
            {search.isSearch && (
              <Button
                onPress={handleOnReset}
                icon={<Icon name="undo" size={15} color="#fff" />}
                title="Reset"
                color="#00aced"
                style={{marginHorizontal: 5}}
                />
                )}
            <Button
              onPress={handleOnSearchSubmit}
              icon={<Icon name="search" size={15} color="#fff" />}
              title="Search"
              color="#00aced"
              style={{marginLeft: 5}}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  addFormWrapper: {
    flexDirection: "column",
    justifyContent: "flex-end",
    marginVertical: 5,
    // borderStyle: "solid",
    // borderWidth: 1,
    // borderColor: "orange",
  },
  formSearch: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  singleInput: {
    width: "48%",
  },
  textLabel: {},
  input: {
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
    borderRadius: 5,
    fontSize: 14,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
  },
  inputGrouped: {
    alignItems: "flex-end",
  },
  searchBar: {
    marginVertical: 5,
    width: "55%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    // highlighter
    // borderStyle: "solid",
    // borderWidth: 1,
    // borderColor: "purple",
  },
  searchMode: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 15,
    marginVertical: 5,
  },
  RadioText: {
    fontSize: 16,
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
    borderColor: "#666",
    alignItems: "center",
    justifyContent: "center",
  },
  RadioButtonActive: {
    borderColor: "#000",
  },
  RadioButtonChecked: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#000",
  },
  RadioButtonUnchecked: {
    width: 0,
    height: 0,
  },
  RadioTextActive: {
    color: "#000",
  },
  textButton: {
    fontSize: 14,
  },
  textWrapper: {
    backgroundColor: "cyan",
    padding: 4,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
  },
});
