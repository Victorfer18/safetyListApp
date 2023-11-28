import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, KeyboardAvoidingView, Platform, Modal } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from '@expo/vector-icons';
import Card from "@/components/Card";
import Button from 'components/Button'
import { Link, useLocalSearchParams } from 'expo-router';
import { StatusBar } from "expo-status-bar";
import { register_maintenance } from 'services/api';
import CustomInput from '@/components/CustomInput';
import jwt from "@/services/jwt";
import MessageDisplay from '@/components/feedBack';
import CameraComponent from '@/components/Camera';

function FormTarefa({ item, index }: any) {
    const local = useLocalSearchParams();
    const [photoUri, setPhotoUri] = useState(null);
    const [selectedRadio, setSelectedRadio] = useState(1)
    const [inputValue1, setInputValue1] = useState('');
    const [inputValue2, setInputValue2] = useState('');

    const [messageType, setMessageType] = useState('');
    const [load, setLoad] = useState(false);
    const [message, setMessage] = useState('');


    const [isCameraVisible, setCameraVisible] = useState(false);
    const openCamera = () => setCameraVisible(true);
    const closeCamera = () => setCameraVisible(false);

    const handleSavePhoto = (uri) => {
        setPhotoUri(uri);
        closeCamera();
    };


    const defaultImage = require('assets/images/tarefa/default.jpg');

    useEffect(() => {
        if (local?.photoUri !== photoUri) {
            if (local.select_id == index) {
                setPhotoUri(local?.photoUri);
            }
        }

        if (item?.file_url) {
            setSelectedRadio(item.is_according ? 1 : 0)
            setInputValue1(item?.observation)
            setInputValue2(item?.action)
        }

    }, [local?.photoUri]);

    async function saveTarefa(e: any) {
        setLoad(true)
        try {
            const dado = await jwt()

            const res = await register_maintenance(
                local.system_type_id,
                e.maintenance_type_id,
                local.user_id,
                local.client_parent,
                selectedRadio == 1,
                inputValue1,
                inputValue2,
                photoUri,
            )
            setTimeout(() => {
                setMessage(res.message);
                setMessageType("success");
                setLoad(false);
                setTimeout(() => {
                    setMessage('')
                }, 10000)
            }, 2000);


        } catch (error) {
            let msgError = error
            setTimeout(() => {
                setMessage(msgError.message);
                setMessageType("error");
                setLoad(false);
                setTimeout(() => {
                    setMessage('')
                }, 10000)
            }, 2000);

        }


    };

    async function renderSaveTarefa() {
        if (!item?.file_url) { saveTarefa(item) }
    }

    return (
        <Card key={index} >
            <Text style={styles.tituloCard}>
                {item.maintenance_type_name}
            </Text>
            <View>

                {item?.file_url && (
                    <Image source={{ uri: item?.file_url }} alt={photoUri || ''} style={styles.imgDefault} />
                )}
                {!item?.file_url && (
                    <Image source={photoUri ? { uri: photoUri } : defaultImage} alt={photoUri || ''} style={styles.imgDefault} />
                )}
                {item?.file_url && (
                    <Button texto='Foto' cor='#05f' line={16} width={120} marginTop={-70} marginLeft={16} active={false}>
                        <AntDesign name="clouduploado" size={24} color="white" />
                    </Button>
                )}

                {!item?.file_url && (
                    <Button texto='Foto' cor='#05f' line={16} width={120} marginTop={-70} marginLeft={16} onPress={openCamera}>
                        <AntDesign name="clouduploado" size={24} color="white" />
                    </Button>
                )}

            </View>
            <View style={styles.btnArea}>
                <TouchableOpacity onPress={() => { if (!item?.file_url) setSelectedRadio(1) }}>
                    <View style={styles.wrapper}>
                        <View style={styles.radio}>
                            {selectedRadio == 1 ? <View style={styles.radioBg}></View> : null}
                        </View>
                        <Text style={styles.radioText}>Consistente</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { if (!item?.file_url) setSelectedRadio(0) }}>
                    <View style={styles.wrapper}>
                        <View style={styles.radio}>
                            {selectedRadio == 0 ? <View style={styles.radioBg}></View> : null}
                        </View>
                        <Text style={styles.radioText}>Inconsistente</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <CustomInput
                    placeholder="Observações"
                    value={inputValue1}
                    onChangeText={(text) => { if (!item?.file_url) setInputValue1(text) }}
                />
                {selectedRadio == 0 && (
                    <CustomInput
                        placeholder="Ações a serem tomadas"
                        value={inputValue2}
                        onChangeText={(text) => { if (!item?.file_url) setInputValue2(text) }}
                    />
                )}
                <StatusBar style="dark" />
            </View>
            <Button texto=' Salvar Tarefa' cor='#16be2e' line={16} marginTop={0} onPress={renderSaveTarefa} load={load} active={!item?.file_url}>
                <AntDesign name={load ? "loading1" : "checkcircleo"} size={16} color="white" />
            </Button>

            <MessageDisplay message={message} type={messageType} show={!!message} />

            <Modal
                animationType="slide"
                transparent={false}
                visible={isCameraVisible}
                onRequestClose={closeCamera}
            >
                <CameraComponent onSave={handleSavePhoto} onClose={closeCamera} />
            </Modal>
        </Card >
    )
}

const styles = StyleSheet.create({
    card: {
        height: 500,
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        margin: 16,
    },
    btnArea: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 22,

    },
    imgDefault: {
        width: '100%',
        height: 250,
        borderRadius: 16,

    },

    radioText: {
        fontSize: 16,
        color: 'black',
    },
    radio: {
        width: 24,
        height: 24,
        borderColor: '#16be2e',
        borderRadius: 24,
        borderWidth: 3,
        margin: 8
    },
    wrapper: {
        flexDirection: 'column',
        alignItems: "center",
    },
    radioBg: {
        backgroundColor: '#16be2e',
        height: 12,
        width: 12,
        margin: 3,
        borderRadius: 24,
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingLeft: 8,
        borderRadius: 12,
    },
    btnUpload: {
        height: 22,
        width: 150,
    },
    tituloPage: {
        fontSize: 34,
        fontWeight: "800",
        marginLeft: 18,
        marginTop: 18,
        textTransform: "uppercase",
        color: '#222',
    },
    tituloCard: {
        fontSize: 18,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginBottom: 12,
        paddingBottom: 8,
        color: '#222',
        fontWeight: "800",
    },
    feedBack: {
        justifyContent: 'center',
    }

});

export default FormTarefa;