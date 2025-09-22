import { StyleSheet, Text } from 'react-native';
import { Colors } from '../../constants/colors';

export default function Title({
	text,
	textSize = 16,
	textAlign = 'left',
}: {
	text: string;
	textSize: number;
	textAlign: 'left' | 'center' | 'right';
}) {
	return <Text style={{ ...styles.title, fontSize: textSize, textAlign }}>{text}</Text>;
}

const styles = StyleSheet.create({
	title: {
		fontFamily: 'Sora-SemiBold',
		fontWeight: '600',
		color: Colors.title,
	},
});
