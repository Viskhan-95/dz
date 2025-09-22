import { StyleSheet, Text } from 'react-native';
import { Colors } from '../../constants/colors';

export default function Subtitle({ text, textSize = 12 }: { text: string; textSize?: number }) {
	return <Text style={{ ...styles.subtitle, fontSize: textSize }}>{text}</Text>;
}

const styles = StyleSheet.create({
	subtitle: {
		fontFamily: 'Sora-Regular',
		fontWeight: '400',
		color: Colors.subtitle,
	},
});
