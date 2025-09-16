import { Link, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../../shared/button/Button';

export default function Catalog() {
	const { id } = useLocalSearchParams();

	return (
		<View style={styles.container}>
			<Text>Products</Text>
			<Link href={'/address'} asChild>
				<Button title="Изменить адрес" />
			</Link>
			<Link href={`/products/${id}`} asChild>
				<Button title="Посмотреть" />
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
