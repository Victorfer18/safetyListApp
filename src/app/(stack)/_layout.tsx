import { Stack } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Image, View, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const handleLogin = () => {
  Alert.alert(
    "Está de saída?",
    "Confirme a sua saída do sistema.",
    [
      {
        text: "Não",
        onPress: () => console.log("Cancelado"),
        style: "cancel"
      },
      {
        text: "Sim", onPress: async () => {
          await AsyncStorage.removeItem('userToken');
          router.replace({ pathname: '/(stack)/login' });
        }
      }
    ],
    { cancelable: false }
  );
};

const HeaderTitle = () => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
      <Image
        source={require('assets/images/logo/safety-list.png')}
        style={{
          flex: 1, height: 32, width: '30%', resizeMode: "contain",

        }}
      />
      <Image
        source={{ uri: 'https://safetylist.safety2u.com.br/public/clients/getLogoInspectable/7' }}
        style={{ flex: 1, height: 32, width: '30%', resizeMode: "contain" }}
      />
      <View style={{ flex: 0, width: 32, height: 32, marginRight: 16 }}>
        <TouchableOpacity
          onPress={handleLogin}
        >
          <MaterialCommunityIcons name="logout" size={32} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pressedButton: {
    opacity: 0.5,
  },
});

export default () => {
  return (
    <Stack>
      <Stack.Screen name='login/index' options={{ headerShown: false }} />
      <Stack.Screen name='inspections/[id]'
        options={{ headerShown: true, headerBackTitleVisible: false, headerTitle: () => <HeaderTitle /> }} />
      <Stack.Screen name='unidades/index' options={{ headerShown: true, headerBackTitleVisible: false, headerTitle: () => <HeaderTitle /> }} />
      <Stack.Screen name='tarefas/index' options={{ headerShown: true, headerBackTitleVisible: false, headerTitle: () => <HeaderTitle /> }} />
      <Stack.Screen name='tarefa/index' options={{ headerShown: true, headerBackTitleVisible: false, headerTitle: () => <HeaderTitle /> }} />
      <Stack.Screen name='tarefa/camera' options={{ headerShown: true, headerBackTitleVisible: false, headerTitle: () => <HeaderTitle /> }} />
    </Stack>
  )
}

