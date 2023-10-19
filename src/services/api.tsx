import axios from 'axios';

const BASE_URL = 'https://safetylist.safety2u.com.br/public';
const TOKEN = 'YOUR_BEARER_TOKEN';

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${TOKEN}`
	}
});

export const getInspectionsByClient = async (clientId: number) => {
	try {
		const response = await axiosInstance.get(`/inspections/${clientId}`);
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

export const alterStatusInspectionById = async (inspectionId: number, status: number) => {
	try {
		const requestBody = {
			user_id: 82,
			status_inspection: status
		};
		const response = await axiosInstance.put(`/inspections/alter_status/${inspectionId}`, requestBody);
		return response.data;
	} catch (error) {
		throw new Error('Erro ao alterar o status da inspecao por ID');
	}
};

export const getClientsById = async (clientId: number) => {
	try {
		const response = await axiosInstance.get(`/clients/${clientId}`);
		return response.data;
	} catch (error) {
		throw new Error('Erro ao obter clientes por ID');
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
		throw new Error('Erro ao fazer login');
	}
};
