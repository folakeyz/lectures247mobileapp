import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import RNPickerSelect from "react-native-picker-select";
import { useSelector, useDispatch } from "react-redux";
import { listlocations } from "../../redux/actions/locationAction";
import { saveEducationInfo } from "../../redux/actions/registerActions";
import { AntDesign } from "@expo/vector-icons";
import styles from "../Styling";

const EducationInfoScreen = (props) => {
  const dispatch = useDispatch();
  const locationList = useSelector((state) => state.locationList);
  const { loading, locations } = locationList;
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [level, setLevel] = useState("");
  const [course, setCourse] = useState("");

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
      Alert.alert("Error", "All Fields are Compulsory", [{ text: "Ok" }]);
    } else {
      dispatch(saveEducationInfo({ gender, location, level, course }));
      props.navigation.navigate("Password");
    }
  };

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
              <ActivityIndicator size="large" color="#0075FF" />
            ) : (
              <>
                <Animatable.View
                  animation="fadeInUpBig"
                  style={styles.footerBg}
                >
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.inputContainer}>
                      <Text style={styles.title}>Create Account</Text>
                      <Text style={styles.caption}>Education Information</Text>
                    </View>
                    <View style={styles.inputContainer}>
                      <RNPickerSelect
                        onValueChange={(text) => setGender(text)}
                        useNativeAndroidPickerStyle={false}
                        style={{
                          inputAndroid: {
                            borderColor: "#CECFD1",
                            borderWidth: 1,
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            borderRadius: 30,
                            backgroundColor: "white",
                            color: "black",
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
                            borderColor: "#CECFD1",
                            borderWidth: 1,
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            borderRadius: 30,
                            backgroundColor: "white",
                            color: "black",
                          },
                        }}
                        placeholder={{
                          label: "Select University",
                          value: null,
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

export default EducationInfoScreen;
