import React, { useState, useEffect } from "react";
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
import RNPickerSelect from "react-native-picker-select";
import { useSelector, useDispatch } from "react-redux";
import { listlocations } from "../../redux/actions/locationAction";
import { saveEducationInfo } from "../../redux/actions/registerActions";

const EducationInfoScreen = (props) => {
  const dispatch = useDispatch();
  const locationList = useSelector((state) => state.locationList);
  const { loading, locations } = locationList;
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [level, setLevel] = useState("");
  const [course, setCourse] = useState("");
  const [msg, setMsg] = useState(false);

  const register = useSelector((state) => state.register);
  const { basicInfo } = register;

  useEffect(() => {
    if (!basicInfo) {
      props.navigation.navigate("Register");
    }
    dispatch(listlocations());
  }, [dispatch, basicInfo, props]);

  const save = () => {
    if (!gender || !location || !level || !course) {
      setMsg(true);
    } else {
      dispatch(saveEducationInfo({ gender, location, level, course }));
      props.navigation.navigate("Password");
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
        <ActivityIndicator size="large" color="#3AB449" />
      ) : (
        <>
          <View style={styles.inputContainer}>
            <RNPickerSelect
              onValueChange={(text) => setGender(text)}
              useNativeAndroidPickerStyle={false}
              style={{
                inputAndroid: {
                  color: "black",
                  borderColor: "#95B89C",
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 10,
                  paddingHorizontal: 30,
                },
              }}
              placeholder={{
                label: "Select a Gender...",
                value: null,
              }}
              items={[
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
              ]}
            />
          </View>
          <View style={styles.inputContainer}>
            <RNPickerSelect
              onValueChange={(text) => setLocation(text)}
              useNativeAndroidPickerStyle={false}
              style={{
                inputAndroid: {
                  color: "black",
                  borderColor: "#95B89C",
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 10,
                  paddingHorizontal: 30,
                },
              }}
              items={locations.map((item) => ({
                label: item.location,
                value: item._id,
              }))}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Level"
              onChangeText={(text) => setLevel(text)}
              value={level}
              style={styles.input}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter Course of Study"
              onChangeText={(text) => setCourse(text)}
              value={course}
              style={styles.input}
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
              onPress={() => props.navigation.navigate("Education")}
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

export default EducationInfoScreen;
