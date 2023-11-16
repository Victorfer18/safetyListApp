import { StyleSheet, View, Text, ScrollView } from "react-native";
import Button from '../../../components/Button';
import Card from "../../../components/Card";
import { StatusBar } from "expo-status-bar";
import { useSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { alterStatusInspectionById, getInspectionsByClient } from 'services/api';
import { Link } from "expo-router";

function formData(data: String) {
    let formatada = data?.substr(0, 10).split('-').reverse().join('/')
    return formatada == "00/00/0000" ? " - " : formatada
};

function alterStatus(user_id, inspection_id, status_inspection) {
    if (status_inspection == 1) {
        alterStatusInspectionById(user_id, inspection_id, 2)
    }

};


const inspections = () => {
    const { id } = useSearchParams();
    const [lista, setLista] = useState([])
    useEffect(() => {
        (async () => {
            const res = await getInspectionsByClient(id)
            setLista(res.payload)

        })()
    }, [])

    return (
        <View>
            <ScrollView>
                <Text style={style.tituloPage}>
                    Inspeções
                </Text>

                {lista.map((e, i) => (

                    <Card key={i}>
                        <Text style={style.titulo}>{e.inspection_name}</Text>
                        <Text style={style.paragrafo}>Criado em: {formData(e.date_created)}</Text>
                        <Text style={style.paragrafo}>Data estimada: {formData(e.date_estimated)}</Text>

                        <Text style={style.paragrafo}>
                            Status:
                            <Text style={e.status_inspection_desc === "Não iniciado" ? style.statusNaoIniciado : e.status_inspection_desc === "Iniciado" ? style.statusIniciado : {}}>
                                {e.status_inspection_desc}
                            </Text>
                        </Text>
                        <Link href={{
                            pathname: '/(stack)/tarefas/',
                            params: { client_id: e.client_id, inspection_id: e.inspection_id, client_parent: e.client_parent, user_id: e.user_id }
                        }} asChild>
                            <Button texto='Inspecionar' onPress={() => {
                                alterStatus(e.user_id, e.inspection_id, e.status_inspection)
                            }} />
                        </Link>
                    </Card>
                ))}
                {
                    lista.length == 0 && (<Text style={style.msgInspecoes}>Não há inspeções a serem realizadas para essa unidade!</Text>)
                }
            </ScrollView>
            <StatusBar style="dark" />
        </View >
    )
}

export default inspections;

const style = StyleSheet.create({
    titulo: {
        borderColor: '#ccc',
        borderBottomWidth: 1,
        fontSize: 24,
        fontWeight: "bold",
        paddingBottom: 8,
        marginBottom: 8,
    },
    tituloPage: {
        fontSize: 34,
        fontWeight: "800",
        marginLeft: 18,
        marginTop: 18,
        textTransform: "uppercase",
        color: '#222',
    },
    paragrafo: {
        fontSize: 16,
        marginTop: 8,
    },
    msgInspecoes: {
        fontSize: 24,
        padding: 16,
        textAlign: "center",
        backgroundColor: '#ccc',
        color: '#555',
        margin: 16,
        borderRadius: 8,

    },

    statusNaoIniciado: {
        fontWeight: "bold",
        color: "#6c757d", // Cinza
    },
    statusIniciado: {
        fontWeight: "bold",
        color: "#0d6efd", // Azul
    }

})