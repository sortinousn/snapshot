import React, { useState, useEffect } from "react";
import { AppLoading } from "expo";
import firebase from "../config/Firebase/firebaseConfig";

function Initial({ navigation }) {
  const [isAssetsLoadingComplete, setIsAssetsLoadingComplete] = useState(false);

  useEffect(() => {
    try {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          navigation.navigate("App");
        } else {
          navigation.navigate("Auth");
        }
      });
    } catch (error) {
      //console.log(error);
    }
  }, []);

  function handleLoadingError(error) {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  }

  function handleFinishLoading() {
    setIsAssetsLoadingComplete(true);
  }

  return (
    <AppLoading onFinish={handleFinishLoading} onError={handleLoadingError} />
  );
}

export default Initial;
