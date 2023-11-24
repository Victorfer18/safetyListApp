import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { Link } from 'expo-router';
import PropTypes from 'prop-types';
import { useLocalSearchParams } from 'expo-router';



const CardTarefas = ({ style, lista }: any) => {
    const local = useLocalSearchParams();
    return (

        <View style={style.grid}>
            {lista.map((e: any, i: any) => (

                <Link
                    href={{
                        pathname: '/(stack)/tarefa',
                        params: { system_type_id: e.system_type_id, client_id: e.client_id, client_parent: e.client_parent, user_id: local.user_id, system_id: e.system_id, maintenance_type_id: e.maintenance_type_id, inspection_name: e.inspection_name, inspection_id: local.inspection_id, inspecao: local.inspecao }
                    }}
                    asChild
                    key={i}
                >
                    <TouchableOpacity style={e.is_closed == 1 ? styleDisable.desativo : style.task}>
                        <View style={style.itemContainer}>
                            <Image
                                style={style.icone}
                                source={{ uri: e.system_type_icon }}
                            />
                        </View>
                        <Text style={style.taskText}>
                            {e.system_type_name}
                        </Text>
                    </TouchableOpacity>
                </Link>
            ))}
        </View>
    );
};

CardTarefas.propTypes = {
    style: PropTypes.object.isRequired,
    lista: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const styleDisable = StyleSheet.create({
    desativo: {
        backgroundColor: "#444",
        width: '42.5%',
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
    }
})


export default CardTarefas;
