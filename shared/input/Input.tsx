import { Image, ImageSourcePropType, StyleSheet, TextInput, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { BorderRadius, Padding, Sizes } from '../../constants/sizes';
import { ReactNode } from 'react';

export default function Input({
	placeholder,
	value,
	onChangeText,
	icon,
	rightComponent,
	backgroundColor,
	color
}: {
	placeholder: string;
	value: string;
	onChangeText: (text: string) => void;
	icon: ImageSourcePropType;
	rightComponent?: ReactNode;
	backgroundColor: string;
	color: string;
}) {
	return (
		<View style={styles.container}>
			<TextInput
				style={[styles.input, { backgroundColor, color }]}
				placeholderTextColor={Colors.placeholder}
				placeholder={placeholder}
				value={value}
				onChangeText={onChangeText}
			></TextInput>
			<Image source={icon} style={styles.icon} />
			<View style={styles.rightComponent}>
				{rightComponent}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		position: 'relative',
	},
	input: {
		height: 50,
		fontFamily: 'Sora-Regular',
		fontWeight: '400',
		fontSize: Sizes.s14,
		borderRadius: BorderRadius.b16,
		paddingLeft: 44,
		borderWidth: 1,
		borderColor: Colors.border,
	},
	icon: {
		width: 20,
		height: 20,
		position: 'absolute',
		left: 14,
		top: 15,
	},
	rightComponent: {
		position: 'absolute',
		right: 10,
		top: 8,
	},
});
