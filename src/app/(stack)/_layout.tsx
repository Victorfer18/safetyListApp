import { Stack } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { getJWT } from 'services/api';

const handleLogin = () => {
  Alert.alert(
    "Está de saída?",
    "Confirme a sua saída do sistema.",
    [
      {
        text: "Não",
        onPress: () => { }, style: "cancel"
      },
      {
        text: "Sim", onPress: async () => {
          await AsyncStorage.removeItem('userToken');
          router.push({ pathname: '/(stack)/login' });
        }
      }
    ],
    { cancelable: false }
  );
};

const HeaderTitle = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [clientID, setClientID] = useState(0);
  useEffect(() => {
    ; (async _ => {
      let jwt = await getJWT()
      setClientID(jwt.client_id)
    })()
  }, [])

  return (
    <>
      <View
        style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <View style={{ width: "33%" }} >
          <Image
            source={require('assets/images/logo/safety-list.png')}
            style={{ height: 32, width: '100%', resizeMode: "contain" }}
          />
        </View>
        <View style={{ width: "33%" }} >
          <Image
            source={{ uri: 'https://safetylist.safety2u.com.br/public/clients/getLogoInspectable/' + clientID }}
            style={{ height: 32, width: '100%', resizeMode: "contain" }}
          />
        </View>
        <View style={{ flex: 0, width: '33%', height: 32 }}>
          <TouchableOpacity
            onPress={handleLogin}
          >
            <MaterialCommunityIcons name="logout" size={32} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </>
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
      <Stack.Screen name='setores/index' options={{ headerShown: true, headerBackTitleVisible: false, headerTitle: () => <HeaderTitle /> }} />
      <Stack.Screen name='unidades/index' options={{ headerShown: true, headerBackTitleVisible: false, headerTitle: () => <HeaderTitle /> }} />
      <Stack.Screen name='tarefas/index' options={{ headerShown: true, headerBackTitleVisible: false, headerTitle: () => <HeaderTitle /> }} />
      <Stack.Screen name='tarefa/index' options={{ headerShown: true, headerBackTitleVisible: false, headerTitle: () => <HeaderTitle /> }} />
    </Stack>
  )
}

