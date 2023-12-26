import React, { useState, useEffect } from 'react';
import { Modal, View, Text, Animated, StyleSheet } from 'react-native';
import { Checkbox } from 'expo-checkbox';
import Button from '@/components/Button';


const ConfirmationModal = ({ visible, onConfirm, onCancel, title, message, confirmText, cancelText }) => {
    const [isChecked, setIsChecked] = useState(false);
    const shakeAnimation = new Animated.Value(0);

    useEffect(() => {
        if (visible) {
            setIsChecked(false);
        }
    }, [visible]);

    const handleConfirm = () => {
        if (!isChecked) {
            Animated.sequence([
                Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
                Animated.timing(shakeAnimation, { toValue: -10, duration: 100, useNativeDriver: true }),
                Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
                Animated.timing(shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true })
            ]).start();
            return;
        }
        onConfirm();
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onCancel}
        >

            <View style={styles.modalView}>
                <Animated.View style={{ ...styles.modalContent, transform: [{ translateX: shakeAnimation }] }}>
                    {title && <Text style={styles.modalTitle}>{title}</Text>}

                    <View style={styles.checkboxContainer}>
                        <Checkbox value={isChecked} onValueChange={setIsChecked} />
                        {message && <Text style={styles.modalMessage}>{message}</Text>}
                    </View>


                    <View style={styles.buttonContainer}>
                        <View style={styles.buttonWrapper}>
                            <Button
                                texto={cancelText || "Cancelar"}
                                cor="#c1bebe"
                                fn={onCancel}
                                paddingHorizontal={0}

                            />
                        </View>
                        <View style={styles.buttonWrapper}>
                            <Button
                                texto={confirmText || "Confirmar"}
                                cor="#be1622"
                                fn={handleConfirm}
                                paddingHorizontal={0}
                            />
                        </View>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 16,
        marginBottom: 20,
        marginLeft: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20,
    },
    buttonWrapper: {
        flex: 1,
        marginHorizontal: 5,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f2f2', // Exemplo de cor de fundo
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        width: '90%',
        alignSelf: 'center',
    },
});

export default ConfirmationModal;
