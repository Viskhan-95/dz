import { StyleSheet, Text } from 'react-native';
import { Sizes } from '../../constants/sizes';
import { Colors } from '../../constants/colors';

export default function Title ({ text }: { text: string }) {
	return <Text style={styles.title}>{text}</Text>;
};


const styles = StyleSheet.create({
	title: {
		fontFamily: 'Sora-SemiBold',
		fontSize: Sizes.s16,
		fontWeight: '600',
		color: Colors.title,
	},
});
