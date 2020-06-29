import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import NewPostScreen from "../screens/NewPostScreen";
import AboutScreen from "../screens/AboutScreen";
const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
  About: { screen: AboutScreen },
  NewPost: { screen: NewPostScreen },
});

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;

  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const AppNavigation = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,

      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Ionicons style={{ color: tintColor }} name="ios-home" size={25} />
        ),
        tabBarLabel: "Home",
      }),
    },
    About: {
      screen: AboutScreen,

      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Ionicons
            style={{ color: tintColor }}
            name="md-information-circle"
            size={25}
          />
        ),
        tabBarLabel: "About",
      }),
    },
  },
  {
    tabBarOptions: {
      showIcon: true,
      lazy: true,
      inactiveTintColor: "#586589",
      labelStyle: {
        fontSize: 15,
        fontWeight: "bold",
      },
    },
  }
);

export default AppNavigation;
