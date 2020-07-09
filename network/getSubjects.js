import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import Net from "./Net";

const getSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const getSubject = async () => {
    try {
      const uid = await AsyncStorage.getItem("uid");
      const auth = await AsyncStorage.getItem("auth");
      const data = await Net.get("/api/subject.php", {
        params: {
          uid,
          auth,
        },
      });
      console.log(uid + " " + auth);
      if (data.data != "No Rows") {
        setSubjects(data.data);
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    getSubject();
  }, []);
  return subjects;
};

export default getSubjects;
