import React from "react";
import { View, StyleSheet, Text } from "react-native";

const Empty = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    color: "#333333",
    fontSize: 24,
    fontFamily: "space-mono",
  },
});

export default Empty;