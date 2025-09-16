import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../shared/button/Button';

export default function Address() {
	return (
		<View>
			<Text>Address</Text>
			<Link href={'/cart'} asChild>
				<Button title="Сохранить" />
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
