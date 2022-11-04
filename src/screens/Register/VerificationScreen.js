import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { verify } from "../../redux/actions/userActions";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

import AsyncStorage from "@react-native-async-storage/async-storage";

const VerificationScreen = (props) => {
  const dispatch = useDispatch();

  const userVerification = useSelector((state) => state.userVerification);
  const { loading, error, success, verification } = userVerification;

  const CELL_COUNT = 6;

  const [code, setCode] = useState("");
  const ref = useBlurOnFulfill({ code, cellCount: CELL_COUNT });
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    code,
    setCode,
  });
  const submit = () => {
    if (!code) {
      Alert.alert("Error", "Enter Verification Code", [{ text: "Ok" }]);
    } else {
      dispatch(verify(code));
    }
  };
  if (success) {
    props.navigation.navigate("Home");
  }
  return (
    // <ScrollView>
    <View style={styles.container}>
      <View style={styles.imgWrapper}>
        <Image
          source={require("../../../assets/verification.png")}
          style={styles.homeImg}
        ></Image>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
      {loading ? (
        <ActivityIndicator size="large" color="#3AB449" />
      ) : (
        <>
          <Text style={styles.title}>Verification</Text>
          <Text style={styles.subTitle}>
            Please enter the verification code{"\n"}
            we send to your email address
          </Text>
          <CodeField
            ref={ref}
            {...prop}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={code}
            onChangeText={setCode}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />

          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={[styles.button, styles.green]}
              onPress={submit}
            >
              <Text style={styles.text}>Verify Account</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: "#3AB449",
    textAlign: "center",
    borderRadius: 5,
  },
  focusCell: {
    borderColor: "#000",
  },
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
    borderRadius: 20,
    backgroundColor: "white",
    color: "black",
    padding: 3,
    paddingTop: 15,
    margin: 5,
    textAlign: "center",
  },
  green: {
    backgroundColor: "#3AB449",
    color: "white",
  },
  text: {
    color: "white",
    textAlign: "center",
  },
  captionBox: {
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 10,
  },
  caption: {
    textAlign: "center",
  },
  link: {
    color: "green",
  },
  error: {
    color: "#6EBA4F",
    backgroundColor: "#E4F1DE",
    padding: 10,
    borderRadius: 5,
  },
  subTitle: {
    paddingTop: 20,
    color: "#3AB449",
    textAlign: "center",
  },
});

export default VerificationScreen;
