import { Pressable, StyleSheet, Text } from 'react-native';
import { Colors } from '../../constants/colors';
import { BorderRadius, Padding } from '../../constants/sizes';

export default function SizeButton({
	size,
	onPress,
	isHover,
}: {
	size: string;
	onPress: () => void;
	isHover: boolean;
}) {
	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => [styles.button, (pressed || isHover) && styles.buttonHover]}
			hitSlop={12}
		>
			<Text style={{} as any}>{size}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: Colors.borderSecondary,
		borderRadius: BorderRadius.b12,
		padding: Padding.p10,
	},
	buttonHover: {
		color: Colors.primary,
		backgroundColor: Colors.backgroundButton,
		borderColor: Colors.primary,
	},
});
