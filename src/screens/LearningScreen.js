import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getMyCourses } from "../redux/actions/orderActions";
import { BASE_URL } from "../redux/config";

const LearningScreen = (props) => {
  const dispatch = useDispatch();
  const myCourses = useSelector((state) => state.myCourses);
  const { loading, error, courses } = myCourses;

  useEffect(() => {
    dispatch(getMyCourses());
  }, [dispatch]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingVertical: 30,
      }}
    >
      {loading ? (
        <ActivityIndicator size="large" color="#0075FF" />
      ) : (
        <>
          <FlatList
            data={courses}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => `${item._id}`}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate("Video", { course: item })
                  }
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 10,
                      marginTop: 10,
                      borderRadius: 10,
                      backgroundColor: "#fff",
                    }}
                  >
                    {/* Image */}
                    <Image
                      source={{
                        uri: `https://portal.lectures247.com/uploads/${item.image}`,
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
                        {item && item.title.length > 20
                          ? item.title.slice(0, 20) + "..."
                          : item.title}
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
                          {item && item.code}
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: "bold",
                          fontFamily: "Poppins",
                        }}
                      >
                        {item && item.description.length > 100
                          ? item.description.slice(0, 100) + "..."
                          : item.description}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </>
      )}
    </SafeAreaView>
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

export default LearningScreen;
