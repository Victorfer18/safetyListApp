import { Stack } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Image, View } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';

const handleLogin = async () => {
  await AsyncStorage.removeItem('userToken');
  router.replace({ pathname: '/(stack)/login' });
};

const HeaderTitle = () => {
  return (
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
      <Image
        source={require('assets/images/logo/safety-list.png')}
        style={{ flex: 1, height: 32, width: '30%', objectFit: "contain" }}
      />
      <Image
        source={{ uri: 'https://safetylist.safety2u.com.br/public/clients/getLogoInspectable/7' }}
        style={{ flex: 1, height: 32, width: '30%', objectFit: "contain" }}
      />
      <View style={{ flex: 1, width: 32, height: 32 }}>
        <TouchableOpacity onLongPress={handleLogin}>
          <AntDesign name="logout" size={32} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default () => {
  return (
    <Stack>
      <Stack.Screen name='login/index' options={{ headerShown: false }} />
      <Stack.Screen name='inspections/[id]' options={{ headerShown: true, headerBackTitleVisible: false, headerTitle: () => <HeaderTitle /> }} />
      <Stack.Screen name='unidades/index' options={{ headerShown: true, headerBackTitleVisible: false, headerTitle: () => <HeaderTitle /> }} />
      <Stack.Screen name='tarefas/index' options={{ headerShown: true, headerBackTitleVisible: false, headerTitle: () => <HeaderTitle /> }} />
      <Stack.Screen name='tarefa/index' options={{ headerShown: true, headerBackTitleVisible: false, headerTitle: () => <HeaderTitle /> }} />
      <Stack.Screen name='tarefa/camera' options={{ headerShown: true, headerBackTitleVisible: false, headerTitle: () => <HeaderTitle /> }} />
    </Stack>
  )
}

