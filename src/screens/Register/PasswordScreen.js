import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  CheckBox,
  Modal,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Terms from "../../components/Terms";
import { userRegister } from "../../redux/actions/registerActions";

const PasswordScreen = (props) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const register = useSelector((state) => state.register);
  const { basicInfo, educationInfo } = register;

  const userRegistration = useSelector((state) => state.userRegistration);
  const { loading, error, success } = userRegistration;

  const [modalVisible, setModalVisible] = useState(false);
  const [isSelected, setSelection] = useState(false);

  const submit = () => {
    if (password != confirmPassword) {
      Alert.alert("Error", "Password does not match", [{ text: "Ok" }]);
    } else {
      if (!isSelected) {
        Alert.alert("Error", "Read and Accept our Terms & Conditions", [
          { text: "Ok" },
        ]);
      } else {
        dispatch(
          userRegister({
            firstname: basicInfo.firstname,
            lastname: basicInfo.lastname,
            email: basicInfo.email,
            username: basicInfo.username,
            mobile: basicInfo.mobile,
            course: educationInfo.course,
            gender: educationInfo.gender,
            level: educationInfo.level,
            location: educationInfo.location,
            password,
          })
        );
      }
    }
  };
  if (success) {
    props.navigation.navigate("Verification");
  }
  return (
    // <ScrollView>
    <View style={styles.container}>
      <View style={styles.imgWrapper}>
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.homeImg}
        ></Image>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
      {loading ? (
        <ActivityIndicator size="large" color="#0075FF" />
      ) : (
        <>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter Password"
              onChangeText={(text) => setPassword(text)}
              value={password}
              style={styles.input}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Confirm Password"
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
              style={styles.input}
              secureTextEntry={true}
            />
          </View>

          {/* Terms & Conditions */}

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Terms & Conditions</Text>

                <Terms />
                <TouchableOpacity
                  style={[styles.button]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <View style={styles.checkboxContainer}>
            <CheckBox
              value={isSelected}
              onValueChange={setSelection}
              style={styles.checkbox}
            />

            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text>I have read and agree with the Terms and Conditions</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={[styles.button, styles.green]}
              onPress={submit}
            >
              <Text style={styles.text}>Create Account</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.inputContainer, styles.captionBox]}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Login")}
            >
              <Text style={styles.caption}>
                Already Have an account? <Text style={styles.link}>Login</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  imgWrapper: {
    width: "100%",
    height: 100,
    paddingHorizontal: 2,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  homeImg: {
    width: 100,
    height: 100,
  },
  inputContainer: {
    padding: 10,
  },
  input: {
    borderColor: "#0075FF",
    borderWidth: 0,
    borderBottomColor: "#0075FF",
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
  },

  button: {
    width: "100%",
    height: 50,
    borderRadius: 20,
    backgroundColor: "white",
    color: "black",
    padding: 3,
    paddingTop: 15,
    margin: 5,
    textAlign: "center",
  },
  green: {
    backgroundColor: "#0075FF",
    color: "white",
  },
  text: {
    color: "white",
    textAlign: "center",
  },
  captionBox: {
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 10,
  },
  caption: {
    textAlign: "center",
  },
  link: {
    color: "#0075FF",
  },
  error: {
    // color: "#6EBA4F",
    color: "#0075FF",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  // button: {
  //   borderRadius: 20,
  //   padding: 10,
  //   elevation: 2
  // },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default PasswordScreen;
