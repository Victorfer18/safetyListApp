import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const styleHeaderCompanyName = StyleSheet.create({
    box: {
        backgroundColor: "#CCC"
    },
    text : {
        textAlign: 'center',
        padding: 16
    }
})

export function setCompanyName(name: string) {
    AsyncStorage.setItem('CurrentCompany', name)
}

export default function () {

    const [name, setName] = useState('')

    useEffect(() => {
        (async () => {
            let companyName = await AsyncStorage.getItem('CurrentCompany') || '';
            setName(companyName)
        })()
    }, []);

    return (
        <View style={styleHeaderCompanyName.box}>
            <Text style={styleHeaderCompanyName.text}>{name}</Text>
        </View>
    )
}