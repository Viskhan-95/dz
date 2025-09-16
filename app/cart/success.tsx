import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import Button from "../../shared/button/Button";

export default function CartSuccess() {
	return (
		<View style={styles.container}>
			<Text>Поздравляем!</Text>
			<Text>Ваш заказ успешно оформлен</Text>
			<Link href="/products" asChild>
				<Button title="В каталог" />
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
