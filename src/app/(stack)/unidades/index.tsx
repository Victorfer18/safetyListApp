import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

const data = [
  { label: 'Item 1', value: '1', image: require('assets/images/unidades/1.png') },
  { label: 'Item 2', value: '2', image: require('assets/images/unidades/2.png') },
  { label: 'Item 3', value: '3', image: require('assets/images/unidades/3.png') },
  { label: 'Item 11', value: '11', image: require('assets/images/unidades/11.png') },
  { label: 'Item 13', value: '13', image: require('assets/images/unidades/13.png') },
  { label: 'Item 15', value: '15', image: require('assets/images/unidades/15.png') },
  { label: 'Item 16', value: '16', image: require('assets/images/unidades/16.png') },
  { label: 'Item 17', value: '17', image: require('assets/images/unidades/17.png') },

];
const defaultImage = require('assets/images/unidades/default.png');

const DropdownComponent = () => {
  const [value, setValue] = useState(null);
  const [selectedImage, setSelectedImage] = useState(defaultImage);
  const [isFocus, setIsFocus] = useState(false);

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
  const handleNavigation = () => {
    if (value) {
      const selectedItem = data.find(item => item.value === value);
      if (selectedItem) {
        // Aqui, você pode decidir para qual tela navegar com base no item selecionado
        // Por exemplo:
        switch (selectedItem.value) {
          case '1':
            console.log({ labelText });
            break;
          case '2':
            console.log({ labelText });
            break;
          // ... adicione mais casos conforme necessário
          default:
            break;
        }
      }
    }
  };


  return (
    <View style={styles.container}>
      {selectedImage && <Image source={selectedImage} style={styles.image} />}
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}

        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setSelectedImage(item.image || defaultImage);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? 'blue' : 'black'}
            name="Safety"
            size={20}
          />
        )}
      />
      <TouchableOpacity style={styles.customButton} onPress={handleNavigation}>
        <Text style={styles.buttonText}>Prosseguir</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9', // Um fundo claro
    padding: 20,
    paddingTop: 0,
    flex: 1,
    justifyContent: 'center',
    margin: 20, // Espaço em torno da moldura
    borderRadius: 10, // Bordas arredondadas
    borderWidth: 1, // Largura da borda
    borderColor: '#d1d1d1', // Cor da borda
    shadowColor: "#000", // Sombra
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Elevação para Android

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
    textAlign: 'center', // Centraliza o texto
    width: '100%', // Ocupa toda a largura
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
  // image: {
  //   width: 300,
  //   height: 300,
  //   marginBottom: 20,
  //   alignSelf: 'center',
  //   marginTop: -120, // Ajuste este valor conforme necessário
  // },

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
});
