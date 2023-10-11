import { View, StyleSheet } from "react-native";

const Card = ({ children }: any) => {
    return (
        <View style={styles.Box}>
            {children}
        </View>
    )
}

export default Card;

const styles = StyleSheet.create({
    Box: {
        backgroundColor: 'white',
        margin: 18,
        padding: 20,
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



});