import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import Net from "./network/Net";
import {
  Platform,
  Text,
  StatusBar,
  StyleSheet,
  View,
  Modal,
  Button,
  Linking,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import useCachedResources from "./hooks/useCachedResources";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import LinkingConfiguration from "./navigation/LinkingConfiguration";
import SignUp from "./screens/Sign-Up";
import getUpdate from "./network/getUpdate";

const Stack = createStackNavigator();

export default function App(props) {
  console.log("Main Screen");
  const isLoadingComplete = useCachedResources();
  const [isLogin, setIsLogin] = useState(true);
  const [uid, setUid] = useState("");
  const [phone, setPhone] = useState("");
  const [auth, setAuth] = useState("");
  const update = getUpdate();
  const getData = async () => {
    try {
      const id = await AsyncStorage.getItem("uid");
      const uth = await AsyncStorage.getItem("auth");
      const phoneno = await AsyncStorage.getItem("phoneno");
      if (id != null && uth != null && phoneno != null) {
        setUid(uid);
        setAuth(auth);
        setPhone(phone);
      } else {
        setIsLogin(false);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {update == "Available" ? (
          <Modal isVisible={true}>
            <View style={styles.updateModal}>
              <View style={styles.updateModal}>
                <Text style={styles.updateText}>
                  New version of this app is Available. Please Update to
                  continue.
                </Text>
                <Button
                  title="Update"
                  onPress={() =>
                    Linking.openURL("market://details?id=co.ukonnect.axel")
                  }
                />
              </View>
            </View>
          </Modal>
        ) : null}
        {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
        <NavigationContainer linking={LinkingConfiguration}>
          {isLogin ? <BottomTabNavigator /> : <SignUp isLogin={setIsLogin} />}
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  updateModal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  updateText: {
    fontSize: 20,
    margin: 20,
    textAlign: "center",
    fontFamily: "space-mono",
  },
});
