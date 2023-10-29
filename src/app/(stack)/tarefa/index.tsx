import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput, Image, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from '@expo/vector-icons';
import Card from "@/components/Card";
import Button from 'components/Button'
import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from "expo-status-bar";
import { get_maintenance_type } from 'services/api';

const App = ({ ...params }: any) => {

  const local = useLocalSearchParams();
  const [lista, setLista] = useState([])

  const [photoUri, setPhotoUri] = useState(null);
  const [selectedRadio, setSelectedRadio] = useState(1)
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const defaultImage = require('assets/images/tarefa/default.jpg');

  useEffect(() => {
    if (local?.photoUri !== photoUri) {
      setPhotoUri(local?.photoUri);
    }
  }, [local?.photoUri]);

  useEffect(() => {
    (async () => {
      const res = await get_maintenance_type(local.system_type_id, local.client_id);
      console.log(res)
      setLista(res.payload)
    })()
  }, []);


  const renderCard = ({ item, index }) => (
    <Card key={index}>
      <Text style={styles.tituloCard}>
        {item.maintenance_type_name}
      </Text>
      <View>
        <Image source={photoUri ? { uri: photoUri } : defaultImage} alt={photoUri || ''} style={styles.imgDefault} />
        <Button texto='Foto' href='/(stack)/tarefa/camera' cor='#05f' line={16} width={120} marginTop={-70} marginLeft={16} >
          <AntDesign name="clouduploado" size={24} color="white" />
        </Button>
      </View>
      <View style={styles.btnArea}>
        <TouchableOpacity onPress={() => setSelectedRadio(1)}>
          <View style={styles.wrapper}>
            <View style={styles.radio}>
              {selectedRadio == 1 ? <View style={styles.radioBg}></View> : null}
            </View>
            <Text style={styles.radioText}>Consistente</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedRadio(2)}>
          <View style={styles.wrapper}>
            <View style={styles.radio}>
              {selectedRadio == 2 ? <View style={styles.radioBg}></View> : null}
            </View>
            <Text style={styles.radioText}>Inconsistente</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Observações"
          value={inputValue1}
          onChangeText={(text) => setInputValue1(text)}
        />
        {selectedRadio == 2 && (
          <TextInput
            style={styles.input}
            placeholder="Ações a serem tomadas"
            value={inputValue2}
            onChangeText={(text) => setInputValue2(text)}
          />
        )}
        <StatusBar style="dark" />
      </View>
      <Button texto=' Salvar Tarefa' cor='#16be2e' line={16} marginTop={0} >
        <AntDesign name="checkcircleo" size={16} color="white" />
      </Button>
    </Card>
  );

  return (
    <FlatList
      data={lista}
      renderItem={renderCard}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={() => (
        <Text style={styles.tituloPage}>
          Tarefa
        </Text>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    height: 500,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 16,
  },
  btnArea: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 22,


  },
  imgDefault: {
    width: '100%',
    height: 250,
    borderRadius: 16,

  },

  radioText: {
    fontSize: 16,
    color: 'black',
  },
  radio: {
    width: 24,
    height: 24,
    borderColor: '#16be2e',
    borderRadius: 24,
    borderWidth: 3,
    margin: 8
  },
  wrapper: {
    flexDirection: 'column',
    alignItems: "center",
  },
  radioBg: {
    backgroundColor: '#16be2e',
    height: 12,
    width: 12,
    margin: 3,
    borderRadius: 24,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    borderRadius: 12,
  },
  btnUpload: {
    height: 22,
    width: 150,
  },
  tituloPage: {
    fontSize: 34,
    fontWeight: "800",
    marginLeft: 18,
    marginTop: 18,
    textTransform: "uppercase",
    color: '#222',
  },
  tituloCard: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    paddingBottom: 8,
    color: '#222',
    fontWeight: "800",
  }

});

export default App;
