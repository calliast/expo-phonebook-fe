import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { resendContact, updateContact } from "../features/contactSlice";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  SafeAreaView,
} from "react-native";
import { Button, Icon } from "react-native-elements";

export default function PhoneBookItem(props) {
  const dispatch = useDispatch();

  const [contact, setContact] = useState({
    id: props.itemId,
    name: props.name,
    phone: props.phone,
  });

  const [edit, setEdit] = useState(false);

  const handleInputChange = (name, value) => {
    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleUpdateContact = useCallback(() => {
    const data = {
      id: contact.id,
      name: contact.name,
      phone: contact.phone,
    };
    dispatch(updateContact(data));
    setEdit(false);
  }, [dispatch, contact]);

  const handleEdit = () => setEdit(true);

  const handleCancel = () => {
    setEdit(false);
    setContact({
      id: props.itemId,
      name: props.name,
      phone: props.phone,
    });
  };

  const handleResendContact = () => {
    const data = {
      id: props.itemId,
      name: props.name,
      phone: props.phone,
    };
    dispatch(resendContact(data));
  };

  return (
    <SafeAreaView style={[styles.contactItem, {backgroundColor: props.sent ? "#E2E7E4": "#FD843D", height: edit ? 100: 71}]}>
      <View style={styles.personIcon}>
        <Icon name="person" size={32} color="#000" />
        </View>
      {edit ? (
        <View style={styles.editLayout}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.editInputLayout}
          >
            <TextInput
              style={styles.editInput}
              onChangeText={(text) => handleInputChange("name", text)}
              value={contact.name}
              placeholder="Insert new name"
            />
            <TextInput
              style={styles.editInput}
              onChangeText={(text) => handleInputChange("phone", text)}
              value={contact.phone}
              placeholder="Insert new number"
              keyboardType="numeric"
            />
          </KeyboardAvoidingView>
          {/* Save and Cancel button */}
          <View style={styles.actionButton}>
              <Button
                icon={{
                  name: "save",
                  type: "font-awesome",
                  size: 17,
                  color: "white",
                }}
                title=""
                onPress={handleUpdateContact}
                buttonStyle={[styles.Button, { backgroundColor: "#33CB42" }]}
              />
              <Button
                icon={{
                  name: "ban",
                  type: "font-awesome",
                  size: 17,
                  color: "white",
                }}
                title=""
                onPress={handleCancel}
                buttonStyle={[styles.Button, { backgroundColor: "#949191" }]}
              />
          </View>
        </View>
      ) : (
        <View style={styles.listLayout}>
          <View style={styles.contactDetails}>
            <Text style={styles.contactDetailsName}>{props.name}</Text>
            <View style={styles.lineBar}></View>
            <Text style={styles.contactDetailsPhone}>{props.phone}</Text>
          </View>
          <View style={styles.actionButton}>
            {props.sent ? (
              <>
                <Button
                  icon={{
                    name: "edit",
                    type: "font-awesome",
                    size: 17,
                    color: "white",
                  }}
                  title=""
                  onPress={handleEdit}
                  buttonStyle={[styles.Button, { backgroundColor: "#449AFF" }]}
                />

                <Button
                  icon={{
                    name: "trash",
                    type: "font-awesome",
                    size: 17,
                    color: "white",
                  }}
                  title=""
                  onPress={props.delete}
                  buttonStyle={[styles.Button, { backgroundColor: "#F94D4D" }]}
                />
              </>
            ) : (
              <Button
                icon={{
                  name: "undo",
                  type: "font-awesome",
                  size: 16,
                  color: "black",
                }}
                title=""
                onPress={handleResendContact}
                buttonStyle={[styles.Button, { backgroundColor: "#FFF" }]}
              />
            )}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contactItem: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 14,
  },
  personIcon: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    borderRadius: 40,
  },
  editLayout: {
    flexDirection: "row",
    width: "70%",
    justifyContent: "space-between",
    marginHorizontal: 8,
  },
  editInputLayout: {
    width: "65%",
    height: 84,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  editInput: {
    width: 140,
    height: 39,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#FFF",
    borderRadius: 10,
  },
  listLayout: {
    flexDirection: "row",
    width: "70%",
    justifyContent: "space-between",
    marginHorizontal: 8,
    // borderStyle: "solid",
    // borderWidth: 1,
    // borderColor: "purple",
  },
  contactDetails: {
    width: "60%",
    flexDirection: "column",
  },
  lineBar: {
    width: 140,
    height: 1,
    backgroundColor: "black",
    marginBottom: 4,
  },
  contactDetailsName: {
    fontSize: 20,
    marginBottom: 4,
  },
  contactDetailsPhone: {
    fontSize: 14,
  },
  actionButton: {
    width: "30%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  Button: {
    width: 40,
    height: 40,
    borderRadius: 40,
    margin: 2,
  },
});