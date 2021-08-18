import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
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
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingVertical: 30,
      }}
    >
      <View style={{ padding: 10 }}>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={[styles.button, styles.green]}>
            <Text style={{ color: "white" }}>Profile</Text>
          </TouchableOpacity>
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
});

export default AccountScreen;
