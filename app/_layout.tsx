import { Stack, SplashScreen } from 'expo-router';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded] = useFonts({
		'Sora-Bold': require('../assets/fonts/Sora-Bold.ttf'),
		'Sora-SemiBold': require('../assets/fonts/Sora-SemiBold.ttf'),
		'Sora-Regular': require('../assets/fonts/Sora-Regular.ttf'),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) return null;

	return (
		<>
			<StatusBar style="light" backgroundColor="#000" translucent={false} />

			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="index" />
				<Stack.Screen name="address" />
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			</Stack>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
});
