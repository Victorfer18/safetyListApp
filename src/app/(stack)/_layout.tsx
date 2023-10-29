import { Stack } from "expo-router";

import React from 'react';
import { Image, View } from 'react-native';

const HeaderTitle = () => {
  return (
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
      <Image
        source={require('assets/images/logo/safety-list.png')}
        style={{ width: '25%', height: 25, marginLeft: 16, marginRight: 16 }}
      />
      <Image
        source={{uri:'https://safetylist.safety2u.com.br/public/clients/getLogoInspectable/7'}}
        style={{ width: '25%', height: 45 }}
      />
    </View>
  );
};

export default () => {
  return (
    <Stack>
      <Stack.Screen name='login/index' options={{ headerShown: false }} />
      <Stack.Screen name='inspections/[id]' options={{ headerShown: true, headerTitle: () => <HeaderTitle /> }} />
      <Stack.Screen name='unidades/index' options={{ headerShown: true, headerTitle: () => <HeaderTitle /> }} />
      <Stack.Screen name='tarefas/index' options={{ headerShown: true, headerTitle: () => <HeaderTitle /> }} />
      <Stack.Screen name='tarefa/index' options={{ headerShown: true, headerTitle: () => <HeaderTitle /> }} />
      <Stack.Screen name='tarefa/camera' options={{ headerShown: true, headerTitle: () => <HeaderTitle /> }} />
    </Stack>
  )
}

