import { StyleSheet, TextInput, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { BorderRadius, Sizes } from '../../constants/sizes';

export default function TextArea({
	placeholder,
	value,
	onChangeText,
	backgroundColor,
	color,
	numberOfLines = 4,
	style,
}: {
	placeholder: string;
	value: string;
	onChangeText: (text: string) => void;
	backgroundColor?: string;
	color?: string;
	numberOfLines?: number;
	style?: any;
}) {
	return (
		<View style={[styles.container, style]}>
			<TextInput
				style={[
					styles.textArea,
					{
						backgroundColor: backgroundColor || Colors.white,
						color: color || Colors.text,
						minHeight: numberOfLines * 20,
					},
				]}
				placeholderTextColor={Colors.placeholder}
				placeholder={placeholder}
				value={value}
				onChangeText={onChangeText}
				multiline={true}
				numberOfLines={numberOfLines}
				textAlignVertical="top"
				scrollEnabled={true}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},
	textArea: {
		fontFamily: 'Sora-Regular',
		fontSize: Sizes.s14,
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: BorderRadius.b12,
		borderWidth: 1,
		borderColor: Colors.border,
		minHeight: 80,
		maxHeight: 200, // Максимальная высота с прокруткой
	},
});

