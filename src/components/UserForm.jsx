import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../../src original source/features/contactSlice";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Button, Icon } from "react-native-elements";

export default function UserForm(props) {
  const dispatch = useDispatch();

  const [contact, setContact] = useState({
    name: "",
    phone: "",
  });

  const handleInputChange = (name, value) => {
    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleOnSubmit = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(addContact({ name: contact.name, phone: contact.phone }));
      setContact({
        name: "",
        phone: "",
      });
    },
    [dispatch, contact]
  );

  return (
    <SafeAreaView style={styles.container}>
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
              onChangeText={(text)=> handleInputChange('name', text)}
              value={contact.name}
              placeholder="Insert new name"
            />
          </View>

          <View style={styles.singleInput}>
            <Text style={styles.textLabel}>Phone</Text>
            <TextInput
              name="phone"
              style={styles.input}
              onChangeText={(text)=> handleInputChange('phone', text)}
              value={contact.phone}
              placeholder="Insert new number"
              keyboardType="numeric"
            />
          </View>
        </View>

        <Button
          onPress={handleOnSubmit}
          icon={<Icon name="save" size={15} color="#fff" />}
          title="Save"
          color="#00aced"
          style={{
            marginLeft: 5,
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  addFormWrapper: {
    flexDirection: "column",
    justifyContent: "flex-end",
    // borderStyle: "solid",
    // borderWidth: 1,
    // borderColor: "purple",
  },
  formSearch: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // highlighter
    // borderStyle: "solid",
    // borderWidth: 1,
    // borderColor: "blue",
  },
  singleInput: {
    width: "48%",
  },
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
  textButton: {
    fontSize: 14,
  },
  textWrapper: {
    backgroundColor: "cyan",
    padding: 4,
    // borderStyle: "solid",
    // borderWidth: 1,
    // borderColor: "black",
  },
});
