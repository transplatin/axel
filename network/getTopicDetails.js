import React, { useState, useEffect } from "react";
import Net from "./Net";
import AsyncStorage from "@react-native-community/async-storage";

const getTopicDetail = (tid) => {
  const [topicContent, setTopicContent] = useState([]);
  //getTopicDetails
  const getTopicContent = async () => {
    try {
      const uid= await AsyncStorage.getItem("uid");
      const auth= await AsyncStorage.getItem("auth");
      const  data = await Net.get("/api/gettopicdetails.php", {
        params: {
          uid,
          auth,
          tid,
        },
      });
      if(data.data!="No Rows"){
        setTopicContent(data.data);
      }
    } catch (e) {
      console.log(e.message)
    }
  };
  useEffect(() => {
    getTopicContent();
  }, []);
  return topicContent;
};

export default getTopicDetail;
