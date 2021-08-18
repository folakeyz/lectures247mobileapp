import React from "react";
import { StyleSheet, Text, View, ImageBackground, Button } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/2.jpg")}
        style={styles.imgBackground}
      >
        <LinearGradient
          colors={["#9350B1", "#6F58D6"]}
          start={[0.9, 0.2]}
          style={styles.linearGradient}
        >
          <View style={styles.imgWrapper}>
            <ImageBackground
              source={require("../../assets/white.png")}
              style={styles.homeImg}
            ></ImageBackground>
          </View>
          <Text style={styles.welcome}>Welcome</Text>
          <Text style={styles.slogan}>
            Self-help Educational Resource Portal
          </Text>
          <Button style={styles.button}>Login</Button>
          <Button style={[styles.button, styles.red]}>Create Account</Button>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "white",
  },
  imgBackground: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  linearGradient: {
    width: "100%",
    height: "100%",
    opacity: 0.95,
    padding: 25,
    color: "white",
  },
  imgWrapper: {
    width: "90%",
    height: 100,
    paddingHorizontal: 2,
    marginTop: 200,
    alignItems: "center",
  },
  homeImg: {
    width: "100%",
    height: 60,
  },
  welcome: {
    color: "white",
    fontSize: 30,
  },
  slogan: {
    color: "white",
    fontSize: 13,
    marginBottom: 10,
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
  red: {
    backgroundColor: "#F20078",
    color: "white",
  },
});

export default WelcomeScreen;
