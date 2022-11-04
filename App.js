import React, { useState } from "react";
import { Provider } from "react-redux";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

import AppNavigator from "./src/components/navigation/AppNavigator";
import store from "./src/redux/store";

export default function App() {
  const loadFonts = () => {
    return Font.loadAsync({
      Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
    });
  };
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
