import React, { useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Header from "../components/Header";
import Net from "../network/Net";
import Subject from "../components/Subject";

const AddSubject = (props) => {
  const [addSubject, setAddSubject] = useState("");
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [course, setCourse] = useState("");
  const [subject, setSubject] = useState([]);
  const addSub = () => {
    setSubject([...subject, addSubject]);
    setAddSubject("");
  };
  const add = async () => {
    try {
      const uid = await AsyncStorage.getItem("uid");
      const auth = await AsyncStorage.getItem("auth");
      const params = new FormData();
      params.append("uid", uid);
      params.append("auth", auth);
      params.append("name", name);
      params.append("college", college);
      params.append("course", course);
      subject.forEach((item) => {
        params.append("subject[]", item);
      });
      const itpostdata = await Net({
        method: "post",
        url: "/api/add.php",
        data: params,
      });
      console.log(itpostdata.data);
      props.navigation.state.params.callback(state.name);
      props.navigation.goBack();
    } catch (e) {
      console.log(e.message);
    }
  };
  const remove = (id) => {
    setSubject(
      subject.filter((e) => {
        return e != id;
      })
    );
  };
  const verify = () => {
    if (name.length < 1) {
      alert("Please fill your name");
      return false;
    } else if (college.length < 1) {
      alert("Please fill your college");
      return false;
    } else if (course.length < 1) {
      alert("Please fill your course");
      return false;
    } else if (subject.length < 1) {
      alert("Please add your subjects");
      return false;
    }
    return true;
  };
  var items = [];
  for (const value of subject) {
    items.push(<Subject subject={value} key={value} remove={remove} />);
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        source={{
          uri:
            "https://png.pngtree.com/thumb_back/fw800/back_our/20190622/ourmid/pngtree-blue-landscape-sky-view-background-image_208276.jpg",
        }}
      >
        <View style={styles.mobileNo}>
          <View style={styles.header}>
            <Header header="Get Started" />
          </View>
          <View style={styles.input}>
            <TextInput
              onChangeText={(e) => setName(e)}
              value={name}
              style={styles.inputText}
              placeholder="Name"
            />
            <TextInput
              onChangeText={(e) => setCollege(e)}
              value={college}
              style={styles.inputText}
              placeholder="College"
            />
            <TextInput
              onChangeText={(e) => setCourse(e)}
              value={course}
              style={styles.inputText}
              placeholder="Course"
            />
            <View style={styles.addSubject}>
              <TextInput
                onChangeText={(e) => setAddSubject(e)}
                value={addSubject}
                onEndEditing={addSub}
                style={[styles.inputText, { flex: 4 }]}
                placeholder="Add Subjects"
              />
              <TouchableOpacity onPress={addSub} style={{ flex: 1 }}>
                <Text style={styles.addFont}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.subjects}>{items}</View>
          <TouchableOpacity
            onPress={() => {
              if (verify) {
                add();
              }
            }}
            style={styles.buttonSubmit}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  mobileNo: {
    height: "80%",
    width: "80%",
    backgroundColor: "#63c5da",
    borderRadius: 20,
    elevation: 200,
    justifyContent: "space-evenly",
  },
  header: {
    alignItems: "center",
  },
  subjects: {
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    backgroundColor: "white",
    alignItems: "center",
    marginVertical: 50,
    elevation: 10,
  },
  inputText: {
    fontSize: 25,
    padding: 10,
    textAlign: "center",
    color: "#003343",
  },
  buttonSubmit: {
    alignItems: "center",
    backgroundColor: "#fff",
    width: "50%",
    alignSelf: "center",
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonText: {
    justifyContent: "center",
    padding: 20,
    fontSize: 20,
  },
  addSubject: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addFont: {
    flex: 1,
    fontSize: 40,
    color: "white",
    height: "100%",
    width: "100%",
    textAlign: "center",
    backgroundColor: "blue",
  },
});

export default AddSubject;
