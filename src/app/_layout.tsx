
import { Stack } from 'expo-router';


const StackLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="(stack)" options={{ headerShown: false }} />

        </Stack>
    );
}

export default StackLayout;
