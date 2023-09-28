import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

import { GetUser, SignIn, SignOut } from "../../services/auth";
import { ApiDataType, AuthType, TokenType, UserDataType } from "../../types";

export const AuthContext = createContext<AuthType>({} as AuthType);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [userData, setUserData] = useState<UserDataType>({} as UserDataType);
  const [token, setToken] = useState<TokenType>({} as TokenType);

  useEffect(() => {
    AuthVerify();
  }, []);

  const AuthVerify = async () => {
    setGlobalLoading(true);
    try {
      const token = await AsyncStorage.getItem("@token");
      const Data: ApiDataType = await GetUser(token);
      setUserData(Data?.userData);
      setToken(Data?.token);
    } catch (error) {
      setUserData(null);
      setToken(null);
      Alert.alert(error.message);
    } finally {
      setGlobalLoading(false);
    }
  };

  const LogIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const Data: ApiDataType = await SignIn(email, password);
      await AsyncStorage.setItem("@token", Data?.token.token);
      setUserData(Data?.userData);
      setToken(Data?.token);
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  const LogOut = async () => {
    setLoading(true);
    try {
      await SignOut();
      setUserData(null);
      setToken(null);
    } catch {
      Alert.alert("Erro ao deslogar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ globalLoading, loading, LogIn, LogOut, token, userData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthUse = () => {
  const context = useContext(AuthContext);
  return context;
};
