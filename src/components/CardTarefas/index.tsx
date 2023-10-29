// TaskList.js
import React from 'react';
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Link } from 'expo-router';
import PropTypes from 'prop-types';

const CardTarefas = ({ style, lista }: any) => {
    return (
        <View style={style.grid}>
            {lista.map((e: any, i: any) => (
                <Link
                    href={{
                        pathname: '/(stack)/tarefa',
                        params: { system_type_id: e.system_type_id, client_id: e.client_id }
                    }}
                    asChild
                    key={i}
                >
                    <TouchableOpacity style={style.task}>
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

export default CardTarefas;
