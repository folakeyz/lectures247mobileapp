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

const LoginScreen = (props) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginhandler = () => {
    dispatch(login(email, password));
  };
  if (userInfo) {
    props.navigation.navigate("Home");
  }
  useEffect(() => {
    if (userInfo) {
      props.navigation.navigate("Home");
    }
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
        <ActivityIndicator size="large" color="#3AB449" />
      ) : (
        <>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter Emaill Address"
              onChangeText={(text) => setEmail(text)}
              value={email}
              style={styles.input}
            />
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
            <TouchableOpacity
              style={[styles.button, styles.green]}
              onPress={loginhandler}
            >
              <Text style={styles.text}>Login</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      <View style={[styles.inputContainer, styles.captionBox]}>
        <TouchableOpacity onPress={() => props.navigation.navigate("Register")}>
          <Text style={styles.caption}>
            Don't Have an account? <Text style={styles.link}>Register</Text>
          </Text>
        </TouchableOpacity>
      </View>
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
    borderColor: "#95B89C",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    paddingHorizontal: 30,
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
    backgroundColor: "#3AB449",
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
    color: "green",
  },
  error: {
    color: "#6EBA4F",
    backgroundColor: "#E4F1DE",
    padding: 10,
    borderRadius: 5,
  },
});

export default LoginScreen;
