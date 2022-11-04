import React, { useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  StatusBar,
  Modal,
  CheckBox,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { useSelector, useDispatch } from "react-redux";
import Terms from "../../components/Terms";
import { userRegister } from "../../redux/actions/registerActions";
import { AntDesign } from "@expo/vector-icons";
import styles from "../Styling";

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
    props.navigation.navigate("Home");
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar backgroundColor="#0075FF" barStyle="light-content" />
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri: "https://lectures247.com/static/media/2.10c049b3.jpg",
          }}
          style={styles.imgBackground}
        >
          <LinearGradient
            colors={["#0075FF", "#0C67CF"]}
            start={[0.9, 0.2]}
            style={styles.linearGradient}
          >
            <View style={styles.headerSm}>
              <Animatable.Image
                source={require("../../../assets/logo.png")}
                animation="bounceIn"
                duraton="1500"
                style={styles.logo}
              ></Animatable.Image>
            </View>
            {loading ? (
              <ActivityIndicator size="large" color="#0075FF" />
            ) : (
              <>
                <Animatable.View
                  animation="fadeInUpBig"
                  style={styles.footerBg}
                >
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.inputContainer}>
                      <Text style={styles.title}>Create Account</Text>
                    </View>
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
                          <Text style={styles.modalText}>
                            Terms & Conditions
                          </Text>

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
                        <Text>
                          I have read and agree with the Terms and Conditions
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.inputContainer}>
                      <TouchableOpacity
                        style={[styles.button, styles.green]}
                        onPress={submit}
                      >
                        <View style={styles.btnFlex}>
                          <Text
                            style={{
                              color: "white",
                              flex: 2.7,
                              textAlign: "center",
                            }}
                          >
                            Create Account
                          </Text>
                          <AntDesign
                            name="user"
                            size={18}
                            color="white"
                            style={{ flex: 0.3, textAlign: "center" }}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={[styles.inputContainer, styles.captionBox]}>
                      <TouchableOpacity
                        onPress={() => props.navigation.navigate("Login")}
                      >
                        <Text style={[styles.caption, { textAlign: "center" }]}>
                          Already Have an account?{" "}
                          <Text style={styles.link}>Login</Text>
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                </Animatable.View>
              </>
            )}
          </LinearGradient>
        </ImageBackground>
      </View>
    </KeyboardAvoidingView>
  );
};

export default PasswordScreen;
