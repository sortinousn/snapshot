import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, ImageBackground } from "react-native";
import * as FileSystem from "expo-file-system";
import LottieView from "lottie-react-native";
import UploadList from "../components/UploadList";
import { VISION_API } from "react-native-dotenv";

function NewPostScreen({ route, navigation }) {
  const [uploading, setUploading] = useState(false);
  const [googleResponse, setGoogleResponse] = useState([]);

  //setImage(navigation.getParam("image"));

  const image = navigation.getParam("image");

  useEffect(() => {
    submitToGoogle();
  }, []);

  submitToGoogle = async () => {
    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: "base64",
    });

    try {
      setUploading(true);
      let body = JSON.stringify({
        requests: [
          {
            features: [
              { type: "LABEL_DETECTION", maxResults: 5 },
              // { type: "LANDMARK_DETECTION", maxResults: 5 },
              // { type: "FACE_DETECTION", maxResults: 5 },
              // { type: "LOGO_DETECTION", maxResults: 5 },
              // { type: "TEXT_DETECTION", maxResults: 5 },
              //{ type: "DOCUMENT_TEXT_DETECTION", maxResults: 5 },
              // { type: "SAFE_SEARCH_DETECTION", maxResults: 5 },
              // { type: "IMAGE_PROPERTIES", maxResults: 5 },
              // { type: "CROP_HINTS", maxResults: 5 },
              // { type: "WEB_DETECTION", maxResults: 5 },
            ],
            image: {
              content: base64,
            },
          },
        ],
      });
      let response = await fetch(
        "https://vision.googleapis.com/v1/images:annotate?key=" + VISION_API,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: body,
        }
      );
      let responseJson = await response.json();
      setTimeout(() => {
        setUploading(false);
      }, 3500);
      // console.log(responseJson.responses[0].labelAnnotations);

      setGoogleResponse(responseJson);
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/gradientbg.jpg")}
      style={styles.backgroundImage}
    >
      <ScrollView style={styles.container}>
        {googleResponse.length <= 0 ? (
          <LottieView
            source={require("../assets/uploadscreenanimation.json")}
            autoPlay
            loop
          />
        ) : (
          <UploadList image={image} googleResponse={googleResponse} />
        )}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default NewPostScreen;
