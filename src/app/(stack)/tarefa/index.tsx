import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, FlatList, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from '@expo/vector-icons';
import Card from "@/components/Card";
import Button from 'components/Button'
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from "expo-status-bar";
import { get_maintenance_type, get_maintenance, register_maintenance, saveInspectableIsClosed } from 'services/api';
import CustomInput from '@/components/CustomInput';
import jwt from "@/services/jwt";
import FormTarefa from "@/components/FormTarefa";
import MessageDisplay from "@/components/feedBack";
import CurrentCompany from '@/components/CurrentCompany';



const App = ({ ...params }: any) => {
    const [lista, setLista] = useState([]);
    const [resposta, setResposta] = useState([]);


    const [showMessage, setShowMessage] = useState(false);
    const [messageText, setMessageText] = useState('');
    const [messageType, setMessageType] = useState('error');

    const [isLoading, setIsLoading] = useState(false);

    const local = useLocalSearchParams();

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const res = await get_maintenance_type(local.system_type_id, local.client_id);
            const res2 = await get_maintenance(local.system_id);
            const margin = res.payload.map(e => {
                let exist = res2.payload.find(i => e.maintenance_type_name == i.maintenance_type_name)
                if (exist) {
                    e = { ...exist, ...e }
                }
                return e
            })

            setLista(margin)

            setResposta(res2.payload)
            setIsLoading(false);
        })()
    }, []);

    function final() {
        if (lista.every(e => e?.file_url)) {
            Alert.alert(
                "Tarefa Completa",
                "Tarefas finalizadas com sucesso!",
                [
                    {
                        text: "OK",
                        onPress: () => {
                            saveInspectableIsClosed(local.client_parent, local.inspection_id, local.system_type_id);
                            router.push({ pathname: `/(stack)/inspections/${local?.inspecao}` });
                        }
                    }
                ],
                { cancelable: false }
            );
        } else {
            console.log('tafarel')
        }
    }

    const render = ({ item, index }: any) => (<FormTarefa item={item} index={index} key={index} />)

    return (
        // <KeyboardAvoidingView
        //     behavior={Platform.OS === "ios" ? "padding" : "height"}
        //     style={{ flex: 1 }}
        // >
        //    {
        isLoading ? (
            <View style={styles.loadingContainer} >
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.loadingText}>Carregando...</Text>
            </View >
        ) : (
            <>
                <ScrollView
                    style={{ flex: 1 }}
                    keyboardShouldPersistTaps='handled'
                >
                    <CurrentCompany />
                    <Text style={styles.tituloPage}>Tarefa</Text>

                    {lista.map((item, index) => (
                        <FormTarefa item={item} index={index} key={index} />
                    ))}

                    <View style={{ margin: 16 }}>
                        <Button
                            texto='Finalizar Tarefas'
                            cor='#16be2e'
                            line={20}
                            onPress={() => {
                                if (lista.every(e => e?.file_url)) {
                                    final()
                                }
                            }}
                            active={lista.every(e => e?.file_url)}
                        >
                            <AntDesign name="checkcircleo" size={16} color="white" />
                        </Button>
                        {/* <MessageDisplay message={messageText} type={messageType} show={showMessage} /> */}
                    </View>
                </ScrollView>
            </>
        )
        // </KeyboardAvoidingView >
    );
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: 'gray',
    },

});

export default App;