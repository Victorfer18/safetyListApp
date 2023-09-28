import styled from "styled-components/native";


export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image`
  width: 210px;
  height: 55px;
  align-self: center;
`;

export const InputForm = styled.TextInput`
  font-size: 16px;
  background: white;
  width: 100%;
  height: 100%;
  padding: 0 15px;
  border-radius: 10px;

`;
export const BoxContainer = styled.View`
  width: 80%;
  padding: 20px;
  border: 1px solid #e0e0e0; 
  border-radius: 10px;
  align-items: center;
  background-color: rgba(247, 204, 109, 0.5);
  margin-top: 20px;
`;

export const Form = styled.View``;
export const FormSection = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  margin: 10px 0;
  
`;
interface button {
  margin?: number;
  windth?: number;
  color?: string;
}
export const ButtonD = styled.Pressable<button>`
  background: ${(props) => (props.color ? props.color : "red")};
  margin: ${(props) => (props.margin ? `${props.margin}px` : "0px")};
  width: ${(props) => (props.windth ? `${props.windth}px` : "100%")};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  padding: 10px;
`;
export const TextButton = styled.Text<button>`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => (props.color ? props.color : "#e5e4e2")};
`;