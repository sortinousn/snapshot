import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import RBSheet from "react-native-raw-bottom-sheet";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import firebase from "../config/Firebase/firebaseConfig";
import { TextInput } from "react-native-gesture-handler";
import { object } from "yup";
import { createPointerEventsContainer } from "react-navigation-stack";
import LottieView from "lottie-react-native";

function Home({ route, navigation }) {
  const refRBSheet = useRef();

  async function handleSignout() {
    try {
      await firebase.auth().signOut();
      navigation.navigate("Auth");
    } catch (error) {
      console.log(error);
    }
  }

  const Test = (posts) => (
    <>
      {posts.map((Object) => (
        <Text>{Object.species}</Text>
      ))}
    </>
  );

  const getPermission = async (permission) => {
    let { status } = await Permissions.askAsync(permission);
    if (status !== "granted") {
      Linking.openURL("app-settings:");
      return false;
    }
    return true;
  };

  const selectPhoto = async () => {
    const status = await getPermission(Permissions.CAMERA_ROLL);
    if (status) {
      const result = await ImagePicker.launchImageLibraryAsync({
        base64: true,
      });
      if (!result.cancelled) {
        refRBSheet.current.close();
        navigation.navigate("NewPost", { image: result.uri });
      }
    }
  };

  const takePhoto = async () => {
    const status = await getPermission(Permissions.CAMERA);
    if (status) {
      const result = await ImagePicker.launchCameraAsync({
        base64: true,
      });
      if (!result.cancelled) {
        refRBSheet.current.close();

        navigation.navigate("NewPost", { image: result.uri });
        //console.log(result.uri);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", flex: 1 }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
            paddingTop: 15,
            textAlign: "center",
          }}
        >
          Take A Snap Shot of an Object to Get Started!
        </Text>
      </View>

      <LottieView
        source={require("../assets/homeanimation.json")}
        autoPlay
        loop
      />

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={200}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
        }}
      >
        <TouchableOpacity onPress={takePhoto}>
          <View
            style={{
              paddingVertical: 15,
              paddingHorizontal: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Icon reverse name="ios-aperture" type="ionicon" color="#517fa4" />
            <Text>Take a Photo</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={selectPhoto}>
          <View
            style={{
              paddingVertical: 15,
              paddingHorizontal: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Icon reverse name="picture" type="antdesign" color="#517fa4" />
            <Text>Choose Image from Gallery</Text>
          </View>
        </TouchableOpacity>
      </RBSheet>
      <View style={styles.opacityView}>
        <TouchableOpacity
          onPress={() => refRBSheet.current.open()}
          raised
          title="Snapshot It!"
          style={styles.buttonStyle}
          //buttonStyle={{ height: 50 }}
        >
          <Text style={styles.textStyle}> SnapShot It! </Text>
        </TouchableOpacity>
      </View>
      <Button
        title="Signout"
        onPress={handleSignout}
        titleStyle={{
          color: "#F57C00",
        }}
        type="clear"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#fff",
    // alignItems: "center",
  },

  buttonStyle: {
    width: "75%",
    height: "25%",
    backgroundColor: "red",
    color: "white",
    //alignSelf: "center",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  opacityView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    //paddingTop: ,
  },

  textStyle: {
    color: "white",
  },
});

export default Home;
