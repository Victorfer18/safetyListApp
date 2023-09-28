import { useState } from "react";
import { ActivityIndicator } from "react-native";

import { AuthUse } from "../../../context/auth";
import { ThemeUse } from "../../../context/theme";
import { BoxContainer } from "./index.Styled";
import { LoginType } from "../../../types";
import {
    ButtonD,
    Container,
    Form,
    FormSection,
    InputForm,
    Logo,
    TextButton,
} from "./index.Styled";

export const Login = ({ navigation }) => {
    const [form, setForm] = useState<LoginType>({} as LoginType);

    const { LogIn, loading } = AuthUse();
    const { lightYellow, red } = ThemeUse();

    return (
        <Container>
            <BoxContainer>
                <Logo source={require("../../../assets/images/logo/safety-list.png")} />

                <Form>
                    <FormSection>
                        <InputForm
                            value={form.email}
                            autoCapitalize="none"
                            placeholder="Login"
                            onChangeText={(value: string) => {
                                setForm((prev) => {
                                    return { ...prev, email: value };
                                });
                            }}
                        />
                    </FormSection>

                    <FormSection>
                        <InputForm
                            placeholder="Senha"
                            onChangeText={(value: string) => {
                                setForm((prev) => {
                                    return { ...prev, password: value };
                                });
                            }}
                            value={form.password}
                            secureTextEntry
                        />
                    </FormSection>
                </Form>

                {loading ? (
                    <ActivityIndicator size="large" color={lightYellow} />
                ) : (
                    <ButtonD onPress={() => LogIn(form?.email, form?.password)} margin={10}>
                        <TextButton>Acessar</TextButton>
                    </ButtonD>
                )}
            </BoxContainer>
            <ButtonD
                onPress={() => navigation.navigate("Create")}
                color="transparent"
                margin={40}
                windth={200}
            >
                <TextButton>Criar conta</TextButton>
            </ButtonD>
        </Container >
    );
};