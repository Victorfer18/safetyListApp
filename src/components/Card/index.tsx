import { StyleSheet, TouchableOpacity, TouchableOpacityProps, Text } from "react-native";
import { forwardRef } from "react";

type Props = TouchableOpacityProps

const Card = forwardRef<TouchableOpacity, Props>(({ children, ...rest }: any, ref) => {


    return (
        <TouchableOpacity ref={ref}
            style={styles.Box}>
            {children}
        </TouchableOpacity>
    )
})

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