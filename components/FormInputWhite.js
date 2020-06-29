import React from "react";
import { Input } from "react-native-elements";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FormInputWhite = ({
  iconName,
  iconColor,
  returnKeyType,
  keyboardType,
  name,
  placeholder,
  ...rest
}) => (
  <View style={styles.inputContainer}>
    <Input
      {...rest}
      leftIcon={<Ionicons name={iconName} size={28} color={iconColor} />}
      leftIconContainerStyle={styles.iconStyle}
      placeholderTextColor="white"
      name={name}
      placeholder={placeholder}
      style={styles.input}
      inputStyle={{ color: "white" }}
    />
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    margin: 15,
  },
  iconStyle: {
    marginRight: 10,
  },
  input: {
    color: "white",
  },
});

export default FormInputWhite;
