import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { TextInput } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails } from "../redux/actions/userActions";

const AccountScreen = (props) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const { loading, error, user } = profile;
  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  const logout = async () => {
    await AsyncStorage.removeItem("userInfo");
    props.navigation.navigate("Login");
  };
  const [firstname, setFirstName] = useState(user && user.firstname);
  const [lastname, setLastName] = useState(user && user.lastname);
  const [username, setUsername] = useState(user && user.username);
  const [mobile, setMobile] = useState(user && user.mobile);
  const [email, setEmail] = useState(user && user.email);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingVertical: 30,
      }}
    >
      <View style={styles.header}>
        <View style={styles.profile}>
          <Image
            source={require("../../assets/avatar.png")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
            }}
          />
        </View>
        <View style={styles.name}>
          <Text style={styles.nameMd}>
            {user && user.firstname + " " + user.lastname}
          </Text>
        </View>
      </View>
      <View style={{ padding: 10 }}>
        <View style={styles.inputContainer}>
          <Text>First Name</Text>
          <TextInput
            onChangeText={(text) => setFirstName(text)}
            value={firstname}
            style={styles.input}
            editable={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Last Name</Text>
          <TextInput
            onChangeText={(text) => setLastName(text)}
            value={lastname}
            // style={styles.input}
            editable={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Username</Text>
          <TextInput
            onChangeText={(text) => setUsername(text)}
            value={username}
            style={styles.input}
            editable={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Email Address</Text>
          <TextInput
            onChangeText={(text) => setEmail(text)}
            value={email}
            // style={styles.input}
            editable={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Mobile Number</Text>
          <TextInput
            placeholder="Enter Mobile"
            onChangeText={(text) => setMobile(text)}
            value={mobile}
            // style={styles.input}
            editable={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <TouchableOpacity style={[styles.button, styles.green]}>
            <Text style={{ color: "white" }}>Contact / Support</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            onPress={logout}
            style={[styles.button, styles.green]}
          >
            <Text style={{ color: "white" }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  inputContainer: {
    padding: 3,
  },
  button: {
    width: "100%",
    height: 30,
    borderRadius: 3,
    backgroundColor: "white",
    color: "black",
    padding: 3,
    paddingTop: 5,

    textAlign: "center",
    paddingHorizontal: 20,
  },
  green: {
    // backgroundColor: "#0075FF",
    backgroundColor: "gray",
    backgroundColor: "#0075FF",
    color: "white",
  },
  header: {
    width: "100%",
    height: 200,
    backgroundColor: "#0075FF",
    justifyContent: "center",
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "white",
    alignSelf: "center",
  },
  name: { width: "100%", height: "auto" },
  nameMd: {
    color: "white",
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
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
});

export default AccountScreen;
