import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";
import { saveBasicInfo } from "../../redux/actions/registerActions";

const BasicInfoScreen = (props) => {
  const dispatch = useDispatch();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState(false);
  const [loading, setLoading] = useState(false);

  const save = () => {
    setLoading(true);
    if (!firstname || !lastname || !username || !mobile || !email) {
      setLoading(false);
      setMsg(true);
    } else {
      dispatch(saveBasicInfo({ firstname, lastname, username, mobile, email }));
      setLoading(false);
      props.navigation.navigate("Education");
    }
  };
  return (
    // <ScrollView>
    <View style={styles.container}>
      <View style={styles.imgWrapper}>
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.homeImg}
        ></Image>
      </View>
      {msg && <Text style={styles.error}>All Fields are Compulsory</Text>}
      {loading ? (
        <ActivityIndicator size="large" color="#0075FF" />
      ) : (
        <>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="First Name"
              onChangeText={(text) => setFirstName(text)}
              value={firstname}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Last Name"
              onChangeText={(text) => setLastName(text)}
              value={lastname}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Username"
              onChangeText={(text) => setUsername(text)}
              value={username}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter Email Address"
              onChangeText={(text) => setEmail(text)}
              value={email}
              style={styles.input}
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter Mobile"
              onChangeText={(text) => setMobile(text)}
              value={mobile}
              style={styles.input}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={[styles.button, styles.green]}
              onPress={save}
            >
              <Text style={styles.text}>Next</Text>
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
});

export default BasicInfoScreen;
