import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



const getAuthToken = async () => {
	try {
		const token = await AsyncStorage.getItem('userToken');
		return token;
	} catch (error) {
		throw error;
	}
};

const BASE_URL = 'https://safetylist.safety2u.com.br/public';

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	}
});

const setAuthToken = async () => {
	const token = await getAuthToken();
	if (token) {
		axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	}
};


export const getInspectionsByClient = async (clientId: number) => {
	await setAuthToken();
	try {
		const response = await axiosInstance.get(`/inspections/${clientId}`);
		return response.data;
	} catch (error) {
		throw new Error('Erro ao obter inspecoes por cliente');
	}
};

export const getInspectableList = async (inspection_id: number, client_id: number) => {
	await setAuthToken();
	try {
		const body = {
			inspection_id,
			client_id
		};
		const response = await axiosInstance.post('/inspections/getInspectableList', body
		);
		return response.data;
	} catch (error) {
		throw new Error('Erro ao obter inspecoes por cliente');
	}
};

export const saveInspectableIsClosed = async (
	clientId: number,
	inspectionId: number,
	systemTypeId: number
) => {
	await setAuthToken();
	try {
		const requestBody = {
			client_id: clientId,
			inspection_id: inspectionId,
			system_type_id: systemTypeId
		};
		const response = await axiosInstance.post('/inspections/save_is_closed', requestBody);
		return response.data;
	} catch (error) {
		throw new Error('Erro ao salvar inspecao como fechada');
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
	imageUri: any
) => {
	await setAuthToken();
	try {
		const file = await fetch(imageUri);
		const theBlob = await file.blob();
		theBlob.lastModifiedDate = new Date();
		theBlob.uri = imageUri
		theBlob.name = 'teste.jpg'
		theBlob.type = 'image/jpg'

		const form = new FormData();
		form.append('system_type_id', system_type_id);
		form.append('maintenance_type_id', maintenance_type_id);
		form.append('user_id', user_id);
		form.append('client_parent', client_parent);
		form.append('consistency_status', consistency_status);
		form.append('observation', observation);
		form.append('action', action);
		form.append('image', theBlob._data.name);
		const response = await axiosInstance.post('/inspections/register_maintenance', form, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			transformRequest: d => d,
		});
		return response.data;

	} catch (error) {
		throw new Error(`Erro ao salvar Tarefa: ${error.message}`);
	}

};

export const alterStatusInspectionById = async (user_id: number, inspectionId: number, status: number) => {
	await setAuthToken();
	try {
		const requestBody = {
			user_id: user_id,
			status_inspection: status,
			inspection_id: inspectionId
		};
		const response = await axiosInstance.put(`/inspections/alter_status`, requestBody);
		return response.data;
	} catch (error) {
		throw new Error('Erro ao alterar o status da inspecao por ID');
	}
};

export const getClientsById = async (clientId: number) => {
	await setAuthToken();
	try {
		const response = await axiosInstance.get(`/clients/${clientId}`);
		return response.data;
	} catch (error) {
		throw new Error('Erro ao obter clientes por ID');
	}
};

export const validateJwt = async (clientId: number) => {
	await setAuthToken();
	try {
		const response = await axiosInstance.get(`/validate_jwt`);
		return response.data;
	} catch (error) {
		throw new Error('Erro ao obter validar JWT');
	}
};


export const get_maintenance_type = async (system_type_id: number, client_id: number) => {
	try {
		const requestBody = {
			system_type_id,
			client_id
		};
		const response = await axiosInstance.post('/inspections/get_maintenance_type', requestBody);
		return response.data;
	} catch (error) {
		throw new Error('Erro ao resgatar pergunta');
	}
};



export const login = async (userEmail: string, userPassword: string) => {
	try {
		const requestBody = {
			user_email: userEmail,
			user_password: userPassword
		};
		const response = await axiosInstance.post('/login', requestBody);
		return response.data;
	} catch (error) {
		throw new Error(error.response.data.message);
	}
};
