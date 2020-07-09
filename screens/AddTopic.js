import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Picker,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Text,
} from "react-native";
import TopicNail from "../components/TopicNail";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Icon from "../components/Icon";
import Net from "../network/Net";
import AsyncStorage from "@react-native-community/async-storage";

const AddTopic = (props) => {
  const [topicName, setTopicName] = useState("");
  const [subject, setSubject] = useState("");
  const [topicImages, setTopicImages] = useState([]);
  const [isSending, setIsSending] = useState(false);

  //send data
  const create = async () => {
    try {
      const uid = await AsyncStorage.getItem("uid");
      const auth = await AsyncStorage.getItem("auth");
      const params = new FormData();
      params.append("uid", uid);
      params.append("auth", auth);
      params.append("topic", topicName);
      params.append("subject", subject);
      topicImages.forEach((e) => {
        params.append("image[]", {
          uri: e.uri,
          type: `image/${e.uri.split('.').pop()}`,
          name: e.uri,
        });
      });
      const data = await Net({
        method: "post",
        url: "api/addtopic.php",
        data: params,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data.data);
      setIsSending(false);
      props.navigation.pop();
    } catch (e) {
      console.log(e.message);
    } finally {
      setIsSending(false);
    }
  };
  // Check if not empty
  const verifyDetails = () => {
    if (topicName.length < 1) {
      alert("Topic name can't be empty.");
      return false;
    } else if (subject.length < 1 || subject == "Select Subject") {
      alert("Please select your subject.");
      return false;
    } else if (topicImages.length < 1) {
      alert("Please add at least 1 Image.");
      return false;
    }
    return true;
  };
  // Ask for permissions
  const picPer = async () => {
    const response = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    if (response.status !== "granted") {
      alert("Failed to get Permissions");
    }
    return true;
  };
  //SelectPic After Permission Granted
  const getPic = async () => {
    const result = await picPer();
    if (result) {
      try {
        let camera = await ImagePicker.launchCameraAsync();
        if (!camera.cancelled) {
          console.log(camera);
          setTopicImages([...topicImages, camera]);
        }
      } catch (e) {
        alert("No Image Selected.");
      }
    }
  };
  const getPicGallery = async () => {
    const result = await picPer();
    if (result) {
      try {
        let camera = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          quality: 1,
          exif: true,
          allowsMultipleSelection: true
        });
        if (!camera.cancelled) {
          console.log(camera);
          setTopicImages([...topicImages, camera]);
        }
      } catch (e) {
        alert("No Image Selected.");
      }
    }
  };
  //remove Pic
  const removePic = (e) => {
    setTopicImages(
      topicImages.filter((item) => {
        return item.uri != e;
      })
    );
  };
  return (
    <View style={styles.container}>
      <Modal
        visible={isSending}
        animationType="slide"
        style={{
          flex: 1,
          height: 100,
          width: 100,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={[styles.container, { alignItems: "flex-start" }]} />
        <Text
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: 50,
            width: "100%",
            fontFamily: "space-mono",
          }}
        >
          Please wait while we create your topic...
        </Text>
      </Modal>
      <View style={styles.inputTopicName}>
        <TextInput
          style={styles.input}
          value={topicName}
          onChangeText={(e) => setTopicName(e)}
          placeholder="Topic Name"
        />
        <TextInput
          style={styles.input}
          value={subject}
          onChangeText={(e) => setSubject(e)}
          placeholder="Subject Name"
        />
      </View>
      <View style={styles.imagesContainer}>
        <FlatList
          numColumns={2}
          contentContainerStyle={{ width: "100%" }}
          data={topicImages}
          keyExtractor={(image) => image.uri}
          renderItem={({ item }) => {
            return <TopicNail removePic={removePic} url={item.uri} />;
          }}
        />
      </View>
      <View style={[styles.buttonGrpCnt, { right: 0 }]}>
        <TouchableOpacity
          style={styles.buttonGroup}
          onPress={() => getPicGallery()}
        >
          <Icon name="md-photos" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonGroup} onPress={() => getPic()}>
          <Icon name="ios-camera" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => {
          if (verifyDetails()) {
            setIsSending(true);
            create();
          }
        }}
        style={[styles.addImage, { left: 0 }]}
      >
        <Icon name="md-save" size={50} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputTopicName: {
    backgroundColor: "white",
    alignSelf: "center",
    width: "100%",
    flexDirection: "row",
    elevation: 5,
  },
  input: {
    flex: 1,
    width: "100%",
    textAlign: "center",
    padding: 10,
    fontSize: 20,
  },
  imagesContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  addImage: {
    position: "absolute",
    bottom: 0,
    margin: 10,
    height: 75,
    width: 75,
    elevation: 10,
    backgroundColor: "#63c5da",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonGrpCnt: {
    position: "absolute",
    bottom: 0,
    marginHorizontal: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonGroup: {
    alignItems: "center",
    backgroundColor: "#63c5da",
    width: "100%",
    padding: 12,
    margin: 3,
    elevation: 8,
    borderRadius: 100,
  },
});

export default AddTopic;
