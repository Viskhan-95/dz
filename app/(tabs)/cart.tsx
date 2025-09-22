import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../../shared/button/Button';

export default function Cart() {
	return (
		<View style={styles.container}>
			<Text>Cart</Text>
			<Link href="/cart/success" asChild>
				<Button>Оформить заказ</Button>
			</Link>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
});
