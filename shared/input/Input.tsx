import { Image, StyleSheet, TextInput, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { BorderRadius, Sizes } from '../../constants/sizes';

export default function Input({ placeholder, value, onChangeText }: { placeholder: string, value: string, onChangeText: (text: string) => void }) {
	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholderTextColor={Colors.placeholder}
				placeholder={placeholder}
				value={value}
				onChangeText={onChangeText}
			></TextInput>
			<Image source={require('../../assets/icons/search.png')} style={styles.icon} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '80%',
		alignSelf: 'center',
	},
	input: {
		height: 50,
		fontFamily: 'Sora-Regular',
		fontWeight: '400',
		backgroundColor: Colors.background,
		fontSize: Sizes.s14,
		borderRadius: BorderRadius.b16,
		position: 'relative',
		paddingLeft: 48,
		color: Colors.white,
	},
	icon: {
		width: 20,
		height: 20,
		position: 'absolute',
		left: 16,
		top: 16,
	},
});
