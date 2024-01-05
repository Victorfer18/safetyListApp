import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Buffer } from "buffer";
import NetInfo from "@react-native-community/netinfo";
import * as Crypto from "expo-crypto";

export const getJWT = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    const base64Jwt = token?.split(".")[1];
    const decode = Buffer.from(base64Jwt, "base64").toString("ascii");
    return JSON.parse(decode);
  } catch (error) {
    throw error;
  }
};

export const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    return token;
  } catch (error) {
    throw error;
  }
};

const BASE_URL = "https://safetylist.safety2u.com.br/public";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const setAuthToken = async () => {
  const token = await getAuthToken();
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

export const getInspectionsByClient = async (clientId: number) => {
  await setAuthToken();
  let seed = { fn: "getInspectionsByClient", clientId };
  if (await isOff()) {
    return await loadData(seed);
  }
  try {
    const response = await axiosInstance.get(`/inspections/${clientId}`);
    await saveData(seed, response.data);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao obter inspecoes por cliente");
  }
};

export const getSectorsByIdInspection = async (inspectionId: number) => {
  await setAuthToken();
  let seed = { fn: "getSectorsByIdInspection", inspectionId };
  if (await isOff()) {
    return await loadData(seed);
  }
  try {
    const response = await axiosInstance.get(
      `/inspections/getSectorsByIdInspection/${inspectionId}`
    );
    await saveData(seed, response.data);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao obter inspecoes por Inspeção");
  }
};

export const getInspectableList = async (
  inspection_id: number,
  client_id: number,
  sector_area_pavement_id: number
) => {
  await setAuthToken();
  let seed = {
    fn: "getInspectableList",
    client_id,
    inspection_id,
    sector_area_pavement_id,
  };
  if (await isOff()) {
    return await loadData(seed);
  }
  try {
    const body = {
      inspection_id,
      client_id,
      sector_area_pavement_id,
    };
    const response = await axiosInstance.post(
      "/inspections/getInspectableList",
      body
    );
    await saveData(seed, response.data);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao obter inspecoes por cliente");
  }
};

export const saveInspectableIsClosed = async (
  clientParent: number,
  inspectionId: number,
  systemTypeId: number,
  sector_area_pavement_id: number
) => {
  await setAuthToken();
  try {
    const requestBody = {
      client_parent: clientParent,
      inspection_id: inspectionId,
      system_type_id: systemTypeId,
      sector_area_pavement_id: sector_area_pavement_id,
    };
    const response = await axiosInstance.post(
      "/inspections/set_is_closed",
      requestBody
    );
    return response.data;
  } catch (error) {
    throw new Error("Erro ao salvar inspecao como fechada");
  }
};

export const saveSectorIsClosed = async (
  sector_area_pavement_id: number,
  inspectionId: number
) => {
  await setAuthToken();
  try {
    const requestBody = {
      sector_area_pavement_id: sector_area_pavement_id,
      inspection_id: inspectionId,
    };
    const response = await axiosInstance.post(
      "/inspections/set_is_closed_sector",
      requestBody
    );
    return response.data;
  } catch (error) {
    throw new Error("Erro ao salvar inspecao como fechada");
  }
};

export const register_maintenance = async (
  system_type_id: any,
  maintenance_type_id: any,
  user_id: any,
  client_parent: any,
  consistency_status: any,
  observation: any,
  action: any,
  imageUri: any,
  inspection_id: any,
  sys_app_maintenances_id: any
) => {
  await setAuthToken();

  if (await isOff()) {
    let dataPut = await loadData({ list: true });
    if (dataPut?.data) {
      dataPut.data = [];
    }
    dataPut.data.push({
      system_type_id,
      maintenance_type_id,
      user_id,
      client_parent,
      consistency_status,
      observation,
      action,
      imageUri,
      inspection_id,
      sys_app_maintenances_id,
    });

    await saveData({ list: true }, dataPut);
  }

  try {
    const file = await fetch(imageUri);
    const theBlob = await file.blob();
    theBlob.lastModifiedDate = new Date();
    theBlob.uri = imageUri;
    theBlob.name = "teste.jpg";
    theBlob.type = "image/jpg";

    const form = new FormData();
    form.append("system_type_id", system_type_id);
    form.append("maintenance_type_id", maintenance_type_id);
    form.append("user_id", user_id);
    form.append("client_parent", client_parent);
    form.append("consistency_status", consistency_status ? "1" : "0");
    form.append("observation", observation);
    form.append("action", action);
    form.append("image", theBlob);
    form.append("inspection_id", inspection_id);
    form.append("sys_app_maintenances_id", sys_app_maintenances_id);
    console.log(form);
    const response = await axiosInstance.post(
      "/inspections/register_maintenance",
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        transformRequest: (d) => d,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error("Entrada inválida");
  }
};

export const alterStatusInspectionById = async (
  user_id: any,
  inspectionId: any,
  status: any
) => {
  await setAuthToken();
  try {
    const requestBody = {
      user_id: user_id,
      status_inspection: status,
      inspection_id: inspectionId,
    };
    const response = await axiosInstance.put(
      `/inspections/alter_status`,
      requestBody
    );
    return response.data;
  } catch (error) {
    throw new Error("Erro ao alterar o status da inspecao por ID");
  }
};

export const getClientsById = async () => {
  await setAuthToken();
  let seed = { fn: "getClientsById" };
  if (await isOff()) {
    return await loadData(seed);
  }
  try {
    const response = await axiosInstance.get(`/clients`);
    await saveData(seed, response.data);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao obter clientes por ID");
  }
};

export const validateJwt = async (clientId: number) => {
  await setAuthToken();
  try {
    const response = await axiosInstance.get(`/validate_jwt`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao obter validar JWT");
  }
};

export const get_maintenance = async (
  system_type_id: number,
  client_id: number,
  sector_area_pavement_id: number,
  inspection_id: number
) => {
  try {
    const requestBody = {
      system_type_id,
      client_id,
      sector_area_pavement_id,
      inspection_id,
    };
    const response = await axiosInstance.post(
      "/inspections/get_maintenance",
      requestBody
    );
    return response.data;
  } catch (error) {
    throw new Error("Erro ao resgatar pergunta");
  }
};

const getErrorMessage = async (error) => {
  const netInfo = await NetInfo.fetch();
  if (!netInfo.isConnected) {
    return "Você está offline. Verifique sua conexão com a internet.";
  }

  if (error.response) {
    const status = error.response.status;
    switch (status) {
      case 500:
        return "Erro interno do servidor.";
      default:
        return error.response.data.message;

    }
  } else if (error.request) {
    return "Não foi possível obter uma resposta do servidor.";
  } else {
    return "Ocorreu um erro ao fazer a requisição.";
  }
};

export const login = async (userEmail, userPassword) => {
  try {
    const requestBody = {
      user_email: userEmail,
      user_password: userPassword,
    };
    const response = await axiosInstance.post("/login", requestBody);
    return response.data;
  } catch (error) {
    throw new Error(await getErrorMessage(error));
  }
};

async function isOff() {
  let net = await NetInfo.fetch();
  return !net.isConnected;
}

const saveData = async (seed: any, data: any) => {
  const salt = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    JSON.stringify(seed)
  );
  try {
    await AsyncStorage.setItem("$" + salt, JSON.stringify(data));
  } catch (e) {
    // salvar erro
  }
};

const loadData = async (seed: any) => {
  const salt = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    JSON.stringify(seed)
  );
  try {
    const value = await AsyncStorage.getItem("$" + salt);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    return {};
  }
  return {};
};
async function sincronizar() {
  if (!(await isOff())) {
    let dataPut = await loadData({ list: true });
    dataPut?.data?.forEach(async (payload: any) => {
      try {
        await register_maintenance(
          payload.system_type_id,
          payload.maintenance_type_id,
          payload.user_id,
          payload.client_parent,
          payload.consistency_status,
          payload.observation,
          payload.action,
          payload.imageUri,
          payload.inspection_id,
          payload.sys_app_maintenances_id
        );
        dataPut.data = dataPut.data.filter(
          (i: any) => payload.imageUri != i.imageUri
        );
      } catch (error) { }
      await saveData({ list: true }, dataPut);
    });
  }
}
sincronizar();
