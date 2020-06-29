import React from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";

function UploadList(props) {
  return (
    <View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 20,
        }}
      >
        <Image
          source={{ uri: props.image }}
          style={{
            //resizeMode: "contain",
            height: 250,
            width: 500,
            aspectRatio: 1,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
            overflow: "hidden",
          }}
        />
      </View>

      <FlatList
        data={props.googleResponse.responses[0].labelAnnotations}
        style={{ flex: 1 }}
        renderItem={({ item }) => {
          return (
            <View style={styles.listItem}>
              <Text style={{ fontWeight: "bold", color: "white" }}>
                {item.description + "  "}
              </Text>
              <Text style={{ fontWeight: "bold", color: "white" }}>
                {Math.round(item.score * 100) + "%"}
              </Text>
            </View>
          );
        }}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },

  listItem: {
    margin: 10,
    padding: 10,
    backgroundColor: "#2356a8",
    width: "80%",
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5,
    height: 60,
  },
});

export default UploadList;
