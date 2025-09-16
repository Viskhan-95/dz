import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function RootLayout() {
	return <Stack />;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
});