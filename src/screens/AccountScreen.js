import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails } from "../redux/actions/userActions";

const AccountScreen = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const { loading, error, user } = profile;
  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imgWrapper}>
          <Image
            source={require("../../assets/logo.png")}
            style={styles.homeImg}
          ></Image>
        </View>
        <Text>Welcome {user && user.firstname}</Text>
        <Text>Account Screen</Text>
      </View>
    </ScrollView>
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
});

export default AccountScreen;
