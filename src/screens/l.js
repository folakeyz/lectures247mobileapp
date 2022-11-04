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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import styles from "./Styling";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/actions/userActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-paper";

const LoginScreen = (props) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginhandler = () => {
    dispatch(login(email, password));
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
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: "https://lectures247.com/static/media/2.10c049b3.jpg" }}
        style={styles.imgBackground}
      >
        <LinearGradient
          colors={["#0075FF", "#0C67CF"]}
          start={[0.9, 0.2]}
          style={styles.linearGradient}
        >
          <View style={styles.headerSm}>
            <Animatable.Image
              source={require("../../assets/logo.png")}
              animation="bounceIn"
              duraton="1500"
              style={styles.logo}
            ></Animatable.Image>
          </View>

          <Animatable.View animation="fadeInUpBig" style={styles.footerBg}>
            {error && <Text style={styles.error}>{error}</Text>}
            {loading ? (
              <ActivityIndicator size="large" color="#0075FF" />
            ) : (
              <>
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Email Address"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    // style={styles.input}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Password"
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    // style={styles.input}
                    secureTextEntry={true}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.green]}
                    onPress={loginhandler}
                  >
                    <Text style={styles.text}>Login</Text>
                  </TouchableOpacity>
                </View>
                <View style={[styles.inputContainer, styles.captionBox]}>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate("Register")}
                  >
                    <Text style={styles.caption}>
                      Don't Have an account?{" "}
                      <Text style={styles.link}>Register</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Animatable.View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
