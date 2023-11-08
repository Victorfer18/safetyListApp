import React, { useState, useEffect } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  ScrollView
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { StatusBar } from 'expo-status-bar';
import { getClientsById } from 'services/api';
import Button from 'components/Button';
import { MaterialIcons } from '@expo/vector-icons';
import jwt from '@/services/jwt';
import { Link } from 'expo-router';



const fotos = [
  { value: '1', image: require('assets/images/unidades/1.png') },
  { value: '2', image: require('assets/images/unidades/2.png') },
  { value: '3', image: require('assets/images/unidades/3.png') },
  { value: '11', image: require('assets/images/unidades/11.png') },
  { value: '13', image: require('assets/images/unidades/13.png') },
  { value: '15', image: require('assets/images/unidades/15.png') },
  { value: '16', image: require('assets/images/unidades/16.png') },
  { value: '17', image: require('assets/images/unidades/17.png') },
  { value: '18', image: require('assets/images/unidades/18.png') },
  { value: '20', image: require('assets/images/unidades/20.png') },
  { value: '22', image: require('assets/images/unidades/22.png') },
  { value: '23', image: require('assets/images/unidades/23.png') },
  { value: '24', image: require('assets/images/unidades/24.png') },
  { value: '26', image: require('assets/images/unidades/26.png') },
  { value: '27', image: require('assets/images/unidades/27.png') },
  { value: '28', image: require('assets/images/unidades/28.png') },
];
const defaultImage = require('assets/images/unidades/default.png');

const DropdownComponent = () => {

  const [value, setValue] = useState(null);
  const [data, setData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(defaultImage);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await jwt()

      getClientsById(data.client_id).then(res => {
        setData(res.payload.map(e => ({ label: e.info_name, value: e.client_id, image: require('assets/images/unidades/1.png') })));
      })
    })()

  }, []);

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const selectItem = (item) => {
    setValue(item.value);
    setSelectedImage(fotos.find(i => i.value == item.value)?.image || defaultImage);
    setModalVisible(false);
  };

  const selectedItem = data.find(item => item.value === value);
  const labelText = selectedItem ? selectedItem.label : "Unidades";
  const renderLabel = () => {
    {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          {labelText}
        </Text>
      );
    }
    return null;
  };




  return (
    <ImageBackground source={selectedImage} style={styles.fundo}>

      <View style={styles.card}>
        {renderLabel()}
        <TouchableOpacity onPress={openModal} style={styles.dropdown}>
          <Text>{selectedItem ? selectedItem.label : "Select item"}</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <ScrollView>
            {data.map((item) => (
              <TouchableOpacity key={item.value} onPress={() => selectItem(item)}>
                <Text style={styles.item}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity onPress={closeModal} style={styles.closeModalButton}>
            <Text style={{ color: '#fff' }}>Fechar</Text>
          </TouchableOpacity>
        </Modal>

        {!!value ? (
          <Link href={'/(stack)/inspections/' + value} asChild>
            <Button texto='Proseguir' line={16} marginTop={16} active={!!value}>
              <MaterialIcons name="navigate-next" size={16} color="white" />
            </Button>
          </Link>

        ) : (
          <Button texto='Proseguir' line={16} marginTop={16} active={!!value}>
            <MaterialIcons name="navigate-next" size={16} color="white" />
          </Button>
        )}
        <StatusBar style='dark' />
      </View>
    </ImageBackground>

  );
};

export default DropdownComponent;

const styles = StyleSheet.create({

  fundo: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  item: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginLeft: 20,
    marginRight: 20,
    color: '#222'
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    paddingTop: 0,
    justifyContent: 'center',
    margin: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d1d1d1',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    zIndex: 999,
    paddingHorizontal: 8,
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
    width: '100%',
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  image: {
    maxWidth: Dimensions.get('window').width - 100, // 20 de margem em cada lado
    maxHeight: (Dimensions.get('window').height / 2) - 100, // Supondo que você queira que a imagem ocupe no máximo metade da altura da tela
    alignSelf: 'center',
    marginTop: -120,
  },

  customButton: {
    marginTop: 20,
    backgroundColor: '#be1622',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  modal: {
    padding: 48,
  },
  closeModalButton: {
    alignItems: 'center',
    padding: 8,
    margin: 16,
    backgroundColor: '#be1622',
    borderRadius: 8,

  },
});
