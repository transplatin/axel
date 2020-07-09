import React, { useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Header from "../components/Header";
import Net from "../network/Net";

const SignUp = (props) => {
  const [number, setNumber] = useState("");
  const [auth, setAuth] = useState("");
  const [response, setResponse] = useState("");
  const login = async () => {
    try {
      const data = await Net.get("/api/login.php", {
        params: {
          number,
          auth,
        },
      });
      setResponse(data.data);
      await AsyncStorage.setItem("phoneno", data.data[0].contactno);
      await AsyncStorage.setItem("auth", data.data[0].authtoken);
      await AsyncStorage.setItem("uid", data.data[0].uid.toString());
      props.isLogin(true);
    } catch (e) {
      console.log(e.message);
    }
  };
  const verify = () => {
    var phoneno = /^\d{10}$/;
    if (number.length < 10 || !number.match(phoneno)) {
      alert("Invalid Mobile Number !");
      return false;
    } else if (auth.length < 6) {
      alert("Password should be at least 6 characters long !");
      return false;
    }
    login(number, auth);
    return true;
  };
  if (response == "Incorrect Password") {
    alert("Incorrect Password");
  }
  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      style={styles.container}
    >
      <ImageBackground
        style={styles.background}
        resizeMode="repeat"
        source={{
          uri:
            "https://image.freepik.com/free-vector/hand-drawn-science-education-wallpaper_23-2148504142.jpg",
        }}
      >
        <View style={styles.mobileNo}>
          <View style={styles.header}>
            <Header header="Login Or Sign Up" />
          </View>
          <View style={styles.input}>
            <TextInput
              keyboardType="number-pad"
              maxLength={10}
              onChangeText={(e) => setNumber(e)}
              value={number}
              style={styles.inputText}
              placeholder="Mobile Number"
            />
            <TextInput
              secureTextEntry
              onChangeText={(e) => {
                setAuth(e);
                setResponse("");
              }}
              value={auth}
              onEndEditing={() => verify()}
              style={styles.inputText}
              placeholder="Password"
            />
            <TouchableOpacity
              onPress={() => verify()}
              style={styles.buttonSubmit}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    height: "100%",
    width: Math.floor(Dimensions.get("window").width),
    alignItems: "center",
    justifyContent: "center",
  },
  mobileNo: {
    height: "40%",
    width: "80%",
    backgroundColor: "#63c5da",
    borderRadius: 20,
    elevation: 200,
  },
  header: {
    alignItems: "center",
  },
  input: {
    backgroundColor: "white",
    alignItems: "center",
    marginVertical: 50,
    elevation: 10,
  },
  inputText: {
    fontSize: 25,
    padding: 10,
    textAlign: "center",
    color: "#003343",
  },
  buttonSubmit: {
    alignItems: "center",
    backgroundColor: "#2f95dc",
    width: "100%",
    alignSelf: "center",
    borderRadius: 4,
    marginTop: 10,
  },
  buttonText: {
    justifyContent: "center",
    padding: 20,
    fontSize: 20,
    fontFamily: "space-mono",
    color: "white",
  },
});

export default SignUp;
