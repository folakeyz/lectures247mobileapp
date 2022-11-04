import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";
import { BlurView } from "@react-native-community/blur";

const CourseCardDetails = ({ courseItem }) => {
  return (
    <View style={{ flex: 1 }}>
      {/* Nme */}
      <View
        style={{
          flex: 1,
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            width: "100%",
            color: "white",
            fontSize: 18,
            textShadowColor: "rgba(0, 0, 0, 0.75)",
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 10,
            fontFamily: "Poppins",
          }}
        >
          {courseItem && courseItem.title.length > 30
            ? courseItem.title.slice(0, 30) + "..."
            : courseItem.title}
        </Text>
      </View>
      {/* Description */}
    </View>
  );
};

const CourseCardInfo = ({ courseItem }) => {
  if (Platform.OS === "ios") {
    return (
      <BlurView blurType="dark" style={styles.courseCardContainer}>
        <CourseCardDetails courseItem={courseItem} />
      </BlurView>
    );
  } else {
    return (
      <View
        style={{
          ...styles.courseCardContainer,
          //   backgroundColor: "rgba(58,180,73, 0.8)",
        }}
      >
        <CourseCardDetails courseItem={courseItem} />
      </View>
    );
  }
};

const TrendingCard = ({ containerstyle, trendingitem, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        height: 250,
        width: 200,
        marginTop: 10,
        marginRight: 20,
        borderRadius: 10,
        ...containerstyle,
      }}
      onPress={onPress}
    >
      {/* BGImage */}
      <Image
        source={{
          uri: `https://lectures247.herokuapp.com/uploads/${trendingitem.thumbnail}`,
        }}
        resizeMode="cover"
        style={{
          width: 200,
          height: 250,
          borderRadius: 10,
        }}
      />
      {/* Course Code */}
      <View
        style={{
          position: "absolute",
          top: 20,
          left: 15,
          paddingHorizontal: 10,
          paddingVertical: 10,
          backgroundColor: "rgba(77,77,77, 0.8)",
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 11,
            fontFamily: "Poppins",
          }}
        >
          {trendingitem.coursecode}
        </Text>
      </View>
      {/* Course Info */}
      <CourseCardInfo courseItem={trendingitem} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  courseCardContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
export default TrendingCard;
