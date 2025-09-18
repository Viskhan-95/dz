import { StyleSheet, Text } from 'react-native';
import { Sizes } from '../../constants/sizes';
import { Colors } from '../../constants/colors';

export default function Subtitle({ text }: { text: string }) {
	return <Text style={styles.subtitle}>{text}</Text>;
}

const styles = StyleSheet.create({
	subtitle: {
		fontFamily: 'Sora-Regular',
		fontSize: Sizes.s12,
		fontWeight: '400',
		color: Colors.subtitle,
	},
});
