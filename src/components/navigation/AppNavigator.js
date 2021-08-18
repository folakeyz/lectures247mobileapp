import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

import LoginScreen from "../../screens/LoginScreen";
import HomeScreen from "../../screens/HomeScreen";
import BasicInfoScreen from "../../screens/Register/BasicInfoScreen";
import EducationInfoScreen from "../../screens/Register/EducationInfoScreen";
import PasswordScreen from "../../screens/Register/PasswordScreen";
import VerificationScreen from "../../screens/Register/VerificationScreen";
import LearningScreen from "../../screens/LearningScreen";
import AccountScreen from "../../screens/AccountScreen";
import DetailScreen from "../../screens/DetailScreen";
import TabIcon from "./TabIcon";
import CartScreen from "../../screens/CartScreen";
import VideoScreen from "../../screens/VideoScreen";
import CheckoutScreen from "../../screens/CheckoutScreen";

function TabsNavigator() {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        showLabel: true,
        style: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: "white",
          borderTopColor: "transparent",
          height: 70,
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="home" />
          ),
        }}
      />
      <Tabs.Screen
        name="My Learning"
        component={LearningScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="play" />
          ),
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="shoppingcart" />
          ),
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="user" />
          ),
          headerShown: true,
        }}
      />
    </Tabs.Navigator>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={BasicInfoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Education"
          component={EducationInfoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Password"
          component={PasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Verification"
          component={VerificationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Course Details"
          component={DetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={TabsNavigator}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ headerShown: true }}
        /> */}
        <Stack.Screen
          name="Checkout"
          component={CheckoutScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Video"
          component={VideoScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
