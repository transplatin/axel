import React, { useState, useEffect } from "react";
import Net from "./Net";
import AsyncStorage from "@react-native-community/async-storage";

const getUpdate = () => {
  const [update, setUpdate] = useState("");

  const getTopicToday = async () => {
    const vid = 3;
    try {
      const data = await Net.get("/api/Update.php", {
        params: {
          vid,
        },
      });
      if (data.data == "Available") {
        setUpdate(data.data);
      } else {
        setUpdate("No Update");
      }
    } catch (e) {
      console.log("topic today" + e.message);
    }
  };
  useEffect(() => {
    getTopicToday();
  }, []);
  return update;
};

export default getUpdate;
