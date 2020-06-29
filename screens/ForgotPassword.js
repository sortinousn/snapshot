import React from "react";
import { Text, SafeAreaView, View, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import ErrorMessage from "../components/ErrorMessage";
import firebase from "../config/Firebase/firebaseConfig";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter a registered email")
});

function ForgotPassword({ navigation }) {
  async function handlePasswordReset(values, actions) {
    const { email } = values;

    try {
      await firebase.auth().sendPasswordResetEmail(email);
      console.log("Password reset email sent successfully");
      navigation.navigate("Login");
    } catch (error) {
      actions.setFieldError("general", error.message);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Forgot Password?</Text>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={(values, actions) => {
          handlePasswordReset(values, actions);
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
          isSubmitting
        }) => (
          <>
            <FormInput
              name="email"
              value={values.email}
              onChangeText={handleChange("email")}
              placeholder="Enter email"
              autoCapitalize="none"
              iconName="ios-mail"
              iconColor="#2C384A"
              onBlur={handleBlur("email")}
            />
            <ErrorMessage errorValue={touched.email && errors.email} />
            <View style={styles.buttonContainer}>
              <FormButton
                buttonType="outline"
                onPress={handleSubmit}
                title="Send Email"
                buttonColor="#039BE5"
                disabled={!isValid || isSubmitting}
              />
            </View>
            <ErrorMessage errorValue={errors.general} />
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 150
  },
  text: {
    color: "#333",
    fontSize: 24,
    marginLeft: 25
  },
  buttonContainer: {
    margin: 25
  }
});

export default ForgotPassword;
