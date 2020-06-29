import React from "react";
import { StyleSheet, Text, View } from "react-native";

import LottieView from "lottie-react-native";

function About({ route, navigation }) {
  return (
    <View style={styles.container}>
      <LottieView source={require("../assets/aboutanimation.json")} autoPlay />
      <View
        style={{
          justifyContent: "flex-end",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
            textAlign: "center",
          }}
        >
          Made by Joseph Sortino - Interview Test - June 25th 2020. This app
          uses firebase, Expo and Google Vision for Image Classification
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  textStyle: {
    color: "white",
  },
});

export default About;
