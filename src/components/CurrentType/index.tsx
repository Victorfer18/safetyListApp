import React, { useState, useEffect, useRef } from 'react';
import { Animated, View, StyleSheet, Text, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const styleHeadertypeName = StyleSheet.create({
    box: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    text: {
        color: "#333",
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 8,
    },
    image: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        borderRadius: 40,
    }
})

export function setTypeName(name: string, imageUrl: string) {
    AsyncStorage.multiRemove(['CurrentType', 'CurrentImage'])
        .then(() => {
            AsyncStorage.multiSet([['CurrentType', name], ['CurrentImage', imageUrl]]);
        });
}

export default function () {

    const [name, setName] = useState('')
    const [imageUrl, setImageUrl] = useState('');
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        (async () => {
            const typeName = await AsyncStorage.getItem('CurrentType') || '';
            const imageLink = await AsyncStorage.getItem('CurrentImage') || '';
            setName(typeName);
            setImageUrl(imageLink);
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            }).start();
        })()
    }, []);

    return (
        <Animated.View style={[styleHeadertypeName.box, { opacity: fadeAnim }]}>
            <Text style={styleHeadertypeName.text}>{name}</Text>
            {imageUrl ? <Image source={{ uri: imageUrl }} style={styleHeadertypeName.image} /> : null}
        </Animated.View>
    )
}