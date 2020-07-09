import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Topic from "../components/Topic";
import AddTopic from "../components/AddTopic";
import AsyncStorage from "@react-native-community/async-storage";
import Net from "../network/Net";
const HomeScreen = ({ navigation }) => {
  const [topic, setTopic] = useState([
    { topic_name: "How to use ?", tid: "1", sub_name: "Get Started" },
  ]);
  const getTopics = async () => {
    try {
      const uid = await AsyncStorage.getItem("uid");
      const auth = await AsyncStorage.getItem("auth");
      const data = await Net.get("/api/gettopic.php", {
        params: {
          uid,
          auth,
        },
      });
      console.log(uid + " " + auth);
      if (data.data != "No Rows") {
        console.log(data.data);
        setTopic(data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getTopics();
      console.log("run");
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        contentContainerStyle={{ width: "100%" }}
        data={topic}
        keyExtractor={(topic) => topic.tid}
        renderItem={({ item }) => {
          return (
            <Topic
              subject={item.sub_name}
              topicName={item.topic_name}
              tid={item.tid}
            />
          );
        }}
      />
      <View style={styles.add}>
        <AddTopic />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  add: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    margin: 10,
  },
});

export default HomeScreen;
