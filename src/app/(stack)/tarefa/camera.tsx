import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image, TouchableOpacity } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';

export default function camera() {
  const local = useLocalSearchParams();
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permissão para câmera não concedida. Por favor, altere isso nas configurações.</Text>
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };

    const discardPhoto = () => {
      setPhoto(undefined);
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);

  };

  if (photo) {

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        router.replace({ pathname: '/(stack)/tarefa/', params: { photoUri: photo.uri, system_type_id: local.system_type_id, client_id: local.client_id, client_parent: local.client_parent, user_id: local.user_id, select_id: local.select_id, system_id: local.system_id } });
        setPhoto(undefined);
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
        <View style={styles.buttonContainer}>
          {hasMediaLibraryPermission && (
            <TouchableOpacity onPress={savePhoto} style={styles.buttonSave}>
              <Ionicons name="save" size={40} color="white" />
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => setPhoto(undefined)} style={styles.buttonDiscard}>
            <Ionicons name="trash-bin" size={40} color="white" />
            <Text style={styles.buttonText}>Descartar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (<Camera style={styles.camera} ref={cameraRef}>
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.buttonCamera}
        onPress={takePic}
        activeOpacity={1}>
        <FontAwesome name="camera" size={40} color="white" />
        <StatusBar style="dark" />
      </TouchableOpacity >
    </View>

  </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonCamera: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#05f',
    padding: 10,
    borderRadius: 20,
    margin: 5,
  },
  camera: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },


  preview: {
    alignSelf: 'stretch',
    flex: 1
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20, // ajuste conforme necessário
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonSave: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#05f',
    padding: 10,
    borderRadius: 20,
    margin: 5,
  },
  buttonDiscard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#be1622',
    padding: 10,
    borderRadius: 20,
    margin: 5,
  },
  buttonText: {
    color: '#fff',
    marginTop: 5,
  },

});