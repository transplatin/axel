import React from "react";
import { View, StyleSheet, Text } from "react-native";

const Header = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{props.header}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    padding: 10,
    elevation: 10,
  },
  header:{
      fontSize: 22,
      fontFamily: "space-mono"
  }
});

export default Header;
