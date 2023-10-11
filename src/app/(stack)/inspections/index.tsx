import { StyleSheet, View, Text, ScrollView } from "react-native";
import Button from '../../../components/Button';
import Card from "../../../components/Card";

const inspections = () => {
    return (
        <View>
            <ScrollView>
            <Text style={style.tituloPage}>
                Inspeções
            </Text>
            
            {Array(7).fill('').map((_,i) => (
                <Card key={i}>
                    <Text style={style.titulo}>Revisão de Agosto</Text>
                    <Text style={style.paragrafo}>Criado em: 13/07/2023</Text>
                    <Text style={style.paragrafo}>Data estimada: 12/07/2023</Text>
                    <Text style={style.paragrafo}>Status: Iniciado</Text>
                    <Button texto='Inspecionar' />
                </Card>
            ))}
            </ScrollView>

        </View>
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

})