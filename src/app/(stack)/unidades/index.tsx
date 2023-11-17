import React, { useState, useEffect } from 'react';
import {
	Modal,
	StyleSheet,
	Text,
	View,
	Dimensions,
	TouchableOpacity,
	ImageBackground,
	ScrollView,
	SafeAreaView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { getClientsById } from 'services/api';
import Button from 'components/Button';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import jwt from '@/services/jwt';
import { Link } from 'expo-router';

const defaultImage = { uri: 'https://safetylist.safety2u.com.br/public/images/unidades/default.jpg' }

const DropdownComponent = () => {

	const [value, setValue] = useState(null);
	const [data, setData] = useState([]);
	const [selectedImage, setSelectedImage] = useState(defaultImage);
	const [isFocus, setIsFocus] = useState(false);

	useEffect(() => {
		; (async _ => {
			const data = await jwt()
			getClientsById(data.client_id).then(res => {
				setData(res.payload.map(e => ({ label: e.info_name, value: e.client_id, image: { uri: e.image } })));
			})
		})()

	}, [])

	const [modalVisible, setModalVisible] = useState(false);

	const openModal = () => {
		setModalVisible(true);
	};

	const closeModal = () => {
		setModalVisible(false);
	};

	const selectItem = (item) => {
		setValue(item.value);
		setSelectedImage(item?.image || defaultImage);
		setModalVisible(false);
	};

	const selectedItem = data.find(item => item.value === value);
	const labelText = selectedItem ? selectedItem.label : "Unidades";
	const renderLabel = () => {
		{
			return (
				<Text style={[styles.label, isFocus && { color: 'blue' }]}>
					{labelText}
				</Text>
			);
		}
		return null;
	};

	return (
		<View style={styles.card}>

			<ImageBackground source={selectedImage} style={styles.cardImage}></ImageBackground>

			<TouchableOpacity onPress={openModal} style={styles.dropdown}>
				<Text>{selectedItem ? selectedItem.label : "Selecione um item"}</Text>
				<Entypo name="chevron-down" size={16} color="#333232" />
			</TouchableOpacity>
			<Modal
				animationType="slide"
				transparent={false}
				visible={modalVisible}
				onRequestClose={closeModal}
			>
				<SafeAreaView style={{ flex: 1 }}>
					<ScrollView>
						{data.map((item) => (
							<TouchableOpacity key={item.value} onPress={() => selectItem(item)}>
								<View style={styles.item}>
									<Text>{item.label}</Text>
								</View>
							</TouchableOpacity>
						))}
					</ScrollView>
					<TouchableOpacity onPress={closeModal} style={styles.closeModalButton}>
						<Text style={{ color: '#fff' }}>Fechar</Text>
					</TouchableOpacity>
				</SafeAreaView>
			</Modal>
			{!!value ? (
				<Link href={'/(stack)/inspections/' + value} asChild>
					<Button texto='Prosseguir' line={16} marginTop={16}>
						<MaterialIcons name="navigate-next" size={16} color="white" />
					</Button>
				</Link>
			) : (
				<Button texto='Prosseguir' line={16} marginTop={16} >
					<MaterialIcons name="navigate-next" size={16} color="white" />
				</Button>
			)}
			<StatusBar style='dark' />
		</View>
	);
};

export default DropdownComponent;

const styles = StyleSheet.create({
	fundo: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	cardImage: {
		width: '100%', // Ajuste a largura conforme necessário
		height: 270, // Ajuste a altura conforme necessário
		borderRadius: 8,
		marginTop: 16,
		backgroundColor: '#fff', // Cor de fundo para a borda
		overflow: 'hidden', // Para manter a borda arredondada
		borderWidth: 1, // Espessura da borda
		borderColor: '#d1d1d1', // Cor da borda
		shadowColor: "#000", // Cor da sombra
		shadowOffset: {
			width: 0,
			height: 4, // Quanto maior, mais distante parecerá a sombra
		},
		shadowOpacity: 0.3, // Opacidade da sombra
		shadowRadius: 5, // Suavidade da sombra
		elevation: 10, // Para Android, efeito de elevação/sombra


	},
	item: {
		marginTop: 20,
		padding: 16,
		backgroundColor: '#eee',
		borderRadius: 16,
		marginLeft: 20,
		marginRight: 20,
		color: '#222'
	},
	card: {
		backgroundColor: '#f9f9f9',
		padding: 20,
		paddingTop: 0,
		justifyContent: 'center',
		margin: 20,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#d1d1d1',
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,

	},
	dropdown: {
		marginTop: 16,
		height: 50,
		borderColor: 'gray',
		borderWidth: 0.5,
		borderRadius: 8,
		paddingHorizontal: 8,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignContent: 'center',
		alignItems: 'center',
	},
	icon: {
		marginRight: 5,
	},
	label: {
		zIndex: 999,
		paddingHorizontal: 8,
		padding: 10,
		fontSize: 18,
		textAlign: 'center',
		width: '100%',
	},
	placeholderStyle: {
		fontSize: 16,
	},
	selectedTextStyle: {
		fontSize: 16,
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
	},
	image: {
		maxWidth: Dimensions.get('window').width - 100, // 20 de margem em cada lado
		maxHeight: (Dimensions.get('window').height / 2) - 100, // Supondo que você queira que a imagem ocupe no máximo metade da altura da tela
		alignSelf: 'center',
		marginTop: -120,
	},
	customButton: {
		marginTop: 20,
		backgroundColor: '#be1622',
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
	},
	modal: {
		padding: 48,
	},
	closeModalButton: {
		alignItems: 'center',
		padding: 18,
		margin: 16,
		backgroundColor: '#be1622',
		borderRadius: 16,
	},
});
