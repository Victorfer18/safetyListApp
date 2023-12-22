import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ImageBackground,
} from "react-native";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import { StatusBar } from "expo-status-bar";
import {
  useSearchParams,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import { useEffect, useState, useCallback } from "react";
import {
  alterStatusInspectionById,
  getInspectionsByClient,
  getSectorsByIdInspection,
} from "services/api";
import { Link } from "expo-router";
import { setInspectionName } from "@/components/CurrentInspection";
import BackgroundLayout from "@/components/BackgroundLayout";
import HeaderTitlePages from "@/components/HeaderTitlePages";
import AsyncStorage from "@react-native-async-storage/async-storage";

function formData(data: String) {
  let formatada = data?.substr(0, 10).split("-").reverse().join("/");
  return formatada == "00/00/0000" ? " - " : formatada;
}

function alterStatus(user_id, inspection_id, status_inspection) {
  if (status_inspection == 1) {
    alterStatusInspectionById(user_id, inspection_id, 2);
  }
}

const setores = () => {
  const local = useLocalSearchParams();
  const [lista, setLista] = useState([]);
  const [name, setName] = useState("");
  const id = local.inspection_id;
  const loadData = async () => {
    let InspectionName = (await AsyncStorage.getItem("CurrentNamePage")) || "";

    if (id) {
      try {
        const res = await getSectorsByIdInspection(id);
        setLista(res.payload);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    } else {
      console.log("Carregando...");
    }
  };
  useFocusEffect(
    useCallback(() => {
      loadData();
      console.log(id);
    }, [id])
  );

  return (
    <BackgroundLayout>
      <HeaderTitlePages title="Setores" />
      <ScrollView>
        {lista.length !== 0 &&
          (lista.sectors.length !== 0 ? (
            lista.sectors.map((e, i) => (
              <Card key={i}>
                <View style={style.containerBoxCard}>
                  <Text style={style.titulo}>{e.fullSectorName}</Text>
                </View>
                <Link
                  href={{
                    pathname: `/(stack)/${
                      e.is_closed === 0 ? "tarefas" : "setores"
                    }/`,
                    params: {
                      client_id: local.client_id,
                      inspection_id: local.inspection_id,
                      client_parent: local.client_parent,
                      user_id: local.user_id,
                      inspection_name: local.inspection_name,
                      inspecao: id,
                    },
                  }}
                  onPress={() => setInspectionName(e.fullSectorName)}
                  asChild
                >
                  <Button
                    texto="Inspecionar"
                    active={e.is_closed === 0 ? true : false}
                    // onPress={() => {
                    //   alterStatus(e.user_id, e.inspection_id, e.status_inspection);
                    // }}
                  />
                </Link>
              </Card>
            ))
          ) : (
            <View style={style.msgInspecoes}>
              <Text style={style.msg}>
                Não há setores a serem inspecionados para essa inspeção!
              </Text>
            </View>
          ))}
      </ScrollView>
      <StatusBar style="dark" />
    </BackgroundLayout>
  );
};

export default setores;

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  containerBoxCard: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  b: {
    fontWeight: "bold",
  },
  titulo: {
    borderColor: "#ccc",
    borderBottomWidth: 1,
    fontSize: 24,
    fontWeight: "bold",
  },
  paragrafo: {
    fontSize: 16,
    marginTop: 8,
  },
  msgInspecoes: {
    borderRadius: 10,
    backgroundColor: "#ccc",
    padding: 16,
    textAlign: "center",
    color: "#555",
    margin: 16,
  },
  msg: {
    fontSize: 24,
  },
  statusNaoIniciado: {
    fontWeight: "bold",
    color: "#6c757d",
  },
  statusIniciado: {
    fontWeight: "bold",
    color: "#0d6efd",
  },
});
