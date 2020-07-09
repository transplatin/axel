import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import ViewPager from "@react-native-community/viewpager";
import Page from "../components/Page";
import getTopicDetails from "../network/getTopicDetails";
import ImageView from "react-native-image-viewing";

const ReadTopic = ({navigation,route }) => {
  var topicContent = getTopicDetails(route.params.tid);
  const [visible, setIsVisible] = useState(true);
  console.log(topicContent);
  const renderItem = () => {
    let items = [];
    for (const [index, value] of topicContent.entries()) {
      items.push({ uri: value.image, key: index });
    }
    return (
      <ImageView
        images={items}
        style={styles.container}
        imageIndex={0}
        visible={visible}
        onRequestClose={() =>{
          setIsVisible(false);
          navigation.pop();
        } }
        presentationStyle="overFullScreen"
        FooterComponent={({imageIndex})=>(
          <View style={{alignItems: "center",marginBottom: 5}}>
            <Text style={{color: "#2f95dc",fontSize: 25,}}>{imageIndex+1}/{items.length}</Text>
          </View>
        )}
      />
    );
  };
  return <View style={styles.viewPager}>{renderItem()}</View>;
};
const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
    padding: 10,
  },
  container: {
    flex: 1,
  },
});

export default ReadTopic;
