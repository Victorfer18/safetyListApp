import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const styleHeaderInspectionName = StyleSheet.create({
  box: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: 16,
  },
  text: {
    color: "#ccc",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export function setInspectionName(name: string) {
  AsyncStorage.removeItem("CurrentNamePage").then(() => {
    AsyncStorage.setItem("CurrentNamePage", name);
  });
}

export default function () {
  const [name, setName] = useState("");

  useEffect(() => {
    (async () => {
      let InspectionName =
        (await AsyncStorage.getItem("CurrentNamePage")) || "";
      setName(InspectionName);
    })();
  }, []);

  return (
    <View style={styleHeaderInspectionName.box}>
      <Text style={styleHeaderInspectionName.text}>{name}</Text>
    </View>
  );
}
