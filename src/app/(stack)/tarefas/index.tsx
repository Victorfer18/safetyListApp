import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState, useCallback } from "react";
import {
  getInspectableList,
  saveInspectableIsClosed,
  alterStatusInspectionById,
} from "services/api";
import { router, useLocalSearchParams, useFocusEffect } from "expo-router";
import CardTarefas from "@/components/CardTarefas";

import Button from "components/Button";
import { StatusBar } from "expo-status-bar";
import HeaderTitle from "@/components/HeaderTitle";

import CurrentCompany from "@/components/CurrentInspection";
import BackgroundLayout from "@/components/BackgroundLayout";

const tarefas = () => {
  const local = useLocalSearchParams();
  const [lista, setLista] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const res = await getInspectableList(
        local.inspection_id,
        local.client_id
      );
      setLista(res.payload);
    } catch (error) {
      console.error("Erro ao carregar a lista de tarefas:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [local.inspection_id, local.client_id])
  );

  async function alterStatus() {
    if (lista.every((m) => m.is_closed == 1)) {
      await alterStatusInspectionById(local.user_id, local.inspection_id, 3);
      router.push({ pathname: "/(stack)/inspections/" + local.inspection_id });
    }
  }

  return isLoading ? (
    <View style={style.loadingContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={style.loadingText}>Carregando...</Text>
    </View>
  ) : (
    <BackgroundLayout>
      <ScrollView>
        <CurrentCompany />
        <View style={style.boxTituloPage}>
          <Text style={style.tituloPage}>Sistemas</Text>
        </View>
        <CardTarefas style={style} lista={lista} />
        <View>
          {lista.length == 0 && (
            <View style={style.boxSpace}>
              <Text style={style.msgTarefas}>
                Não há tarefas a serem realizadas para essa inspeção!
              </Text>
            </View>
          )}
          {lista.length > 0 && (
            <View style={style.boxSpacefinish}>
              <Button
                onPress={alterStatus}
                texto="Finalizar Tarefas"
                cor="#16be2e"
                line={20}
                active={lista.every((m) => m.is_closed == 1)}
              >
                <AntDesign name="checkcircleo" size={16} color="white" />
              </Button>
            </View>
          )}
        </View>
        <StatusBar style="dark" />
      </ScrollView>
    </BackgroundLayout>
  );
};

export default tarefas;

const style = StyleSheet.create({
  boxTituloPage: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  tituloPage: {
    fontSize: 34,
    fontWeight: "800",
    marginLeft: 18,
    marginTop: 18,
    textTransform: "uppercase",
    color: "#ccc",
  },
  itemContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 5,
    padding: 15,
  },
  icone: {
    height: 70,
    width: 70,
    tintColor: "#ffff",
  },

  grid: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    flex: 1,
    marginTop: 18,
  },
  task: {
    width: "42.5%",
    backgroundColor: "#be1622",

    marginLeft: "5%",
    marginBottom: "5%",
    padding: 0,
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
  taskText: {
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    color: "#f7f7f7",
    fontSize: 16,
    textAlign: "center",
    padding: 12,
  },

  icon: {
    textAlign: "center",
    padding: 18,
  },
  boxSpace: {
    margin: 18,
    borderRadius: 10,
    padding: 16,
    textAlign: "center",
    backgroundColor: "#ccc",
    color: "#555",
  },
  boxSpacefinish: {
    margin: 18,
  },
  msgTarefas: {
    fontSize: 24,
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
