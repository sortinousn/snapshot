import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Button, CheckBox } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import FormInputWhite from "../components/FormInputWhite";
import FormButton from "../components/FormButton";
import ErrorMessage from "../components/ErrorMessage";
import firebase from "../config/Firebase/firebaseConfig";
import { HideWithKeyboard } from "react-native-hide-with-keyboard";
import AppLogo from "../components/AppLogo";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .label("Name")
    .required()
    .min(2, "Must have at least 2 characters"),
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter a registered email"),
  password: Yup.string()
    .label("Password")
    .required()
    .min(6, "Password should be at least 6 characters "),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Confirm Password must matched Password")
    .required("Confirm Password is required"),
  check: Yup.boolean().oneOf([true], "Please check the agreement"),
});

function Signup({ navigation }) {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [passwordIcon, setPasswordIcon] = useState("ios-eye");
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState("ios-eye");
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(
    true
  );

  function goToLogin() {
    return navigation.navigate("Login");
  }

  function handlePasswordVisibility() {
    if (passwordIcon === "ios-eye") {
      setPasswordIcon("ios-eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (passwordIcon === "ios-eye-off") {
      setPasswordIcon("ios-eye");
      setPasswordVisibility(!passwordVisibility);
    }
  }

  function handleConfirmPasswordVisibility() {
    if (confirmPasswordIcon === "ios-eye") {
      setConfirmPasswordIcon("ios-eye-off");
      setConfirmPasswordVisibility(!confirmPasswordVisibility);
    } else if (confirmPasswordIcon === "ios-eye-off") {
      setConfirmPasswordIcon("ios-eye");
      setConfirmPasswordVisibility(!confirmPasswordVisibility);
    }
  }

  async function handleOnSignup(values, actions) {
    const { name, email, password } = values;

    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      if (response.user.uid) {
        const { uid } = response.user;
        const userData = { email, name, uid };
        await firebase
          .firestore()
          .collection("users")
          .doc(userData.uid)
          .set(userData);
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
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <AppLogo />
        </View>

        <HideWithKeyboard style={styles.logoContainer}></HideWithKeyboard>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(values, actions) => {
            handleOnSignup(values, actions);
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
            setFieldValue,
          }) => (
            <>
              <FormInputWhite
                name="name"
                value={values.name}
                onChangeText={handleChange("name")}
                placeholder="Enter your full name"
                iconName="md-person"
                iconColor="white"
                onBlur={handleBlur("name")}
              />
              <ErrorMessage errorValue={touched.name && errors.name} />
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
                iconName="ios-lock"
                iconColor="white"
                onBlur={handleBlur("password")}
                secureTextEntry={passwordVisibility}
                rightIcon={
                  <TouchableOpacity onPress={handlePasswordVisibility}>
                    <Ionicons name={passwordIcon} size={28} color="grey" />
                  </TouchableOpacity>
                }
              />
              <ErrorMessage errorValue={touched.password && errors.password} />
              <FormInputWhite
                name="password"
                value={values.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                placeholder="Confirm password"
                iconName="ios-lock"
                iconColor="white"
                onBlur={handleBlur("confirmPassword")}
                secureTextEntry={confirmPasswordVisibility}
                rightIcon={
                  <TouchableOpacity onPress={handleConfirmPasswordVisibility}>
                    <Ionicons
                      name={confirmPasswordIcon}
                      size={28}
                      color="grey"
                    />
                  </TouchableOpacity>
                }
              />
              <ErrorMessage
                errorValue={touched.confirmPassword && errors.confirmPassword}
              />
              <View style={styles.buttonContainer}>
                <FormButton
                  buttonType="solid"
                  onPress={handleSubmit}
                  title="SIGNUP"
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
          title="Have an account? Login"
          onPress={goToLogin}
          titleStyle={{
            color: "blue",
          }}
          type="clear"
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  logoContainer: {
    marginBottom: 15,
    alignItems: "center",
  },
  buttonContainer: {
    margin: 25,
  },
});

export default Signup;
