import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../../shared/button/Button';

export default function ProductPage() {

	return (
		<View style={styles.container}>
			<Text>О продукте</Text>
			<Link href={'/cart'} asChild>
				<Button>В корзину</Button>
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
