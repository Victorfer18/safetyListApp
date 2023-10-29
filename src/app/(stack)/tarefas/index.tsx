import { View, Text, StyleSheet, ScrollView } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { getInspectableList } from 'services/api';
import { useLocalSearchParams } from 'expo-router';
import CardTarefas from "@/components/CardTarefas";

import Button from 'components/Button'
import { StatusBar } from "expo-status-bar";

const tarefas = () => {

    const local = useLocalSearchParams();

    const [lista, setLista] = useState([])
    useEffect(() => {
        (async () => {

            const res = await getInspectableList(local.inspection_id, local.client_id);
            console.log(res)
            setLista(res.payload)
        })()
    }, [])

    return (
        <View>
            <ScrollView>
                <Text style={style.tituloPage}>
                    Tarefas
                </Text>
                <CardTarefas style={style} lista={lista} />
                <View style={style.boxSpace}>
                    <Button texto='Finalizar Tarefas' cor='#16be2e' line={20}>
                        <AntDesign name="checkcircleo" size={16} color="white" />
                    </Button>
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
        }
    }
)