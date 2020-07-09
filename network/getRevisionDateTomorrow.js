import React, { useState, useEffect } from "react";
import Net from "./Net";
import AsyncStorage from "@react-native-community/async-storage";

const getRevisionDateTomorrow = () => {
  const [topic, setTopic] = useState(null);
  const getTopicTomorrow = async () => {
    try {
      const uid = await AsyncStorage.getItem("uid");
      const auth = await AsyncStorage.getItem("auth");
      const data = await Net.get("/api/getrevisiontomorrow.php", {
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
    getTopicTomorrow();
  }, []);
  return topic;
};

export default getRevisionDateTomorrow;
