import { Stack, Tabs } from "expo-router";

import React from 'react';
import { Image, View } from 'react-native';

const HeaderTitle = () => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image 
          source={require('assets/images/logo/safety-list.png')} 
          style={{ width: '80%', height: 45, marginRight: 0 }} 
        />
      </View>
    );
  };

export default () => {
    return (
        <Stack>
            <Stack.Screen name='login/index' options={{ headerShown: false}} />
            <Stack.Screen name='inspections/index' options={{ headerShown: true, headerTitle: () => <HeaderTitle/>}} />
            <Stack.Screen name='unidades/index' options={{ headerShown: true, headerTitle: () => <HeaderTitle/>}} />
            <Stack.Screen name='tarefas/index' options={{ headerShown: true, headerTitle: () => <HeaderTitle/>}} />
            <Stack.Screen name='tarefa/index' options={{ headerShown: true, headerTitle: () => <HeaderTitle/>}} />
        </Stack>
    )
}

