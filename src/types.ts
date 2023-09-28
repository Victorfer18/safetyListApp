export interface AuthType {
    loading: boolean;
    globalLoading: boolean;
    userData: UserDataType;
    token: TokenType;
    LogIn: (email: string, password: string) => Promise<void>;
    LogOut: () => Promise<void>;
  }
  
  export interface UserDataType {
    name: string;
    email: string;
    photo: string;
  }
  export interface TokenType {
    token: string;
    refresh: string;
  }
  
  export interface ApiDataType {
    token?: TokenType;
    userData?: UserDataType;
  }
  export interface LoginType {
    email: string;
    password: string;
  }