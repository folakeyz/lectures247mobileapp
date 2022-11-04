import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { AntDesign } from "@expo/vector-icons";
import styles from "./Styling";

const WelcomeScreen = (props) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0075FF" barStyle="light-content" />
      <ImageBackground
        source={{ uri: "https://lectures247.com/static/media/2.10c049b3.jpg" }}
        style={styles.imgBackground}
      >
        <LinearGradient
          colors={["#0075FF", "#0C67CF"]}
          start={[0.9, 0.2]}
          style={styles.linearGradient}
        >
          <View style={styles.header}>
            <Animatable.Image
              source={require("../../assets/logo.png")}
              animation="bounceIn"
              duraton="1500"
              style={styles.logo}
            ></Animatable.Image>
          </View>

          <Animatable.View animation="fadeInUpBig" style={styles.footer}>
            <Text style={styles.welcome}>Welcome</Text>
            <Text style={styles.slogan}>
              Self-help Educational Resource Portal
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Login")}
            >
              <LinearGradient
                colors={["#0075FF", "#0C67CF"]}
                start={[0.9, 0.5]}
                style={[styles.button]}
              >
                <View style={styles.btnFlex}>
                  <Text style={{ color: "white", flex: 2.7 }}>Login</Text>
                  <AntDesign
                    name="login"
                    size={18}
                    color="white"
                    style={{ flex: 0.3, textAlign: "center" }}
                  />
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate("Register")}
            >
              <LinearGradient
                colors={["#FAA954", "#FAA954"]}
                start={[0.9, 0.2]}
                style={styles.button}
              >
                <View style={styles.btnFlex}>
                  <Text style={{ color: "white", flex: 2.7 }}>
                    Create Account
                  </Text>
                  <AntDesign
                    name="user"
                    size={18}
                    color="white"
                    style={{ flex: 0.3, textAlign: "center" }}
                  />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animatable.View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default WelcomeScreen;
