import { createStackNavigator } from '@react-navigation/stack';
import { Initial } from './initial';
import { Settings } from './settings';
import { ThemeUse } from '../../context/theme';

const Stack = createStackNavigator();

export const Loged = () => {
    const { lightYellow, gray } = ThemeUse();
    return (
        <Stack.Navigator initialRouteName='Login'
            screenOptions={{
                headerStyle: { backgroundColor: lightYellow },
                headerTitleStyle: { color: "white" },
                cardStyle: { backgroundColor: gray },
            }}>
            <Stack.Screen name="Initial" component={Initial} />
            <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
    )
}