import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  StyleSheet
} from "react-native";
import { useState } from "react";

export default function ModalBook(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  const handleSubmit = () => {
    // code to handle form submission goes here
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Floating "+" button */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </View>
      </TouchableOpacity>

      {/* Modal form */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.formContainer}>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              value={input1}
              onChangeText={(text) => setInput1(text)}
              placeholder="Input 1"
            />
            <TextInput
              style={styles.input}
              value={input2}
              onChangeText={(text) => setInput2(text)}
              placeholder="Input 2"
            />
            <Button title="Submit" onPress={handleSubmit} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#00aced",
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 40,
    color: "white",
  },
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  form: {
    backgroundColor: "white",
    padding: 20,
    width: "80%",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
