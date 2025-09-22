import { router, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import Button from '../../shared/button/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import Title from '../../shared/title/Title';
import { Colors } from '../../constants/colors';
import { useProductByIdLoadable } from '../../entities/product/model/product.hooks';
import { BorderRadius, Gap, Padding } from '../../constants/sizes';
import Subtitle from '../../shared/subtitle/Subtitle';
import SizeButton from '../../shared/button/SizeButton';
import { useState } from 'react';
import { sizes } from '../../utils/db';
import { StatusBar } from 'expo-status-bar';

export default function ProductPage() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const productLoadable = useProductByIdLoadable(id!);
	const [selectedSizeId, setSelectedSizeId] = useState<number>(sizes[1].id);

	const handleSelectSize = (id: number) => {
		setSelectedSizeId(id);
	};

	if (productLoadable.state === 'loading') {
		return (
			<View style={[styles.container, styles.center]}>
				<ActivityIndicator color={Colors.black} />
			</View>
		);
	}

	if (productLoadable.state === 'hasError') {
		return (
			<View style={[styles.container, styles.center]}>
				<Text>Ошибка загрузки</Text>
			</View>
		);
	}

	const product = productLoadable.state === 'hasData' ? productLoadable.data : null;

	if (!product) {
		return (
			<View style={[styles.container, styles.center]}>
				<Text>Товар не найден</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<StatusBar style="light" backgroundColor="#000" translucent={false} />
			<SafeAreaView style={styles.area}>
				<View style={styles.header}>
					<Button backgroundColor={Colors.white} onPress={() => router.back()}>
						<Image source={require('../../assets/icons/arrowLeft.png')} />
					</Button>
					<Title textSize={18} textAlign="center" text="Описание" />
					<View style={styles.placeholder} />
				</View>
				<View style={styles.content}>
					<Image source={{ uri: product.image }} style={{ width: '100%', height: 300 }} />
					<View style={styles.titleContainer}>
						<Title textSize={18} textAlign="center" text={product.name} />
						<View style={styles.rating}>
							<Image source={require('../../assets/icons/star.png')} />
							<Title textSize={16} textAlign="left" text={product.rating.toString()} />
						</View>
					</View>
					<Subtitle text={product.subTitle} />
					<Image style={styles.line} source={require('../../assets/icons/line.png')} />
					<Subtitle textSize={14} text={product.description} />
					<View style={styles.sizeContainer}>
						<Title textSize={16} textAlign="left" text="Размер" />
						<View style={styles.sizeButton}>
							{sizes.map((size) => (
								<SizeButton
									key={size.id}
									size={size.name}
									isHover={selectedSizeId === size.id}
									onPress={() => handleSelectSize(size.id)}
								/>
							))}
						</View>
					</View>
				</View>
				<View style={styles.footer}>
					<View style={styles.price}>
						<Subtitle textSize={14} text="Цена" />
						<Title
							textSize={18}
							textAlign="left"
							color={Colors.primary}
							text={`${sizes.find((size) => size.id === selectedSizeId)?.price} ₽`}
						/>
					</View>
					<Button
						backgroundColor={Colors.primary}
						borderRadius={BorderRadius.b16}
						padding={Padding.p24}
						onPress={() => router.navigate('address')}
					>
						<Text>Добавить в корзину</Text>
					</Button>
				</View>
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
		paddingHorizontal: Padding.p24,
	},
	center: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	area: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingBottom: Padding.p30,
	},
	placeholder: {
		width: 24,
		height: 24,
	},
	content: {
		flex: 1,
		backgroundColor: 'white',
	},
	titleContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: Padding.p20,
	},
	rating: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: Gap.g4,
	},
	line: {
		marginVertical: Padding.p30,
	},
	sizeContainer: {
		marginTop: Padding.p24,
		gap: Gap.g12,
	},
	sizeButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: Gap.g12,
	},
	footer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: Gap.g12,
	},
	price: {
		gap: Gap.g8,
	},
});
