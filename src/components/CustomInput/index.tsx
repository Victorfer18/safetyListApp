import React, { forwardRef, ForwardedRef } from 'react';
import { TextInput, StyleSheet, TextInputProps, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface CustomInputProps extends TextInputProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
    secureTextEntry?: boolean;
    iconName: string;
}

const CustomInput: React.ForwardRefRenderFunction<TextInput, CustomInputProps> = (
    { value, onChangeText, placeholder, secureTextEntry, iconName, ...props },
    ref
) => {
    return (
        <View style={styles.container}>
            <FontAwesome name={iconName} size={24} color="black" />
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
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
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
