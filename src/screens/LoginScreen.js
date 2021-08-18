import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/actions/userActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
      <View style={styles.imgWrapper}>
        <Image
          source={require("../../assets/logo.png")}
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
              placeholder="Email Address"
              onChangeText={(text) => setEmail(text)}
              value={email}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Password"
              onChangeText={(text) => setPassword(text)}
              value={password}
              style={styles.input}
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
                Don't Have an account? <Text style={styles.link}>Register</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
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
    borderRadius: 10,
    backgroundColor: "white",
    color: "black",
    padding: 3,
    paddingTop: 15,
    margin: 5,
    textAlign: "center",
  },
  green: {
    // backgroundColor: "#0075FF",
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
    backgroundColor: "#D4BAF3",
    padding: 10,
    borderRadius: 5,
  },
});

export default LoginScreen;
