import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";
import { BASE_URL } from "../redux/config";

const DetailScreen = ({ navigation, route }) => {
  const [selectedCourse, setSelectedCourse] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    let { course } = route.params;
    setSelectedCourse(course);
  }, []);

  const cartHandler = (id) => {
    dispatch(addToCart(id));
    navigation.navigate("Cart");
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingVertical: 30,
      }}
    >
      <View
        style={{
          width: "100%",
          height: 300,
        }}
      >
        <Image
          source={{
            uri: `${BASE_URL}/uploads/${selectedCourse.thumbnail}`,
          }}
          resizeMode="cover"
          style={{
            width: "100%",
            height: 300,
          }}
        />
        <View style={{ padding: 10 }}>
          <Text
            style={{ fontSize: 20, fontFamily: "Poppins", fontWeight: "bold" }}
          >
            {selectedCourse.title}
          </Text>
          <Text
            style={{ fontSize: 11, fontFamily: "Poppins", color: "#0075FF" }}
          >
            {selectedCourse.coursecode}
          </Text>
          <ScrollView style={{ height: 200 }}>
            <Text style={{ fontSize: 11, fontFamily: "Poppins" }}>
              {selectedCourse.description}
            </Text>
          </ScrollView>
          <View style={{ flex: 1, padding: 10 }}>
            <Text style={[styles.button, styles.font]}>
              &#x20A6;{selectedCourse.price}
            </Text>
            <TouchableOpacity
              style={[styles.button, styles.green]}
              onPress={() => cartHandler(selectedCourse._id)}
            >
              <Text style={{ textAlign: "center", color: "white" }}>
                Add to Cart
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  font: {
    fontSize: 20,
    fontFamily: "Poppins",
  },
});

export default DetailScreen;
