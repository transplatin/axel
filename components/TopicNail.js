import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "../components/Icon";

const _Height = Math.floor(Dimensions.get("window").height);
const _Width = Math.floor(Dimensions.get("window").width);

const TopicNail = (props) => {
  console.log(props.url);
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: props.url,
        }}
      />
      <TouchableOpacity onPress={()=>props.removePic(props.url)} style={styles.delete}>
        <Icon color="white" size={30} name="ios-close" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1/2,
    margin: 5,
    height: _Height / 3.5,
    elevation: 5,
    marginVertical: 5,
  },
  image: {
    height: "100%",
    width: "100%",
    borderWidth: 2,
    borderColor: "white",
    resizeMode: "stretch",
  },
  delete: {
    position: "absolute",
    right: 0,
    top: 0,
    height: 35,
    width: 35,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 10,
  },
});

export default TopicNail;
