import { Link } from "expo-router";
import { StyleSheet, TouchableOpacity, Text } from "react-native";


const Button = ({ texto, href = '', cor = '#be1622', children, line = 10, width = '100%',
    marginTop = 20, marginLeft = 0, fn = () => false }: any) => {
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
        <TouchableOpacity style={styles.customButton} onPress={fn}>
            <Link href={href} asChild>
                <Text style={styles.buttonText}>{children} {texto}</Text>
            </Link>
        </TouchableOpacity>
    )
}

export default Button;

