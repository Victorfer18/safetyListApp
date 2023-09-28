import { createStackNavigator } from '@react-navigation/stack';
import { Create } from './create';
import { Login } from './login';
import { ThemeUse } from '../../context/theme';
import { ImageBackground } from 'react-native';
import { Image } from 'react-native';



const Stack = createStackNavigator();



export const Unloged = () => {
    const { lightYellow } = ThemeUse();
    return (
        <ImageBackground source={require('../../assets/images/login/background.png')} style={{ flex: 1 }}>
            <Stack.Navigator initialRouteName='Login'
                screenOptions={{
                    headerStyle: { backgroundColor: lightYellow },
                    headerTitleStyle: { color: "white" },
                    cardStyle: { backgroundColor: 'transparent' },
                }}>
                <Stack.Screen name="Login" component={Login} options={{}} />
                <Stack.Screen name="Create" component={Create} />
            </Stack.Navigator>
        </ImageBackground>
    )
}