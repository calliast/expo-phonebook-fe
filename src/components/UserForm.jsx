import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../features/contactSlice";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  SafeAreaView,
  Keyboard,
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

  const handleOnSubmit = useCallback(() => {
    dispatch(addContact({ name: contact.name, phone: contact.phone }));
    setContact({
      name: "",
      phone: "",
    });
    Keyboard.dismiss();
  }, [dispatch, contact]);

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.addForm}
      >
        <View style={styles.addBox}>
          <View style={styles.addInput}>
            <TextInput
              name="name"
              style={styles.input}
              onChangeText={(text) => handleInputChange("name", text)}
              value={contact.name}
              placeholder="Insert new name"
              placeholderTextColor="#797979"
            />
          </View>

          <View style={styles.addInput}>
            <TextInput
              name="phone"
              style={styles.input}
              onChangeText={(text) => handleInputChange("phone", text)}
              value={contact.phone}
              placeholder="Insert new number"
              placeholderTextColor="#797979"
              keyboardType="numeric"
            />
          </View>
        </View>

        <Button
          title="Add new contact"
          onPress={handleOnSubmit}
          buttonStyle={[styles.Button, { backgroundColor: "#26BAF9" }]}
          titleStyle={{ fontWeight: "bold" }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  addForm: {
    height: 140,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  addBox: {
    width: "100%",
    height: 90,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  addInput: {
    width: "100%",
  },
  input: {
    width: "100%",
    height: 39,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#EBEBEB",
    borderRadius: 5,
    fontSize: 14,
  },
  textButton: {
    fontSize: 14,
  },
  textWrapper: {
    backgroundColor: "cyan",
    padding: 4,
  },
});
