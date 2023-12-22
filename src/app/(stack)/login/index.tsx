import React, { useState, useEffect, useRef } from 'react';
import { Image, ImageBackground, StyleSheet, Text, View, TouchableOpacity, Alert, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomInput from '@/components/CustomInput';
import MessageDisplay from '@/components/feedBack';
import { AntDesign } from '@expo/vector-icons';
import { login } from 'services/api';
import Button from '@/components/Button';
import { router } from 'expo-router';
import NetInfo from '@react-native-community/netinfo';

const image = 'assets/images/login/background.png';
const logoImage1 = 'assets/images/logo/safety-list.png';
const logoImage2 = 'assets/images/logo/safety-2u.png';

const App = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [load, setLoad] = useState(false);
    const [message, setMessage] = useState('');
    const passwordInputRef = useRef<TextInput>(null);
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        (async () => {
            const token = await AsyncStorage.getItem('userToken');
            if (token) {
                router.push({ pathname: '/(stack)/unidades' });
            }
        })()
    }, []);

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(String(email).toLowerCase());
    };

    const handleLogin = async () => {
        setLoad(true)
        setMessage('');

        if (!username || !password) {
            setTimeout(() => {
                setMessage('Favor preencha todos os campos');
                setLoad(false);
                setTimeout(() => {
                    setMessage('')
                }, 10000)
            }, 2000);
            return;
        }

        if (!validateEmail(username)) {
            setTimeout(() => {
                setMessage('Favor preencha um e-mail válido');
                setLoad(false);
                setTimeout(() => {
                    setMessage('');
                }, 10000);
            }, 2000);
            return;
        }

        try {
            const response = await login(username, password);
            if (response.success && response.payload) {
                await AsyncStorage.setItem('userToken', response.payload);
                router.push({ pathname: '/(stack)/unidades' });
                setLoad(false);
            }
        } catch (error) {
            let msgError = error + ''
            setTimeout(() => {
                setMessage(msgError?.replace('Error:', ''));
                setLoad(false);
                setTimeout(() => {
                    setMessage('')
                }, 10000)
            }, 2000);
        }
    };

    return (
        <View style={styles.container}>

            <ImageBackground source={require(image)} style={styles.image}>

                <View style={styles.loginBox}>
                    <Image source={require(logoImage1)} style={styles.logo1} />

                    <View style={styles.poweredByContainer}>
                        <Text style={styles.poweredByText}>Powered by</Text>

                        <Image source={require(logoImage2)} style={styles.logo2} />

                    </View>
                    <CustomInput
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Usuário"
                        iconName="user"
                        returnKeyType="next"
                        onSubmitEditing={() => passwordInputRef.current?.focus()}
                        blurOnSubmit={false}
                    />
                    <CustomInput
                        ref={passwordInputRef}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Senha"
                        secureTextEntry={true}
                        iconName="unlock"
                        returnKeyType="done"
                    />
                    <Button texto='ACESSAR' width='100%' marginTop={0} line={16} onPress={handleLogin} load={load} >
                        <AntDesign name={load ? "loading1" : "check"} size={16} color="white" />
                    </Button>
                    <MessageDisplay message={message} type={'error'} show={!!message} />
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
        padding: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 10,
        alignItems: 'center',
    },

    logoContainer: {
        marginBottom: 200,
    },
    poweredByContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',

    },
    poweredByText: {
        color: '#6c6c6c',
        fontSize: 14,
        fontStyle: 'italic'

    },
    logo1: {
        width: '100%',
        height: 60,
        marginBottom: 10,
        objectFit: 'contain'

    },
    logo2: {
        width: '40%',
        height: 15,
        objectFit: 'contain'
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
