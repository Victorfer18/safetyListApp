import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
  Dimensions,
  ImageBackground,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import Card from "../../../components/Card";
import Button from "components/Button";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { get_maintenance, saveInspectableIsClosed } from "services/api";
import CustomInput from "../../../components/CustomInput";
import jwt from "../../../services/jwt";
import FormTarefa from "../../../components/FormTarefa";
import MessageDisplay from "../../../components/feedBack";
import CurrentCompany from "../../../components/CurrentInspection";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import BackgroundLayout from "../../../components/BackgroundLayout";
import CurrentType from "../../../components/CurrentType";
import CurrentInspection from "../../../components/CurrentInspection";
import CurrentSetores from "../../../components/CurrentSetores";

const App = ({ ...params }: any) => {
  const [lista, setLista] = useState([]);
  const [resposta, setResposta] = useState([]);

  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messageType, setMessageType] = useState("error");
  const [ValidButton, setValidButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [checkButton, setCheckButton] = useState(0);

  const local = useLocalSearchParams();

  const windowHeight = Dimensions.get("window").height;

  useEffect(() => {
    (async () => {
      const res = await get_maintenance(
        local.system_type_id,
        local.client_id,
        local.sector_area_pavement_id,
        local.inspection_id
      );
      setValidButton(res.payload.allClosed);
    })();
  }, [checkButton]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const res = await get_maintenance(
        local.system_type_id,
        local.client_id,
        local.sector_area_pavement_id,
        local.inspection_id
      );
      setLista(res.payload.maintenances);
      setValidButton(res.payload.allClosed);
      setResposta(res.payload.maintenances);
      setIsLoading(false);
    })();
  }, []);

  function final() {
    if (ValidButton) {
      Alert.alert(
        "Tarefa Completa",
        "Tarefas finalizadas com sucesso!",
        [
          {
            text: "OK",
            onPress: () => {
              saveInspectableIsClosed(
                local.client_parent,
                local.inspection_id,
                local.system_type_id,
                local.sector_area_pavement_id
              );
              router.push({
                pathname: "/(stack)/tarefas/",
                params: {
                  client_id: local.client_parent,
                  inspection_id: local.inspection_id,
                  sector_area_pavement_id: local.sector_area_pavement_id,
                  inspection_name: local.inspection_name,
                  inspecao: local.inspecao,
                  status_inspection: local.status_inspection,
                  user_id: local.user_id,
                },
              });
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      console.log("tafarel");
    }
  }

  const render = ({ item, index }: any) => (
    <FormTarefa item={item} index={index} key={index} />
  );

  return isLoading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.loadingText}>Carregando...</Text>
    </View>
  ) : (
    <BackgroundLayout>
      <View style={{ flex: 1 }}>
        <CurrentInspection />
        <CurrentSetores />

        <KeyboardAwareScrollView extraScrollHeight={100}>
          <CurrentType />
          {lista.length === 0 ? (
            <View style={styles.boxSpace}>
              <Text style={styles.msgTarefas}>
                Não há tarefa a serem realizadas para este sistema!
              </Text>
            </View>
          ) : (
            <>
              {lista.map((item, index) => (
                <FormTarefa
                  item={item}
                  index={index}
                  key={index}
                  setCheckButton={setCheckButton}
                />
              ))}

              <View style={{ margin: 16 }}>
                <Button
                  texto="Finalizar Tarefas"
                  cor="#16be2e"
                  line={20}
                  onPress={() => {
                    if (ValidButton) {
                      final();
                    }
                  }}
                  active={ValidButton}
                >
                  <AntDesign name="checkcircleo" size={16} color="white" />
                </Button>
              </View>
            </>
          )}
        </KeyboardAwareScrollView>
      </View>
    </BackgroundLayout>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 500,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 16,
  },
  boxSpace: {
    margin: 18,
    borderRadius: 10,
    padding: 16,
    textAlign: "center",
    backgroundColor: "#ccc",
    color: "#555",
  },
  msgTarefas: {
    fontSize: 24,
  },
  btnArea: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 22,
  },
  imgDefault: {
    width: "100%",
    height: 250,
    borderRadius: 16,
  },

  radioText: {
    fontSize: 16,
    color: "black",
  },
  radio: {
    width: 24,
    height: 24,
    borderColor: "#16be2e",
    borderRadius: 24,
    borderWidth: 3,
    margin: 8,
  },
  wrapper: {
    flexDirection: "column",
    alignItems: "center",
  },
  radioBg: {
    backgroundColor: "#16be2e",
    height: 12,
    width: 12,
    margin: 3,
    borderRadius: 24,
  },

  input: {
    height: 40,
    borderColor: "gray",
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
    color: "#ccc",
  },
  tituloCard: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 12,
    paddingBottom: 8,
    color: "#222",
    fontWeight: "800",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "gray",
  },
});

export default App;
