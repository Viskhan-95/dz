import { Pressable, StyleSheet, Text } from 'react-native';
import { Colors } from '../../constants/colors';
import { BorderRadius, Padding, Sizes } from '../../constants/sizes';

export default function Category({
	name,
	selected = false,
	onPress,
}: {
	name: string;
	selected: boolean;
	onPress: () => void;
}) {
	return (
		<Pressable
			style={[styles.container, selected && styles.containerSelected]}
			onPress={onPress}
			hitSlop={10}
		>
			<Text style={[styles.text, selected && styles.textSelected]}>{name}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.white,
		borderRadius: BorderRadius.b12,
		paddingHorizontal: Padding.p16,
		paddingVertical: Padding.p10,
		marginTop: Padding.p18,

	},
	text: {
		fontFamily: 'Sora-Regular',
		fontSize: Sizes.s14,
		fontWeight: '400',
		color: Colors.textSecondary,
	},
	containerSelected: {
		backgroundColor: Colors.primary,
	},
	textSelected: {
		fontFamily: 'Sora-SemiBold',
		fontWeight: '600',
		color: Colors.white,
	},
});
