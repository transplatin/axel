import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import ReadTopic from "../screens/ReadTopic";
import AddTopic from "../screens/AddTopic";
import ShareContent from "../components/ShareContent";

const HomeStack = createStackNavigator();

const HomeStackNav = () => {
  console.log("Home stack");

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={getOption("Home")}
      />
      <HomeStack.Screen
        name="Topic"
        component={ReadTopic}
        options={({ route }) => getOption(route.params.name)}
      />
      <HomeStack.Screen
        name="AddTopic"
        component={AddTopic}
        options={getOption("Add Topic")}
      />
    </HomeStack.Navigator>
  );
};

//Settings for header options
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
      fontFamily: "space-mono",
    },
    headerRight: () => <ShareContent />,
  };
};
export default HomeStackNav;
