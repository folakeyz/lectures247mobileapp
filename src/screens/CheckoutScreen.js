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
import { Paystack } from "react-native-paystack-webview";
import { BASE_URL } from "../redux/config";
import { getMyCourses, payOrder } from "../redux/actions/orderActions";
import { ORDER_PAY_RESET } from "../redux/constants/orderConstants";

const CheckoutScreen = (props) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const order = useSelector((state) => state.order);
  const { success } = order;
  const dispatch = useDispatch();
  const total = cartItems
    .reduce((acc, item) => acc + 1 * item.price, 0)
    .toFixed(2);

  if (success) {
    dispatch({ type: ORDER_PAY_RESET });
    dispatch(getMyCourses());
    props.navigation.navigate("My Learning");
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingVertical: 30,
      }}
    >
      <View>
        <Paystack
          paystackKey="pk_test_52291906109e178d68d922424d0c2cba35d36501"
          amount={total}
          billingEmail="paystackwebview@something.com"
          activityIndicatorColor="green"
          onCancel={(e) => {
            // handle response here
            props.navigation.navigate("Cart");
          }}
          onSuccess={(res) => {
            // handle response here
            dispatch(
              payOrder({
                orderItems: cartItems,
                totalPrice: total,
                paymentResult: res.transactionRef,
              })
            );
          }}
          autoStart={true}
        />
      </View>
      <View style={styles.inputContainer}>
        <TouchableOpacity>
          <Text style={[styles.button, styles.green]}>
            &#x20A6;
            {} {"\n"}
            Proceed to Checkout
          </Text>
        </TouchableOpacity>
      </View>
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
    color: "#6EBA4F",
    backgroundColor: "#E4F1DE",
    padding: 10,
    borderRadius: 5,
  },
});

export default CheckoutScreen;
