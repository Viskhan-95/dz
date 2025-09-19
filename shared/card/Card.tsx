import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { BorderRadius, Margin, Padding, Sizes } from '../../constants/sizes';
import Title from '../title/Title';
import Subtitle from '../subtitle/Subtitle';
import Button from '../button/Button';
import Rating from '../rating/Rating';

export default function Card({
	image,
	title,
	subtitle,
	price,
	rating,
}: {
	image: string;
	title: string;
	subtitle: string;
	price: string;
	rating: number;
}) {
	const { width } = useWindowDimensions();
	const cardWidth = (width - 36) / 2;

	return (
		<View style={[styles.container, { width: cardWidth }]}>
			<Image source={{ uri: image }} style={styles.image} />
			<Rating rating={rating} />
			<View style={styles.content}>
				<Title text={title} />
				<Subtitle text={subtitle} />
			</View>
			<View style={styles.footerContent}>
				<View>
					<Text style={styles.price}>{price} ₽</Text>
				</View>
				<View style={styles.button}>
					<Button width={32} height={32} borderRadius={10} padding={Padding.p6}>
						<Image source={require('../../assets/icons/add.png')} />
					</Button>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: 280,
		backgroundColor: Colors.white,
		borderRadius: BorderRadius.b16,
		marginTop: Margin.m24,
	},
	image: {
		height: 175,
		borderRadius: BorderRadius.b16,
	},
	content: {
		padding: Padding.p12,
	},
	footerContent: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: Padding.p12,
	},
	price: {
		fontFamily: 'Sora-SemiBold',
		fontSize: Sizes.s18,
		fontWeight: '600',
		color: Colors.textSecondary,
	},
	button: {},
});
