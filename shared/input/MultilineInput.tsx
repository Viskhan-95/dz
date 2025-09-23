import { StyleSheet, TextInput, View, ImageSourcePropType } from 'react-native';
import { Colors } from '../../constants/colors';
import { BorderRadius, Sizes } from '../../constants/sizes';

export default function MultilineInput({
	placeholder,
	value,
	onChangeText,
	icon,
	backgroundColor,
	color,
	rightComponent,
	numberOfLines = 4,
}: {
	placeholder: string;
	value: string;
	onChangeText: (text: string) => void;
	icon: ImageSourcePropType;
	backgroundColor?: string;
	color?: string;
	rightComponent?: React.ReactNode;
	numberOfLines?: number;
}) {
	return (
		<View style={styles.container}>
			<TextInput
				style={[
					styles.input,
					{
						backgroundColor,
						color,
						minHeight: numberOfLines * 20, // Примерная высота для numberOfLines
					},
				]}
				placeholderTextColor={Colors.placeholder}
				placeholder={placeholder}
				value={value}
				onChangeText={onChangeText}
				multiline={true}
				numberOfLines={numberOfLines}
				textAlignVertical="top" // Для Android - выравнивание текста по верху
			/>
			<View style={styles.iconContainer}>{rightComponent}</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		width: '100%',
	},
	input: {
		fontFamily: 'Sora-Regular',
		fontSize: Sizes.s14,
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: BorderRadius.b12,
		borderWidth: 1,
		borderColor: Colors.border,
		minHeight: 80, // Минимальная высота
	},
	iconContainer: {
		position: 'absolute',
		right: 12,
		top: 12,
		zIndex: 1,
	},
});

