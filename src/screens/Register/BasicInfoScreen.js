import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  StatusBar,
} from "react-native";
import { TextInput } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { useDispatch, useSelector } from "react-redux";
import { checkUser, saveBasicInfo } from "../../redux/actions/registerActions";
import { AntDesign } from "@expo/vector-icons";
import styles from "../Styling";
import { USER_CHECK_RESET } from "../../redux/constants/registerConstants";

const BasicInfoScreen = (props) => {
  const dispatch = useDispatch();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [appError, setAppError] = useState(false);

  const userCheck = useSelector((state) => state.userCheck);
  const { error, success } = userCheck;

  const save = () => {
    setLoading(true);
    if (!firstname || !lastname || !username || !mobile || !email) {
      Alert.alert("Error", "All Fields are Compulsory", [{ text: "Ok" }]);
      setLoading(false);
    } else {
      if (success) {
        setLoading(false);
        dispatch(
          saveBasicInfo({ firstname, lastname, username, mobile, email })
        );
        dispatch({ type: USER_CHECK_RESET });
        props.navigation.navigate("Education");
      } else {
        setLoading(false);
        Alert.alert("Error", error, [{ text: "Ok" }]);
        setAppError(true);
      }
    }
  };
  const verify = () => {
    dispatch({ type: USER_CHECK_RESET });
    dispatch(checkUser(email, mobile, username));
  };

  useEffect(() => {
    dispatch({ type: USER_CHECK_RESET });
  }, [dispatch]);

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
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <>
                <Animatable.View
                  animation="fadeInUpBig"
                  style={styles.footerBg}
                >
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.inputContainer}>
                      <Text style={styles.title}>Create Account</Text>
                      <Text style={styles.caption}>Basic Information</Text>
                    </View>
                    <View style={styles.inputContainer}>
                      <TextInput
                        placeholder="First Name"
                        onChangeText={(text) => setFirstName(text)}
                        value={firstname}
                        // style={styles.input}
                      />
                    </View>
                    <View style={styles.inputContainer}>
                      <TextInput
                        placeholder="Last Name"
                        onChangeText={(text) => setLastName(text)}
                        value={lastname}
                        // style={styles.input}
                      />
                    </View>
                    <View style={styles.inputContainer}>
                      <TextInput
                        placeholder="Username"
                        onChangeText={(text) => setUsername(text)}
                        value={username}
                        style={[appError && { borderColor: "crimson" }]}
                        onEndEditing={verify}
                      />
                    </View>
                    <View style={styles.inputContainer}>
                      <TextInput
                        placeholder="Enter Email Address"
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        style={[appError && { borderColor: "crimson" }]}
                        keyboardType="email-address"
                        onEndEditing={verify}
                        autoCapitalize="none"
                      />
                    </View>
                    <View style={styles.inputContainer}>
                      <TextInput
                        placeholder="Enter Mobile"
                        onChangeText={(text) => setMobile(text)}
                        value={mobile}
                        style={[appError && { borderColor: "crimson" }]}
                        keyboardType="numeric"
                        onEndEditing={verify}
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <TouchableOpacity
                        style={[styles.button, styles.green]}
                        onPress={save}
                      >
                        <View style={styles.btnFlex}>
                          <Text
                            style={{
                              color: "white",
                              flex: 2.7,
                              textAlign: "center",
                            }}
                          >
                            Next
                          </Text>
                          <AntDesign
                            name="rightcircle"
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

export default BasicInfoScreen;
