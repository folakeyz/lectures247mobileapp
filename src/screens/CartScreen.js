import React from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  console.log(cartItems);
  return (
    <View>
      <Text>Cart</Text>
    </View>
  );
};

export default CartScreen;
