import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MessageDisplay = ({ message, type = 'error', show = false }) => {



    const styleText = stylesText[type] || stylesText.error
    const styleContainer = stylesContainer[type] || stylesContainer.error

    return (<>
        {show && (
            <View style={[stylesContainer.default, styleContainer]}>
                <Text style={styleText}>{message}</Text>
            </View>
        )}
    </>);
};

const stylesContainer = StyleSheet.create({
    default: {
        padding: 10,
        margin: 10,
        borderWidth: 1,
        width: "100%",
        borderRadius: 8,
        marginTop: 16,
    },
    message: {
        color: 'black',
        borderColor: 'black',
        backgroundColor: '#EEE',
    },
    error: {
        color: 'red',
        borderColor: 'red',
        backgroundColor: '#C001',
    },
    warning: {
        color: '#8e4801',
        borderColor: 'orange',
        backgroundColor: '#fff7dc',
    },
    success: {
        color: 'green',
        borderColor: 'green',
        backgroundColor: '#ceffdc',
    },
});


const stylesText = StyleSheet.create({
    message: {
        color: 'black',
        textAlign: 'center',

    },
    error: {
        color: 'red',
        textAlign: 'center',

    },
    warning: {
        color: 'orange',
        textAlign: 'center',

    },
    success: {
        color: 'green',
        textAlign: 'center',

    },
});

export default MessageDisplay;