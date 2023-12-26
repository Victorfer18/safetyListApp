import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const styleHeaderInspectionName = StyleSheet.create({
  box: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: 8,
  },
  text: {
    color: "#ccc",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
  },
});

export function setInspectionName(name: string) {
  AsyncStorage.setItem("CurrentNamePage", name)
    .catch(error => console.error("Erro ao atualizar o nome da Inspeção", error));
}

export default function CurrentInspection() {
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchInspectionName = async () => {
      try {
        const inspectionName = await AsyncStorage.getItem("CurrentNamePage");
        if (inspectionName) {
          setName(inspectionName);
        }
      } catch (error) {
        console.error("Erro ao buscar o nome da Inspeção", error);
      }
    };

    fetchInspectionName();
  }, []);

  return (
    <View style={styleHeaderInspectionName.box}>
      <Text style={styleHeaderInspectionName.text}>{name}</Text>
    </View>
  );
}
