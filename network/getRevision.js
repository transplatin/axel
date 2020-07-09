import React, { useState, useEffect } from "react";
import Net from "./Net";
import AsyncStorage from "@react-native-community/async-storage";

const getRevisionDate = () => {
  const [topic, setTopic] = useState(null);
  const getTopicToday = async () => {
    try {
      const uid = await AsyncStorage.getItem("uid");
      const auth = await AsyncStorage.getItem("auth");
      const data = await Net.get("/api/getrevisiontoday.php", {
        params: {
          uid,
          auth,
        },
      });
      if (data.data != "No Rows") {
        setTopic(data.data);
      }
    } catch (e) {
      console.log("topic today" + e.message);
    }
  };
  useEffect(() => {
    getTopicToday();
  }, []);
  return topic;
};

export default getRevisionDate;
