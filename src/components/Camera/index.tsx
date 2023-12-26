import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { FontAwesome, Ionicons, AntDesign } from '@expo/vector-icons';

const CameraComponent = ({ onClose, onSave }) => {
    let cameraRef = useRef();
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraPermission.status === 'granted');
        })();
    }, []);

    if (hasCameraPermission === null) {
        return <Text>Requesting permissions...</Text>;
    }

    if (!hasCameraPermission) {
        return <Text>No access to camera</Text>;
    }

    const takePicture = async () => {
        if (!cameraRef.current) return;
        const options = { quality: 0.5, base64: true, exif: false };
        let newPhoto = await cameraRef.current.takePictureAsync(options);
        setPhoto(newPhoto);
    };

    const savePhoto = () => {
        if (photo) {
            MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
                onSave(photo.uri);
                setPhoto(null);
            });
        }
    };

    return (
        <View style={styles.container}>
            {photo ? (
                <View style={styles.previewContainer}>
                    <Image style={styles.preview} source={{ uri: photo.uri }} />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={savePhoto} style={[styles.button, styles.saveButton]}>
                            <Ionicons name="save" size={40} color="white" />
                            <Text style={styles.buttonText}>Salvar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setPhoto(null)} style={[styles.button, styles.discardButton]}>
                            <Ionicons name="trash-bin" size={40} color="white" />
                            <Text style={styles.buttonText}>Descartar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <Camera style={styles.camera} ref={cameraRef}>
                    <View style={styles.closeButtonContainer}>
                        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                            <AntDesign name="close" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={takePicture}>
                            <FontAwesome name="camera" size={40} color="white" />
                        </TouchableOpacity>
                    </View>
                </Camera>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButtonContainer: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 10,
    },
    closeButton: {
        backgroundColor: '#333',
        padding: 10,
        borderRadius: 20,
    },
    previewContainer: {
        flex: 1,
    },
    preview: {
        alignSelf: 'stretch',
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,

    },
    button: {
        margin: 10,
        padding: 10,
        borderRadius: 20,
        width: 150,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        marginLeft: 10,
    },
    saveButton: {
        backgroundColor: '#05f',
    },
    discardButton: {
        backgroundColor: '#be1622',
    },
});



export default CameraComponent;
