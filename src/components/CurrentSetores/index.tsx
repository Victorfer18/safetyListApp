import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const styleHeaderSetoresName = StyleSheet.create({
  box: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: 8,
  },
  text: {
    color: "#ccc",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export function setSetoresName(name: string) {
  AsyncStorage.setItem("CurrentSetoresPage", name)
    .catch(error => console.error("Erro ao atualizar o nome do setor", error));
}

export default function CurrentSetores() {
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchSetoresName = async () => {
      try {
        const setoresName = await AsyncStorage.getItem("CurrentSetoresPage");
        if (setoresName) {
          setName(setoresName);
        }
      } catch (error) {
        console.error("Erro ao buscar o nome do setor", error);
      }
    };

    fetchSetoresName();
  }, []);

  return (
    <View style={styleHeaderSetoresName.box}>
      <Text style={styleHeaderSetoresName.text}>{name}</Text>
    </View>
  );
}