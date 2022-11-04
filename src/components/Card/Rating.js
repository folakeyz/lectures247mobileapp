import React from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Rating = ({ value }) => {
  return (
    <View>
      <Text
        style={{
          color: "#3AB449",
        }}
      >
        <MaterialIcons
          name={
            value >= 1 ? "star" : value >= 0.5 ? "star-half" : "star-border"
          }
          size={24}
          color="black"
        />
      </Text>
      <Text
        style={{
          color: "#3AB449",
        }}
      >
        <MaterialIcons
          name={
            value >= 2 ? "star" : value >= 1.5 ? "star-half" : "star-border"
          }
          size={24}
          color="black"
        />
      </Text>
      <Text
        style={{
          color: "#3AB449",
        }}
      >
        <MaterialIcons
          name={
            value >= 3 ? "star" : value >= 2.5 ? "star-half" : "star-border"
          }
          size={24}
          color="black"
        />
      </Text>
      <Text
        style={{
          color: "#3AB449",
        }}
      >
        <MaterialIcons
          name={
            value >= 4 ? "star" : value >= 3.5 ? "star-half" : "star-border"
          }
          size={24}
          color="black"
        />
      </Text>
      <Text
        style={{
          color: "#3AB449",
        }}
      >
        <MaterialIcons
          name={
            value >= 5 ? "star" : value >= 4.5 ? "star-half" : "star-border"
          }
          size={24}
          color="black"
        />
      </Text>
    </View>
  );
};

export default Rating;
