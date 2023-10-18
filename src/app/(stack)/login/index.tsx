import React, { useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const image = 'assets/images/login/background.png';
const logoImage1 = 'assets/images/logo/safety-list.png';
const logoImage2 = 'assets/images/logo/safety-2u.png';


const App = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <ImageBackground source={require(image)} style={styles.image}>
                <View style={styles.loginBox}>
                    <Image source={require(logoImage1)} style={styles.logo1} />
                    <View style={styles.poweredByContainer}>
                        <Text style={styles.poweredByText}>Powered by</Text>
                        <Image source={require(logoImage2)} style={styles.logo2} />
                    </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={setUsername}
                        value={username}
                        placeholder="Usuário"
                        placeholderTextColor="#aaa"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setPassword}
                        value={password}
                        placeholder="Senha"
                        secureTextEntry={true}
                        placeholderTextColor="#aaa"
                    />
                    <TouchableOpacity style={styles.customButton} onPress={() => {
                        console.log("Usuário:", username, "Senha:", password);
                    }}>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>

                </View>
            </ImageBackground>
            <StatusBar style="light" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginBox: {
        width: '90%',
        padding: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 10,
        alignItems: 'center',
    },

    logoContainer: {
        marginBottom: 200,
    },
    poweredByContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    poweredByText: {
        marginRight: 5,
    },
    logo1: {
        width: '90%',
        height: 50,
        marginBottom: 10,


    },

    logo2: {
        width: '60%',
        height: 20,
        marginBottom: 10,

    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        paddingHorizontal: 10,
        borderRadius: 8,
        backgroundColor: '#fff',
    },

    customButton: {
        marginTop: 20,
        backgroundColor: '#be1622',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default App;
