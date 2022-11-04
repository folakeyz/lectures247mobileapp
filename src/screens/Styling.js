import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "white",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  headerSm: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerMd: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  footerMd: {
    flex: 1.5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  footerBg: {
    flex: 2,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 30,
  },

  imgBackground: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  linearGradient: {
    width: "100%",
    height: "100%",
    opacity: 0.95,
    color: "white",
  },

  logo: {
    width: 150,
    height: 150,
  },
  welcome: {
    color: "#0075FF",
    fontSize: 30,
  },
  slogan: {
    color: "black",
    fontSize: 13,
    marginBottom: 10,
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 30,
    backgroundColor: "#0075FF",
    color: "black",
    padding: 15,
    marginBottom: 10,
    textAlign: "center",
  },
  inputContainer: {
    padding: 5,
  },
  input: {
    borderColor: "#CECFD1",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    color: "#0075FF",
  },
  btnFlex: {
    flex: 1,
    flexDirection: "row",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  // button: {
  //   borderRadius: 20,
  //   padding: 10,
  //   elevation: 2
  // },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
  },
});

export default styles;
