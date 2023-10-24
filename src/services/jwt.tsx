import AsyncStorage from '@react-native-async-storage/async-storage';
import { Buffer } from 'buffer';

export default async function() {

    const jwt = await AsyncStorage.getItem('userToken');
    const decodedString = Buffer.from(jwt?.split('.')[1]||'', 'base64').toString('utf-8');

    return JSON.parse(decodedString)

}
