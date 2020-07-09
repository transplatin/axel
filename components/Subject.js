import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Subject = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.subjectArea}>
        <Text style={styles.subjectTitle}>{props.subject}</Text>
      </View>
      <TouchableOpacity
        onPress={() => props.remove(props.subject)}
        style={styles.title}
      >
        <Text style={styles.titleText}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "50%",
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  subjectArea: {
    padding: 10,
    alignSelf: "center",
  },
  subjectTitle: {
    textAlign: "center",
    fontSize: 15,
    width: "100%",
  },
  title: {
    position: "absolute",
    top: 0,
    right: 0,
    height: "50%",
    backgroundColor: "red",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    padding: 10,
    textAlign: "center",
    color: "white",
  },
});

export default Subject;
