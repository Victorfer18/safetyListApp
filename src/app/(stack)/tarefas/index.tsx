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
  saveSectorIsClosed,
} from "services/api";
import { router, useLocalSearchParams, useFocusEffect } from "expo-router";
import CardTarefas from "@/components/CardTarefas";

import Button from "components/Button";
import { StatusBar } from "expo-status-bar";
import HeaderTitlePages from "@/components/HeaderTitlePages";
import CurrentCompany from "@/components/CurrentInspection";
import BackgroundLayout from "@/components/BackgroundLayout";
import CurrentInspection from "@/components/CurrentInspection";
import CurrentSetores from "@/components/CurrentSetores";
import RefreshableScrollView from "@/components/RefreshableScrollView";

const tarefas = () => {
  const local = useLocalSearchParams();
  const [lista, setLista] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const currentDate = new Date();
  const timestamp = currentDate.getTime();

  const loadData = async () => {
    console.log("Carregando dados...");
    setIsLoading(true);
    try {
      const res = await getInspectableList(
        local.inspection_id,
        local.client_id,
        local.sector_area_pavement_id
      );
      setLista(res.payload.inspecTables);
      if (res.payload.allClosed) {
        await saveSectorIsClosed(
          local.sector_area_pavement_id,
          local.inspection_id
        );
        router.push({
          pathname: "/(stack)/setores/",
          params: {
            client_id: local.client_id,
            inspection_id: local.inspection_id,
            client_parent: local.client_parent,
            user_id: local.user_id,
            inspection_name: local.inspection_name,
            status_inspection: parseInt(local.status_inspection),
            inspecao: local.inspecao,
          },
        })
      }
    } catch (error) {
      console.error("Erro ao carregar a lista de tarefas:", error);
    }
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [local.inspection_id, local.client_id])
  );

  return isLoading ? (
    <View style={style.loadingContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={style.loadingText}>Carregando...</Text>
    </View>
  ) : (
    <BackgroundLayout>
      <RefreshableScrollView onRefresh={loadData}>
        <CurrentInspection />
        <CurrentSetores />
        <HeaderTitlePages title="Sistemas" />
        <CardTarefas style={style} lista={lista} />
        <View>
          {lista.length == 0 && (
            <View style={style.boxSpace}>
              <Text style={style.msgTarefas}>
                Não há tarefas a serem realizadas para essa inspeção!
              </Text>
            </View>
          )}
        </View>
        <StatusBar style="dark" />
      </RefreshableScrollView>
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
