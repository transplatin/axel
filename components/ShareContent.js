import React from "react";
import { Share, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "./Icon";

const ShareContent = (props) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Have a problem of easily forgetting what you learn ?
Try Axel and remember it forever. Join today. It's free!!

https://play.google.com/store/apps/details?id=co.ukonnect.axel`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(" Result Shared Activity type");
        } else {
          console.log(" Shared ");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log(" Share Dismissed");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <TouchableOpacity onPress={onShare} style={styles.container}>
      <Icon name="md-share" size={30} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});

export default ShareContent;
