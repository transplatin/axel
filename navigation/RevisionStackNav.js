import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RevisionScreen from "../screens/RevisionScreen";
import ReadTopic from "../screens/ReadTopic";
import ShareContent from "../components/ShareContent";

const RevisionStack = createStackNavigator();

const RevisionStackNav = () => {
  return (
    <RevisionStack.Navigator>
      <RevisionStack.Screen
        name="Revision"
        component={RevisionScreen}
        options={getOption("Revision")}
      />
      <RevisionStack.Screen
        name="Topic"
        component={ReadTopic}
        options={({ route }) => getOption(route.params.name)}
      />
    </RevisionStack.Navigator>
  );
};

//setting for header options
const getOption = (name) => {
  return {
    title: name,
    headerStyle: {
      backgroundColor: "#2f95dc",
    },
    animationEnabled: false,
    headerTitleAlign: "center",
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
    },
    headerRight: ()=>(
      <ShareContent />
    )
  };
};
export default RevisionStackNav;
