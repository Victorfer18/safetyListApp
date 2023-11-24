import { StyleSheet, TouchableOpacity, TouchableOpacityProps, Text } from "react-native";
import { forwardRef } from "react";

type Props = TouchableOpacityProps

const Button = forwardRef<TouchableOpacity, Props>(({
    texto, cor = '#be1622', children, line = 10, width = '100%',
    marginTop = 20, marginLeft = 0, fn = () => false,
    load = false,
    active = true,
    ...rest
}: any, ref) => {
    const styles = StyleSheet.create({
        customButton: {
            marginTop,
            backgroundColor: cor,
            paddingVertical: line,
            paddingHorizontal: 20,
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
            width,
            marginLeft,

        },
        buttonText: {
            textTransform: "uppercase",
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
        },
        disable: {
            marginTop,
            backgroundColor: "#ccc",
            paddingVertical: line,
            paddingHorizontal: 20,
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
            width,
            marginLeft,
            color: 'white'
        },
        disabledText: {
            textTransform: "uppercase",
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
        }
    });




    return (
        <TouchableOpacity ref={ref}
            style={active ? styles.customButton : styles.disable} onPress={fn}
            {...rest}
            activeOpacity={load ? 1 : 0}
        >

            <Text style={active ? styles.buttonText : styles.disabledText}>{children} {load ? 'carregando...' : texto}</Text>

        </TouchableOpacity>
    )
})

export default Button;

