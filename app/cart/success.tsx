import { router } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';
import Button from '../../shared/button/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import Title from '../../shared/title/Title';
import { Colors } from '../../constants/colors';
import { Padding } from '../../constants/sizes';
import * as Notificaitons from 'expo-notifications';
import { clearCartAtom } from '../../entities/product/api/cartApi';
import { useSetAtom } from 'jotai';

export default function CartSuccess() {
	const clearCart = useSetAtom(clearCartAtom);
	const allowsNotification = async () => {
		const settings = await Notificaitons.getPermissionsAsync();
		return (
			settings.granted || settings.ios?.status == Notificaitons.IosAuthorizationStatus.PROVISIONAL
		);
	};

	const requestPermissions = async () => {
		return Notificaitons.requestPermissionsAsync();
	};

	const scheduleNotification = async () => {
		const granted = await allowsNotification();
		if (!granted) {
			await requestPermissions();
		}
		await Notificaitons.scheduleNotificationAsync({
			content: {
				title: 'Заказ оформлен',
				body: 'Ваш кофе готов',
				data: { success: true },
			},
			trigger: {
				seconds: 10,
				type: Notificaitons.SchedulableTriggerInputTypes.TIME_INTERVAL,
			},
		});
		clearCart();
		router.push('(tabs)');
	};
	return (
		<View style={styles.container}>
			<SafeAreaView style={styles.area}>
				<View style={styles.header}>
					<Button backgroundColor={Colors.white} onPress={() => router.back()}>
						<Image source={require('../../assets/icons/arrowLeft.png')} />
					</Button>
					<Title textSize={18} textAlign="left" text="Заказ оформлен" />
					<View style={styles.placeholder} />
				</View>
				<View style={styles.content}>
					<Image source={require('../../assets/icons/success.png')} />
				</View>
				<Button padding={20} borderRadius={16} onPress={() => scheduleNotification()}>
					<Text>На главную</Text>
				</Button>
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	area: {
		flex: 1,
		justifyContent: 'space-between',
		paddingHorizontal: Padding.p30,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	placeholder: {
		width: 24,
		height: 24,
	},
	content: {
		alignItems: 'center',
	},
});
