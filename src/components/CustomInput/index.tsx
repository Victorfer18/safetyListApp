import React, { forwardRef, ForwardedRef } from 'react';
import { TextInput, StyleSheet, TextInputProps, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


interface CustomInputProps extends TextInputProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
    secureTextEntry?: boolean;
    iconName?: string;
}

const CustomInput: React.ForwardRefRenderFunction<TextInput, CustomInputProps> = (
    { value, onChangeText, placeholder, secureTextEntry, iconName, ...props },
    ref
) => {
    return (
        <View style={styles.container}>
            <AntDesign name={iconName || ''} size={24} color="#666" />
            <TextInput
                {...props}
                ref={ref}
                style={styles.input}
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                placeholderTextColor="#aaa"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 10,
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        height: 40,
        marginLeft: 10,
    },
});

export default forwardRef(CustomInput);
