import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

//get Dimensions
const _Height = Math.floor(Dimensions.get("window").height);
const _Width = Math.floor(Dimensions.get("window").width);

const Topic = (props) => {
  const Navigate = useNavigation(); //will be use for navigation
  const loadTopic = () => {
    Navigate.push("Topic", { name: props.topicName, tid: props.tid });
  };
  return (
    <TouchableOpacity onPress={loadTopic} style={styles.container}>
      <View style={styles.imageArea}>
        <View style={styles.subjectArea}>
          <Text style={styles.subjectTitle}>{props.subject}</Text>
        </View>
        <Image
          style={styles.image}
          source={{
            uri:
              "https://png.pngtree.com/thumb_back/fw800/back_our/20190622/ourmid/pngtree-blue-landscape-sky-view-background-image_208276.jpg",
          }}
        />
      </View>
      <View style={styles.title}>
        <Text style={styles.titleText}>{props.topicName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1/2,
    height: _Height / 3.5,
    backgroundColor: "white",
    margin: 8,
    borderRadius: 10,
    elevation: 7,
    justifyContent: "flex-end",
  },
  subjectArea: {
    padding: 6,
    backgroundColor: "#2f95dc",
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
  },
  subjectTitle: {
    fontFamily: "sans-serif",
    textAlign: "center",
    color: "white",
  },
  title: {
    padding: 6,
    backgroundColor: "#2f95dc",
  },
  titleText: {
    textAlign: "center",
    color: "white",
  },
  imageArea: {
    flex: 1,
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
});

export default Topic;
