import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const TopicSmall = (props) => {
  const Navigate = useNavigation(); //will be use for navigation
  const loadTopic = () => {
    Navigate.push("Topic", { name: props.topicName,tid: props.tid });
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={loadTopic}
      style={styles.container}
    >
      <Text style={[styles.title, { fontSize: 18 }]}>{props.topicName}</Text>
      <Text
        style={[styles.title, { backgroundColor: "#63c5da", color: "white" }]}
      >
        {props.subject}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    flexDirection: "row",
    elevation: 3,
    borderRadius: 10,
    margin: 5,
  },
  title: {
    flex: 1,
    padding: 10,
    height: "100%",
    width: "100%",
    textAlign: "center",
    fontSize: 25,
    borderRadius: 10,
  },
});

export default TopicSmall;
