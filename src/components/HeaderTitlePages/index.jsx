import React from "react";
import { View, Text, StyleSheet } from "react-native";

const HeaderTitlePages = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    height: 80,
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    textTransform: "uppercase",
    color: "#ffffff",
  },
});
export default HeaderTitlePages;
