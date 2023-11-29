// BackgroundLayout.js
import React from 'react';
import { ImageBackground, StyleSheet, SafeAreaView } from 'react-native';

const image = 'assets/images/login/background.png';

const BackgroundLayout = ({ children }) => {
    return (
        <ImageBackground source={require(image)} style={styles.background}>
            <SafeAreaView style={styles.container}>
                {children}
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
    },
    container: {
        flex: 1,

    }
});

export default BackgroundLayout;
