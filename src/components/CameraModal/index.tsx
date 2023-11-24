import React, { useRef, useState } from 'react';
import { Modal, View, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

const CameraModal = ({ isVisible, onClose, onPhotoTaken }) => {
    const cameraRef = useRef(null);
    const [photo, setPhoto] = useState(null);

    const takePic = async () => {
        if (cameraRef.current) {
            let options = { quality: 1, base64: true, exif: false };
            let newPhoto = await cameraRef.current.takePictureAsync(options);
            setPhoto(newPhoto);
        }
    };

    const savePhoto = () => {
        if (photo) {
            MediaLibrary.saveToLibraryAsync(photo.uri);
            onPhotoTaken(photo);
            setPhoto(null);
            onClose();
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={isVisible}
            onRequestClose={onClose}>
            <View style={{ flex: 1 }}>
                {photo ? (
                    <View style={{ flex: 1 }}>
                        <Image style={{ flex: 1 }} source={{ uri: photo.uri }} />
                        <Button title="Save Photo" onPress={savePhoto} />
                        <Button title="Retake" onPress={() => setPhoto(null)} />
                    </View>
                ) : (
                    <Camera style={{ flex: 1 }} ref={cameraRef}>
                        <Button title="Take Picture" onPress={takePic} />
                    </Camera>
                )}
                <Button title="Close" onPress={onClose} />
            </View>
        </Modal>
    );
};

export default CameraModal;