import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Alert, TextInput } from 'react-native';
import {
	useAddress,
	useAddressLoadable,
	useUpdateAddress,
} from '../entities/address/model/address.hooks';
import Button from '../shared/button/Button';
import Input from '../shared/input/Input';
import { Colors } from '../constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Title from '../shared/title/Title';
import * as Location from 'expo-location';
import { BorderRadius, Gap, Padding, Sizes } from '../constants/sizes';
import { useComment, useCommentLoadable, useUpdateComment } from '../entities/address/model/comment.hooks';

export default function Address() {
	const address = useAddress();
	const addressLoadable = useAddressLoadable();
	const updateAddress = useUpdateAddress();
	const comment = useComment();
	const commentLoadable = useCommentLoadable();
	const updateComment = useUpdateComment();


	const [fullAddress, setFullAddress] = useState('');
	const [commentLocal, setCommentLocal] = useState('');

	// Загружаем адрес и комментарий при монтировании
	useEffect(() => {
		if (address) {
			setFullAddress(address.fullAddress);
		}
		if (comment) {
			setCommentLocal(comment.fullComment);
		}
	}, [address]);

	const handleChangeAddress = async () => {
		try {
			// Запрашиваем разрешение на геолокацию
			const { status } = await Location.requestForegroundPermissionsAsync();

			if (status !== 'granted') {
				Alert.alert('Ошибка', 'Разрешение на геолокацию не предоставлено');
				return;
			}

			// Получаем текущую позицию
			const location = await Location.getCurrentPositionAsync({});

			// Получаем адрес по координатам
			const reverseGeocode = await Location.reverseGeocodeAsync({
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
			});

			if (reverseGeocode.length > 0) {
				const addressData = reverseGeocode[0];
				// Формируем полный адрес
				const fullAddressString = [
					addressData.street,
					addressData.streetNumber,
					addressData.city,
					addressData.region,
					addressData.country,
				]
					.filter(Boolean)
					.join(', ');

				setFullAddress(fullAddressString);
			}
		} catch (error) {
			console.error('Ошибка получения геолокации:', error);
			Alert.alert('Ошибка', 'Не удалось получить текущее местоположение');
		}
	};

	const handleSave = async () => {
		try {
			await updateAddress(fullAddress);
			await updateComment(commentLocal);
			// Возвращаемся назад после сохранения
			router.back();
		} catch (error) {
			// Показать ошибку
			console.error('Error saving address and comment:', error);
		}
	};

	if (addressLoadable.state === 'loading') {
		return <Text>Загрузка адреса...</Text>;
	}

	// if (addressLoadable.state === 'hasError') {
	// 	return <Text>Ошибка загрузки адреса</Text>;
	// }

	return (
		<View style={styles.container}>
			<SafeAreaView style={styles.area}>
				<View style={styles.header}>
					<Button backgroundColor={Colors.white} onPress={() => router.back()}>
						<Image source={require('../assets/icons/arrowLeft.png')} />
					</Button>
					<Title textSize={18} textAlign="center" text="Изменить адрес" />
					<View style={styles.placeholder} />
				</View>
				<View style={styles.content}>
					<Input
						placeholder="Добавить адрес"
						value={fullAddress}
						onChangeText={setFullAddress}
						icon={require('../assets/icons/location.png')}
						backgroundColor={Colors.white}
						color={Colors.title}
						rightComponent={
							<View style={styles.rightComponent}>
								<Button
									style={styles.button}
									width={34}
									height={34}
									borderRadius={10}
									onPress={handleChangeAddress}
								>
									<Image style={styles.icon} source={require('../assets/icons/compass.png')} />
								</Button>
							</View>
						}
					/>
					<View style={styles.commentContainer}>
						<TextInput
							multiline={true}
							placeholder="Оставьте комментарий..."
							value={commentLocal}
							onChangeText={setCommentLocal}
							style={styles.comment}
						/>
						<Image source={require('../assets/icons/comment.png')} style={styles.commentIcon} />
					</View>
				</View>
			</SafeAreaView>
			<Button padding={Padding.p20} borderRadius={BorderRadius.b16} onPress={handleSave}>
				<Text>Сохранить адрес</Text>
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
		paddingBottom: Padding.p40,
		paddingHorizontal: Padding.p30,
	},
	area: {
		flex: 1,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: Padding.p30,
	},
	placeholder: {
		width: 24,
		height: 24,
	},
	content: {
		gap: Gap.g16,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		color: Colors.textAddressTitle,
	},
	rightComponent: {},
	button: {},
	icon: {
		width: 20,
		height: 20,
	},
	commentContainer: {
		position: 'relative',
	},
	comment: {
		height: 100,
		borderWidth: 1,
		borderColor: Colors.border,
		borderRadius: 10,
		fontSize: Sizes.s14,
		fontFamily: 'Sora-Regular',
		fontWeight: '400',
		color: Colors.title,
		paddingLeft: 40,
		paddingTop: 20,
	},
	commentIcon: {
		position: 'absolute',
		left: 14,
		top: 20,
	},
});
