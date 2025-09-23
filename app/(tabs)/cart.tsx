import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Title from '../../shared/title/Title';
import Button from '../../shared/button/Button';
import { router } from 'expo-router';
import { Colors } from '../../constants/colors';
import { BorderRadius, Gap, Padding } from '../../constants/sizes';
import { useAddress, useAddressLoadable } from '../../entities/address/model/address.hooks';
import Subtitle from '../../shared/subtitle/Subtitle';
import { useComment, useCommentLoadable } from '../../entities/address/model/comment.hooks';
import CardCart from '../../shared/card/CardCart';
import { useCart } from '../../entities/product/model/cart.hooks';
import { useOrderPayload, usePostOrder } from '../../entities/order/model/order.hooks';
import axios from 'axios';

export default function Order() {
	const addressLoadable = useAddressLoadable();
	const commentLoadable = useCommentLoadable();
	const address = useAddress();
	const comment = useComment();
	const { items } = useCart();

	const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
	const delivery = 100;

	const payload = useOrderPayload();
	const postOrder = usePostOrder();

	const handleCreateOrder = async () => {
		try {
			const res = await postOrder({ address: address?.fullAddress?.trim() ?? '' });
			router.navigate('cart/success');
		} catch (e) {
			console.log(e);
			Alert.alert('Ошибка', 'Не удалось оформить заказ');
		}
	};

	return (
		<View style={styles.container}>
			<SafeAreaView style={styles.area}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={styles.header}>
						<Button backgroundColor={Colors.white} onPress={() => router.back()}>
							<Image source={require('../../assets/icons/arrowLeft.png')} />
						</Button>
						<Title textSize={18} textAlign="left" text="Заказ" />
						<View style={styles.placeholder} />
					</View>
					<View style={styles.content}>
						<View style={styles.headerContent}>
							<Title textSize={16} textAlign="left" text="Адрес доставки" />
							<Title
								textSize={14}
								textAlign="left"
								text={
									addressLoadable.state === 'loading'
										? 'Загрузка...'
										: address?.fullAddress || 'Не указан'
								}
							/>
							<Subtitle
								text={
									commentLoadable.state === 'loading' ? 'Загрузка...' : comment?.fullComment || ''
								}
							/>
							<Button
								padding={Padding.p10}
								backgroundColor={Colors.white}
								borderWidth={1}
								borderColor={Colors.border}
								borderRadius={BorderRadius.b16}
								onPress={() => router.push('/address')}
							>
								<View style={styles.buttonContent}>
									<Image source={require('../../assets/icons/editBlack.png')} />
									<Title textSize={16} textAlign="center" text="Редактировать адрес" />
								</View>
							</Button>
						</View>
						<View style={styles.cartContent}>
							<Image source={require('../../assets/icons/line.png')} />
							{items.length > 0 &&
								items.map((item) => (
									<CardCart
										key={`${item.id}-${item.size ?? 'na'}`}
										name={item.name}
										subtitle={item.subTitle}
										image={item.image}
										counter={item.quantity}
										id={item.id}
										size={item.size}
									/>
								))}
							<Image source={require('../../assets/icons/widthLine.png')} />
						</View>
						<View style={styles.footer}>
							<Title textSize={16} textAlign="left" text="Итого" />
							<View style={styles.price}>
								<Subtitle textSize={16} text="Цена" />
								<Title
									textSize={16}
									textAlign="left"
									text={`${items.reduce((acc, item) => acc + item.price * item.quantity, 0)} ₽`}
								/>
							</View>
							<View style={styles.delivery}>
								<Subtitle textSize={16} text="Доставка" />
								<Title textSize={16} textAlign="left" text={'100 ₽'} />
							</View>
							<View style={styles.total}>
								<Subtitle textSize={16} text="Итого к оплате" />
								<Title textSize={16} textAlign="left" text={total + delivery + ' ₽'} />
							</View>
						</View>
						<Button
							padding={Padding.p20}
							borderRadius={BorderRadius.b16}
							onPress={() => handleCreateOrder()}
						>
							<Text>Заказать</Text>
						</Button>
					</View>
				</ScrollView>
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
		paddingHorizontal: Padding.p30,
	},
	area: {
		flex: 1,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: Padding.p30,
	},
	headerContent: {
		justifyContent: 'space-between',
		gap: Gap.g8,
		paddingBottom: Padding.p40,
	},
	placeholder: {
		width: 24,
		height: 24,
	},
	content: {
		flex: 1,
	},
	buttonContent: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: Gap.g4,
	},
	cartContent: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	footer: {
		paddingVertical: Padding.p20,
		gap: Gap.g16,
	},
	price: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	delivery: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	total: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
});
