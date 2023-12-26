import { StyleSheet, View, Text, ScrollView } from "react-native";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import { StatusBar } from "expo-status-bar";
import {
  useSearchParams,
  router,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import { useEffect, useState, useCallback } from "react";
import {
  alterStatusInspectionById,
  getSectorsByIdInspection,
} from "services/api";
import { Link } from "expo-router";

import BackgroundLayout from "@/components/BackgroundLayout";
import HeaderTitlePages from "@/components/HeaderTitlePages";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CurrentInspection from "@/components/CurrentInspection";
import { setSetoresName } from "@/components/CurrentSetores";
import { AntDesign } from "@expo/vector-icons";
import ConfirmableButton from "components/ConfirmableButton";

function formData(data: String) {
  let formatada = data?.substr(0, 10).split("-").reverse().join("/");
  return formatada == "00/00/0000" ? " - " : formatada;
}

const setores = () => {
  const local = useLocalSearchParams();
  const [lista, setLista] = useState([]);
  const [name, setName] = useState("");
  const [ValidButton, setValidButton] = useState(false);
  const id = local.inspection_id;
  const loadData = async () => {
    if (id) {
      try {
        const res = await getSectorsByIdInspection(id);
        setLista(res.payload);
        setValidButton(res.payload.allClosed);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    } else {
      console.log("Carregando...");
    }
  };
  useFocusEffect(() => {
    loadData();
  });

  async function alterStatus() {
    if (ValidButton) {
      await alterStatusInspectionById(local.user_id, local.inspection_id, 3);
      router.push({ pathname: "/(stack)/inspections/" + local.inspection_id });
    }
  }

  return (
    <BackgroundLayout>
      <CurrentInspection />
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
                    pathname: `/(stack)/${e.is_closed === 0 ? "tarefas" : "setores"
                      }/`,
                    params: {
                      client_id: local.client_id,
                      inspection_id: local.inspection_id,
                      client_parent: local.client_parent,
                      sector_area_pavement_id: e.sector_area_pavement_id,
                      inspection_name: local.inspection_name,
                      inspecao: id,
                      status_inspection: local.status_inspection,
                      user_id: local.user_id,
                    },
                  }}
                  onPress={() => console.log({
                    client_id: local.client_id,
                    inspection_id: local.inspection_id,
                    client_parent: local.client_parent,
                    sector_area_pavement_id: e.sector_area_pavement_id,
                    inspection_name: local.inspection_name,
                    inspecao: id,
                    status_inspection: local.status_inspection,
                    user_id: local.user_id,

                  })}
                  asChild
                >
                  <Button
                    texto="Inspecionar"
                    active={e.is_closed === 0 ? true : false}
                    onPress={() => setSetoresName(e.fullSectorName)}
                    asChild
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
        <View style={style.boxSpacefinish}>
          <ConfirmableButton
            buttonText="Finalizar Setores"
            onConfirm={() => alterStatus}
            color="#16be2e"
            active={ValidButton}
            modalProps={{
              title: "Confirmação de Finalização",
              message:
                "Declaro que efetuei a conferência nos dados captados neste Check list, com a ciência que as informações aqui descritas refletem exatamente as condições reais inspecionadas e são de minha inteira responsabilidade.",
              confirmText: "Confirmar",
              cancelText: "Cancelar",
            }}
          />
        </View>
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
  boxSpacefinish: {
    margin: 18,
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
