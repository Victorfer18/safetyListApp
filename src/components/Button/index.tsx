import { StyleSheet, TouchableOpacity, Text } from "react-native";


const Button = ({ texto, cor = '#be1622', children, line=10}: any) => {
    const styles = StyleSheet.create({
        customButton: {
            marginTop: 20,
            backgroundColor: cor,
            paddingVertical: line,
            paddingHorizontal: 20,
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
        },
        buttonText: {
            textTransform: "uppercase",
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
        },
    });
    return (
        <TouchableOpacity style={styles.customButton}>
            <Text style={styles.buttonText}>{children} {texto}</Text>
        </TouchableOpacity>
    )
}

export default Button;

