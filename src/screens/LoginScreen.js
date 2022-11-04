import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
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
import styles from "./Styling";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/actions/userActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_LOGIN_RESET } from "../redux/constants/userConstants";

const LoginScreen = (props) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);

  const loginhandler = () => {
    if (!email || !password) {
      Alert.alert("Error", "Enter Email and Password", [{ text: "Ok" }]);
    } else {
      dispatch(login(email, password));
    }
  };

  useEffect(() => {
    const login = async () => {
      const user = await AsyncStorage.getItem("userInfo");
      const userToken = JSON.parse(user);
      if (userToken.token !== null || undefined) {
        props.navigation.navigate("Home");
      }
    };
    login();
  }, [userInfo, props]);

  if (error) {
    Alert.alert("Error", error, [{ text: "Ok" }]);
    dispatch({ type: USER_LOGIN_RESET });
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
            <View style={styles.headerMd}>
              <Animatable.Image
                source={require("../../assets/logo.png")}
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
                  style={styles.footerMd}
                >
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.inputContainer}>
                      <Text style={styles.title}>Login </Text>
                    </View>

                    <View style={styles.inputContainer}>
                      <TextInput
                        placeholder="Email Address"
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        // style={styles.input}
                        autoCapitalize="none"
                      />
                    </View>
                    <View style={styles.inputContainer}>
                      <TextInput
                        placeholder="Password"
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        // style={styles.input}
                        secureTextEntry={passwordVisible}
                        right={
                          <TextInput.Icon
                            name={passwordVisible ? "eye" : "eye-off"}
                            onPress={() => setPasswordVisible(!passwordVisible)}
                          />
                        }
                      />
                    </View>
                    <View style={styles.inputContainer}>
                      <TouchableOpacity
                        style={[styles.button, styles.green]}
                        onPress={loginhandler}
                      >
                        <Text
                          style={[
                            styles.text,
                            { textAlign: "center", color: "white" },
                          ]}
                        >
                          Login
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={[styles.inputContainer, styles.captionBox]}>
                      <TouchableOpacity
                        onPress={() => props.navigation.navigate("Register")}
                      >
                        <Text style={[styles.caption, { textAlign: "center" }]}>
                          Don't Have an account?{" "}
                          <Text style={styles.link}>Register</Text>
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

export default LoginScreen;
