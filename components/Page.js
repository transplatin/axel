import React from "react";
import { View, StyleSheet, Text, Image, Button } from "react-native";

const Page = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: props.url,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    backgroundColor: "white",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 3,
  },
  bottomWrapper: {
    height: "10%",
    alignItems: "center",
  },
  bottomText: {
    textAlign: "center",
  },
  image: {
    height: "90%",
    width: "100%",
    resizeMode: "cover",
  },
});

export default Page;
