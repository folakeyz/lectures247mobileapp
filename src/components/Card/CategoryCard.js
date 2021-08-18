import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { BASE_URL } from "../../redux/config";

const CategoryCard = ({ containerStyle, categoryItem, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: "#fff",
        ...containerStyle,
      }}
      onPress={onPress}
    >
      {/* Image */}
      <Image
        source={{
          uri: `${BASE_URL}/uploads/${categoryItem.thumbnail}`,
        }}
        resizeMode="cover"
        style={{
          width: 100,
          height: 100,
          borderRadius: 10,
        }}
      />
      {/* Details */}
      <View
        style={{
          width: "65%",
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            fontFamily: "Poppins",
          }}
        >
          {categoryItem && categoryItem.title.length > 20
            ? categoryItem.title.slice(0, 20) + "..."
            : categoryItem.title}
        </Text>
        <View
          style={{
            width: 60,
            height: 20,
            backgroundColor: "#0075FF",
            paddingHorizontal: 5,
            borderRadius: 5,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: "white",
              fontFamily: "Poppins",
            }}
          >
            {categoryItem && categoryItem.coursecode}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 11,
            fontFamily: "Poppins",
          }}
        >
          {categoryItem && categoryItem.description.length > 70
            ? categoryItem.description.slice(0, 70) + "..."
            : categoryItem.description}
        </Text>

        <Text
          style={{
            fontSize: 12,
            color: "crimson",
            fontFamily: "Poppins",
          }}
        >
          &#x20A6; {categoryItem && categoryItem.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;
