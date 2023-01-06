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
  TouchableOpacity,
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

  const [edit, setEdit] = useState({
    isEdit: false,
  });

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
    setEdit({
      isEdit: false,
    });
  }, [dispatch, contact]);

  const handleEdit = () => setEdit({ isEdit: true });

  const handleCancel = () => {
    setEdit({ isEdit: false });
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
    <SafeAreaView style={styles.tr}>
      <Text style={styles.TableColumnNo}>#{props.no}</Text>
      {edit.isEdit ? (
        <View style={styles.contactRow}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.editFormWrapper}
          >
            <TextInput
              style={styles.editInput}
              onChangeText={(text)=> handleInputChange('name', text)}
              value={contact.name}
              placeholder="Insert new name"
            />
            <TextInput
              style={styles.editInput}
              onChangeText={(text)=> handleInputChange('phone', text)}
              value={contact.phone}
              placeholder="Insert new number"
              keyboardType="numeric"
            />
          </KeyboardAvoidingView>
          {/* Save and Cancel button */}
          <View style={styles.TableColumnButton}>
            <Button
              icon={{
                name: "save",
                type: "font-awesome",
                size: 15,
                color: "white",
              }}
              title=""
              onPress={handleUpdateContact}
              buttonStyle={{ backgroundColor: "#5cb85c" }}
            />
            <Button
              icon={{
                name: "ban",
                type: "font-awesome",
                size: 15,
                color: "white",
              }}
              title=""
              onPress={handleCancel}
              buttonStyle={{ backgroundColor: "#d9534f" }}
            />
          </View>
        </View>
      ) : (
        <View style={styles.contactRow}>
          <Text style={styles.TableColumnText}>{props.name}</Text>
          <Text style={styles.TableColumnText}>{props.phone}</Text>
          <View style={styles.TableColumnButton}>
            {props.sent ? (
              <>
                <Button
                  icon={{
                    name: "edit",
                    type: "font-awesome",
                    size: 15,
                    color: "white",
                  }}
                  title=""
                  onPress={handleEdit}
                  buttonStyle={{ backgroundColor: "#00aced" }}
                />

                <Button
                  icon={{
                    name: "trash",
                    type: "font-awesome",
                    size: 15,
                    color: "white",
                  }}
                  title=""
                  onPress={props.delete}
                  buttonStyle={{ backgroundColor: "#dd6461" }}
                />
              </>
            ) : (
              <Button
                  icon={{
                    name: "undo",
                    type: "font-awesome",
                    size: 15,
                    color: "white",
                  }}
                  title=""
                  onPress={handleResendContact}
                  buttonStyle={{ backgroundColor: "#f7960a" }}
                />
            )}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tr: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    // borderStyle: "solid",
    // borderWidth: 1,
    // borderColor: "green",
  },
  contactRow: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  TableColumn: {
    width: "30%",
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "center",
  },
  TableColumnNo: {
    width: 35,
    textAlign: "center",
  },
  TableColumnButton: {
    width: "30%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    textAlign: "center",
  },
  TableColumnText: {
    width: "30%",
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "center",
    fontSize: 14,
  },
  editFormWrapper: {
    width: "60%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // borderStyle: "solid",
    // borderWidth: 1,
    // borderColor: "orange",
  },
  editInput: {
    width: "48%",
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
    fontSize: 16,
  },
  textWrapper: {
    backgroundColor: "cyan",
    padding: 4,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
  },
  button: {
    margin: 5,
  },
});
