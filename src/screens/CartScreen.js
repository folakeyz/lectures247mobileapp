import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/actions/cartActions";
import { MaterialIcons } from "@expo/vector-icons";
import { BASE_URL } from "../redux/config";

const CartScreen = (props) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  const cartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingVertical: 30,
      }}
    >
      {cartItems && cartItems.length === 0 ? (
        <View style={{ padding: 10 }}>
          <Image
            source={require("../../assets/cart.png")}
            resizeMode="contain"
            style={{
              width: 350,
              height: 350,
              alignSelf: "center",
            }}
          />
          <Text style={{ color: "black", textAlign: "center" }}>
            No Item in Cart
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => `${item.course}`}
            renderItem={({ item, index }) => {
              return (
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
                      uri: `${BASE_URL}/uploads/${item.image}`,
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
                        fontSize: 12,
                        color: "crimson",
                        fontFamily: "Poppins",
                      }}
                    >
                      &#x20A6; {item && item.price}
                    </Text>
                    <TouchableOpacity onPress={() => cartHandler(item.course)}>
                      <Text>
                        <MaterialIcons name="delete" size={24} color="black" />{" "}
                        Remove from Cart
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
            ListFooterComponent={
              <View style={styles.inputContainer}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate("Checkout")}
                >
                  <Text style={[styles.button, styles.green]}>
                    &#x20A6;
                    {cartItems
                      .reduce((acc, item) => acc + 1 * item.price, 0)
                      .toFixed(2)}{" "}
                    {"\n"}
                    Proceed to Checkout
                  </Text>
                </TouchableOpacity>
              </View>
            }
          />
        </>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
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
    borderRadius: 10,
    backgroundColor: "white",
    color: "black",
    padding: 3,
    paddingTop: 5,
    margin: 5,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  green: {
    backgroundColor: "#0075FF",
    color: "white",
  },
  text: {
    color: "white",
    textAlign: "center",
  },
  error: {
    // color: "#6EBA4F",
    color: "#0075FF",
    backgroundColor: "#D4BAF3",
    padding: 10,
    borderRadius: 5,
  },
});

export default CartScreen;
