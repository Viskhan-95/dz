import { Image, StyleSheet, Text, View, Pressable } from 'react-native';
import { BorderRadius, Gap, Padding } from '../../constants/sizes';
import Title from '../title/Title';
import Subtitle from '../subtitle/Subtitle';
import { Colors } from '../../constants/colors';
import { useChangeQuantity } from '../../entities/product/model/cart.hooks';

export default function CardCart({
	name,
	subtitle,
	counter,
	id,
	size,
	image,
}: {
	name: string;
	subtitle: string;
	counter: number;
	id: number;
	size: string;
	image: string;
}) {
	const changeQty = useChangeQuantity();

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Image source={{ uri: image }} style={styles.image} />
				<View>
					<Title text={name} textSize={16} textAlign="left" />
					<Subtitle text={`${subtitle} / ${size}`} textSize={12} />
				</View>
			</View>
			<View style={styles.counterContainer}>
				<View style={styles.counter}>
					<Pressable
						style={styles.counterButton}
						onPress={() => changeQty({ id: id, size: size, quantity: counter - 1, clampToZero: true })}
						hitSlop={10}
					>
						<Title
							text="-"
							textSize={14}
							textAlign="center"
							color={counter === 1 ? Colors.disabled : Colors.title}
						/>
					</Pressable>
					<Text>{counter}</Text>
					<Pressable
						style={styles.counterButton}
						onPress={() => changeQty({ id: id, size: size, quantity: counter + 1 })}
						hitSlop={10}
					>
						<Title text="+" textSize={14} textAlign="center" />
					</Pressable>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flexDirection: 'row',
		paddingVertical: Padding.p20,
	},
	content: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		gap: Gap.g10,
	},
	image: {
		width: 54,
		height: 54,
		borderRadius: BorderRadius.b12,
	},
	counterContainer: {
		justifyContent: 'center',
	},
	counter: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: Gap.g10,
	},
	counterButton: {
		width: 28,
		height: 28,
		borderRadius: BorderRadius.b24,
		borderWidth: 1,
		borderColor: Colors.border,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
