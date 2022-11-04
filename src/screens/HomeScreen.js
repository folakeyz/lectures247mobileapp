import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { getUserDetails } from "../redux/actions/userActions";
import { getCourseDetails } from "../redux/actions/courseActions";
import { AntDesign } from "@expo/vector-icons";
import CategoryCard from "../components/Card/CategoryCard";
import TrendingCard from "../components/Card/TrendingCard";
import { BASE_URL } from "../redux/config";

const HomeScreen = (props) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const { user } = profile;
  const courseList = useSelector((state) => state.courseList);
  const { loading, courses } = courseList;
  useEffect(() => {
    dispatch(getUserDetails());
    dispatch(getCourseDetails());
    if (!user) {
      props.navigation.navigate("Login");
    }
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
            keyExtractor={(item) => `${item._id}`}
            keyboardDismissMode="on-drag"
            showsHorizontalScrollIndicato={false}
            ListHeaderComponent={
              <View>
                {/* Header */}
                <View
                  style={{
                    flexDirection: "row",
                    marginHorizontal: 10,
                    alignItems: "center",
                    height: 80,
                    justifyContent: "space-between",
                  }}
                >
                  {/* Text */}
                  <View styles={{ flex: 1 }}>
                    <Text
                      style={{
                        color: "#0075FF",
                        fontSize: 20,
                        fontFamily: "Poppins",
                      }}
                    >
                      Hello {user && user.username}!{" "}
                    </Text>
                    <Text
                      style={{
                        marginTop: 3,
                        color: "gray",
                        fontSize: 10,
                        fontFamily: "Poppins",
                      }}
                    >
                      Good to see you again!
                    </Text>
                  </View>
                  <TouchableOpacity>
                    <Image
                      source={{
                        uri: `${BASE_URL}/uploads/no-photo.jpg`,
                      }}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                      }}
                    />
                  </TouchableOpacity>
                </View>
                {/* Search */}
                <View
                  style={{
                    flexDirection: "row",
                    marginHorizontal: 10,
                    alignItems: "center",
                    height: 50,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    color: "gray",
                    borderColor: "gray",
                    borderWidth: 1,
                  }}
                >
                  <AntDesign
                    name="search1"
                    size={24}
                    style={{
                      color: "#E6E7E8",
                    }}
                  />
                  <TextInput
                    style={{
                      width: "80%",
                      marginLeft: 10,
                      fontSize: 11,
                      fontFamily: "Poppins",
                    }}
                    placeHolderTextColor="gray"
                    placeholder="Search for Courses"
                  />
                </View>
                {/* See Profile */}

                {courses && courses.length === 0 && (
                  <View style={{ padding: 10 }}>
                    <Text style={styles.error}>No Course Available</Text>
                  </View>
                )}
                {/* Latest course   */}
                <View style={{ marginTop: 10, padding: 10 }}>
                  <Text
                    style={{
                      marginHorizontal: 10,
                      fontSize: 18,
                      fontWeight: "bold",
                      fontFamily: "Poppins",
                    }}
                  >
                    Latest Courses
                  </Text>

                  <FlatList
                    data={courses}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => `${item._id}`}
                    renderItem={({ item, index }) => {
                      return (
                        <TrendingCard
                          containerStyle={{
                            marginLeft: index === 0 ? 10 : 0,
                            padding: 10,
                          }}
                          trendingitem={item}
                          onPress={() =>
                            props.navigation.navigate("Course Details", {
                              course: item,
                            })
                          }
                        />
                      );
                    }}
                  />
                </View>
                {/* Header */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 20,
                    marginHorizontal: 10,
                  }}
                >
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 20,
                      fontFamily: "Poppins",
                      fontWeight: "bold",
                    }}
                  >
                    Courses
                  </Text>
                </View>
              </View>
            }
            renderItem={({ item }) => {
              return (
                <CategoryCard
                  containerStyle={{
                    marginHorizontal: 10,
                  }}
                  categoryItem={item}
                  onPress={() =>
                    props.navigation.navigate("Course Details", {
                      course: item,
                    })
                  }
                />
              );
            }}
            ListFooterComponent={
              <View
                style={{
                  marginBottom: 100,
                }}
              />
            }
          />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  error: {
    color: "#6EBA4F",
    backgroundColor: "#E4F1DE",
    padding: 10,
    borderRadius: 5,
    fontFamily: "Poppins",
  },
});

export default HomeScreen;
