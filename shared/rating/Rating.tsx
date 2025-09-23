import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { BorderRadius, Gap, Sizes } from '../../constants/sizes';

export default function Rating({ rating }: { rating: number }) {
	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Image style={styles.image} source={require('../../assets/icons/star.png')} />
				<Text style={styles.text}>{rating}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: 60,
		height: 30,
		flexDirection: 'row',
		backgroundColor: Colors.black + '30',
		position: 'absolute',
		borderTopLeftRadius: BorderRadius.b16,
		borderBottomRightRadius: BorderRadius.b16,

		justifyContent: 'center',
		alignItems: 'center',
		gap: Gap.g2,
	},
    image: {
        width: 12,
        height: 12,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Gap.g2,
        opacity: 1,
    },
	text: {
		fontFamily: 'Sora-SemiBold',
		fontSize: Sizes.s10,
		fontWeight: '600',
		color: Colors.white,
	},
});
