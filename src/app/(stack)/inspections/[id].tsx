import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ImageBackground,
} from "react-native";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { StatusBar } from "expo-status-bar";
import { useSearchParams, useFocusEffect } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import {
  alterStatusInspectionById,
  getInspectionsByClient,
} from "services/api";
import { Link } from "expo-router";
import { setInspectionName } from "@/components/CurrentInspection";
import BackgroundLayout from "@/components/BackgroundLayout";

function formData(data: String) {
  let formatada = data?.substr(0, 10).split("-").reverse().join("/");
  return formatada == "00/00/0000" ? " - " : formatada;
}

const inspections = () => {
  const { id } = useSearchParams();
  const [lista, setLista] = useState([]);
  const [name, setName] = useState("");

  const loadData = async () => {
    if (id) {
      try {
        const res = await getInspectionsByClient(id);
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
    }, [id])
  );

  return (
    <BackgroundLayout>
      <View style={style.boxTituloPage}>
        <Text style={style.tituloPage}>Inspeções</Text>
      </View>
      <ScrollView>
        {lista.map((e, i) => (
          <Card key={i}>
            <Text style={style.titulo}>{e.inspection_name}</Text>
            <Text style={style.paragrafo}>
              Criado em: {formData(e.date_created)}
            </Text>
            <Text style={style.paragrafo}>
              Data estimada: {formData(e.date_estimated)}
            </Text>

            <Text style={style.paragrafo}>
              <Text style={style.b}> Status: &nbsp;</Text>
              <Text
                style={
                  e.status_inspection == 1
                    ? style.statusNaoIniciado
                    : style.statusIniciado
                }
              >
                {e.status_inspection_desc}
              </Text>
            </Text>
            <Link
              href={{
                pathname: "/(stack)/setores/",
                params: {
                  client_id: e.client_id,
                  inspection_id: e.inspection_id,
                  client_parent: e.client_parent,
                  user_id: e.user_id,
                  inspection_name: e.inspection_name,
                  status_inspection: parseInt(e.status_inspection),
                  inspecao: id,
                },
              }}
              asChild
            >
              <Button
                texto="Inspecionar"
                onPress={() => setInspectionName(e.inspection_name)}
                asChild
              />
            </Link>
          </Card>
        ))}
        {lista.length == 0 && (
          <View style={style.msgInspecoes}>
            <Text style={style.msg}>
              Não há inspeções a serem realizadas para essa unidade!
            </Text>
          </View>
        )}
      </ScrollView>
      <StatusBar style="dark" />
    </BackgroundLayout>
  );
};

export default inspections;

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

  b: {
    fontWeight: "bold",
  },
  titulo: {
    borderColor: "#ccc",
    borderBottomWidth: 1,
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: 8,
    marginBottom: 8,
  },
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
