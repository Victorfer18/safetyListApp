import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { MaterialCommunityIcons, AntDesign  } from '@expo/vector-icons';

import Button from 'components/Button'

const tarefas = () => {
    return (
        <View>
            <ScrollView>
                <Text style={style.tituloPage}>
                    Tarefas
                </Text>
                <View style={style.grid}>
                    {Array(12).fill('').map((_, i) => (
                        <TouchableOpacity style={style.task}>
                            <MaterialCommunityIcons name="fire-hydrant" size={100} color="white" style={style.icon}/>
                            <Text style={style.taskText}>
                                Hidrante
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={style.boxSpace}>
                <Button texto='Finalizar Tarefas' cor='#16be2e' line={20}>
                <AntDesign name="checkcircleo" size={16} color="white" />
                </Button>
                </View>
            </ScrollView>

        </View>
    )
}

export default tarefas;

const style = StyleSheet.create(
    {

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
        taskText:{
            borderBottomLeftRadius: 18,
            borderBottomRightRadius: 18,
            color: '#f7f7f7',
            fontSize: 16,
            textAlign: "center",
            backgroundColor: '#0002',
            padding:12,
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
            boxSpace:{
                margin: 18,
            }
    }
)