import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import { HideWithKeyboard } from "react-native-hide-with-keyboard";
import FormInputWhite from "../components/FormInputWhite";
import FormButton from "../components/FormButton";
import ErrorMessage from "../components/ErrorMessage";
import AppLogo from "../components/AppLogo";
import db from "../config/Firebase/firebaseConfig";
import { SimpleAnimation } from "react-native-simple-animations";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter a registered email"),
  password: Yup.string()
    .label("Password")
    .required()
    .min(6, "Password must have at least 6 characters "),
});

function Login({ navigation }) {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("ios-eye");

  function goToSignup() {
    return navigation.navigate("Signup");
  }

  function goToForgotPassword() {
    return navigation.navigate("ForgotPassword");
  }

  function handlePasswordVisibility() {
    if (rightIcon === "ios-eye") {
      setRightIcon("ios-eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "ios-eye-off") {
      setRightIcon("ios-eye");
      setPasswordVisibility(!passwordVisibility);
    }
  }

  async function handleOnLogin(values, actions) {
    const { email, password } = values;

    try {
      const response = await db
        .auth()
        .signInWithEmailAndPassword(email, password);

      if (response.user) {
        navigation.navigate("App");
      }
    } catch (error) {
      actions.setFieldError("general", error.message);
    } finally {
      actions.setSubmitting(false);
    }
  }

  return (
    <ImageBackground
      source={require("../assets/gradientbg2.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <SimpleAnimation delay={500} duration={1000} fade staticType="zoom">
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <AppLogo />
          </View>
        </SimpleAnimation>

        <SimpleAnimation
          delay={1200}
          duration={1000}
          movementType="slide"
          fade
          staticType="zoom"
        >
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, actions) => {
              handleOnLogin(values, actions);
            }}
            validationSchema={validationSchema}
          >
            {({
              handleChange,
              values,
              handleSubmit,
              errors,
              isValid,
              touched,
              handleBlur,
              isSubmitting,
            }) => (
              <>
                <FormInputWhite
                  name="email"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  placeholder="Enter email"
                  autoCapitalize="none"
                  iconName="ios-mail"
                  iconColor="white"
                  onBlur={handleBlur("email")}
                />
                <ErrorMessage errorValue={touched.email && errors.email} />
                <FormInputWhite
                  name="password"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  placeholder="Enter password"
                  secureTextEntry={passwordVisibility}
                  iconName="ios-lock"
                  iconColor="white"
                  onBlur={handleBlur("password")}
                  rightIcon={
                    <TouchableOpacity onPress={handlePasswordVisibility}>
                      <Ionicons name={rightIcon} size={28} color="white" />
                    </TouchableOpacity>
                  }
                />
                <ErrorMessage
                  errorValue={touched.password && errors.password}
                />
                <View style={styles.buttonContainer}>
                  <FormButton
                    buttonType="solid"
                    onPress={handleSubmit}
                    title="LOGIN"
                    buttonColor="white"
                    disabled={!isValid || isSubmitting}
                    loading={isSubmitting}
                  />
                </View>
                <ErrorMessage errorValue={errors.general} />
              </>
            )}
          </Formik>
          <Button
            title="Don't have an account? Sign Up"
            onPress={goToSignup}
            titleStyle={{
              color: "blue",
            }}
            type="clear"
          />
          <Button
            title="Forgot Password?"
            onPress={goToForgotPassword}
            titleStyle={{
              color: "blue",
            }}
            type="clear"
          />
        </SimpleAnimation>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: "center",
    //backgroundColor: "rgba( 0, 0, 0, 0.6 )",
  },
  logoContainer: {
    marginBottom: 15,
    alignItems: "center",
  },
  buttonContainer: {
    margin: 25,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default Login;
