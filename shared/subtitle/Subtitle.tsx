import { StyleSheet, Text, TextProps } from 'react-native';
import { Padding, Sizes } from '../../constants/sizes';
import { Colors } from '../../constants/colors';

const Subtitle = ({ text, ...props }: TextProps & { text: string }) => {
	return (
		<Text style={styles.subtitle} {...props}>
			{text}
		</Text>
	);
};

export default Subtitle;

const styles = StyleSheet.create({
	subtitle: {
		fontFamily: 'Sora-Regular',
		fontSize: Sizes.s14,
		fontWeight: '400',
		color: Colors.text,
		textAlign: 'center',
		paddingHorizontal: Padding.p20,
		lineHeight: Sizes.s14 * 1.5,
	},
});
