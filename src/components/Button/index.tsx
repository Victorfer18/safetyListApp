import { StyleSheet, TouchableOpacity, TouchableOpacityProps, Text } from "react-native";
import { forwardRef } from "react";

type Props = TouchableOpacityProps

const Button = forwardRef<TouchableOpacity, Props>(({
    texto, cor = '#be1622', children, line = 10, width = '100%',
    marginTop = 20, marginLeft = 0, fn = () => false,
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
    });
    return (
        <TouchableOpacity ref={ref}
            style={styles.customButton} onPress={fn}
            {...rest}
        >

            <Text style={styles.buttonText}>{children} {texto}</Text>

        </TouchableOpacity>
    )
})

export default Button;

