import React from "react";
import {StyleSheet, TouchableOpacity } from "react-native";
import {useNavigation} from "@react-navigation/native";
import Icon from "../components/Icon";

const AddTopic = () => {
  const Navigation=useNavigation();
  return (
    <TouchableOpacity onPress={()=>Navigation.push("AddTopic")} style={styles.container}>
      <Icon size={40} name="md-add" color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 75,
    width: 75,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#63c5da",
    borderRadius: 100,
    elevation: 20,
  },
});

export default AddTopic;
