import { View, Text, StyleSheet, ScrollView } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { getInspectableList, saveInspectableIsClosed, alterStatusInspectionById } from 'services/api';
import { router, useLocalSearchParams } from 'expo-router';
import CardTarefas from "@/components/CardTarefas";

import Button from 'components/Button'
import { StatusBar } from "expo-status-bar";



const tarefas = () => {

    const local = useLocalSearchParams();
    const [lista, setLista] = useState([])
    useEffect(() => {
        (async () => {

            const res = await getInspectableList(local.inspection_id, local.client_id);

            setLista(res.payload)
        })()
    }, [])

    async function alterStatus() {
        if (lista.every(m => m.is_closed == 1)) {
            await alterStatusInspectionById(local.user_id, local.inspection_id, 3)
            router.replace({ pathname: '/(stack)/inspections/' + local.inspection_id });
        }
    };

    return (
        <View>
            <ScrollView>
                <Text style={style.tituloPage}>
                    Tarefas
                </Text>

                <CardTarefas style={style} lista={lista} />
                <View style={style.boxSpace}>
                    {
                        lista.length == 0 && (<Text style={style.msgTarefas}>Não há tarefas a serem realizadas para essa inspeção!</Text>)
                    }
                    {
                        lista.length > 0 && (<Button onPress={alterStatus} texto='Finalizar Tarefas' cor='#16be2e' line={20} active={lista.every(m => m.is_closed == 1)}>
                            <AntDesign name="checkcircleo" size={16} color="white" />
                        </Button>)
                    }
                </View>
            </ScrollView >
            <StatusBar style="dark" />
        </View >
    )
}

export default tarefas;

const style = StyleSheet.create(
    {

        itemContainer: {
            justifyContent: "flex-end",
            alignItems: "center",
            borderRadius: 5,
            padding: 15,

        },
        icone: {
            height: 70,
            width: 70,
            tintColor: "#ffff",
        },

        grid: {
            flexDirection: "row",
            width: '100%',
            flexWrap: "wrap",
            flex: 1,
            marginTop: 18,
        },
        task: {
            width: '42.5%',
            backgroundColor: '#be1622',

            marginLeft: '5%',
            marginBottom: '5%',
            padding: 0,
            borderRadius: 12,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,

        },
        taskText: {
            borderBottomLeftRadius: 18,
            borderBottomRightRadius: 18,
            color: '#f7f7f7',
            fontSize: 16,
            textAlign: "center",
            //backgroundColor: '#0002',
            padding: 12,
        },
        tituloPage: {
            fontSize: 34,
            fontWeight: "800",
            marginLeft: 18,
            marginTop: 18,
            textTransform: "uppercase",
            color: '#222',
        },
        icon: {
            textAlign: 'center',
            padding: 18,

        },
        boxSpace: {
            margin: 18,
        },
        msgTarefas: {
            fontSize: 24,
            padding: 16,
            textAlign: "center",
            backgroundColor: '#ccc',
            color: '#555',
            margin: 16,
            borderRadius: 8,

        }
    }
)