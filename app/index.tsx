import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import Button from '../shared/button/Button';
import { Colors } from '../constants/colors';
import { BorderRadius, Margin, Padding, Sizes } from '../constants/sizes';
import AnimatedText from '../shared/animatedText/AnimatedText';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

export default function WelcomeScreen() {
	return (
		<View style={styles.container}>
			<ImageBackground source={require('../assets/images/background.png')} style={styles.image} />
			<SafeAreaProvider style={styles.area}>
				<View style={styles.content}>
					<AnimatedText text="Одно из самых вкусных кофе в городе!" />
					<Text style={styles.subtitle}>Свежие зёрна, настоящая арабика и бережная обжарка</Text>
					<Link href="/(tabs)" asChild>
						{/* <Link href="/cart/order" asChild> */}
						<Button padding={Padding.p20} borderRadius={BorderRadius.b16} borderWidth={0}>
							<Text>Начать</Text>
						</Button>
					</Link>
				</View>
			</SafeAreaProvider>
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
	subtitle: {
		fontFamily: 'Sora-Regular',
		fontSize: Sizes.s14,
		fontWeight: '400',
		color: Colors.text,
		textAlign: 'center',
		paddingHorizontal: Padding.p20,
		marginBottom: Margin.m20,
		lineHeight: Sizes.s14 * 1.5,
	},
});
