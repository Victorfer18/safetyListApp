import AsyncStorage from "@react-native-async-storage/async-storage";

import { ApiDataType } from "../../types";

const mockedApiData: ApiDataType = {
  token: {
    token: "MAXTOKEN",
    refresh: "MAXREFRESH",
  },
  userData: {
    name: "Max",
    email: "max@dev.com",
    photo:
      "https://raw.githubusercontent.com/lgdacruz/react-native-start/master/src/assets/img/devtocruz.png",
  },
};

export const SignIn = async (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "devtocruz" && password === "123") resolve(mockedApiData);
      else reject(new Error("Credenciais inválidas"));
    }, 1000);
  });
};

export const SignOut = () => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      await AsyncStorage.removeItem("@token");
      resolve(null);
    }, 1000);
  });
};

export const GetUser = (token: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      if (!token) resolve(null);
      if (token === "JWTTOKEN") resolve(mockedApiData);
      else reject(new Error("Token expirado"));
    }, 1000);
  });
};
