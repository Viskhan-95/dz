import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import Button from '../shared/button/Button';
import { Colors } from '../constants/colors';
import Title from '../shared/title/Title';
import { Padding } from '../constants/sizes';
import Subtitle from '../shared/subtitle/Subtitle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';

export default function WelcomeScreen() {
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
		<View style={styles.container}>
			<ImageBackground source={require('../assets/images/background.png')} style={styles.image} />
			<SafeAreaView style={styles.area}>
				<View style={styles.content}>
					<Title text="Одно из самых вкусных кофе в городе!" />
					<Subtitle text="Свежие зёрна, настоящая арабика и бережная обжарка" />
					<Link href="/catalog" asChild>
						<Button title="Начать" />
					</Link>
				</View>
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: Colors.black,
		paddingHorizontal: Padding.p30,
	},
	image: {
		flex: 1,
		width: '100%',
		height: '80%',
		position: 'absolute',
	},
	area: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	content: {
		height: '42%',
		rowGap: Padding.p10,
	},
});
