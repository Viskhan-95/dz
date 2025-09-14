import { ImageBackground, StyleSheet, View } from 'react-native';
import Button from '../components/button/Button';
import { Colors } from '../constants/colors';
import Title from '../components/title/Title';
import { Padding } from '../constants/sizes';
import Subtitle from '../components/subtitle/Subtitle';
import { SafeAreaView } from 'react-native-safe-area-context';

const WelcomeScreen = () => {
	return (
		<View style={styles.container}>
			<ImageBackground source={require('../assets/images/background.png')} style={styles.image} />
			<SafeAreaView style={styles.area}>
				<View style={styles.content}>
					<Title text="Одно из самых вкусных кофе в городе!" />
					<Subtitle text="Свежие зёрна, настоящая арабика и бережная обжарка" />
					<Button title="Начать" />
				</View>
			</SafeAreaView>
		</View>
	);
};

export default WelcomeScreen;

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
