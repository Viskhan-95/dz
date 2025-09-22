import { Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Title from '../../shared/title/Title';
import Button from '../../shared/button/Button';
import { router } from 'expo-router';
import { Colors } from '../../constants/colors';
import { BorderRadius, Gap, Padding } from '../../constants/sizes';
import { useAddress, useAddressLoadable } from '../../entities/address/model/address.hooks';
import Subtitle from '../../shared/subtitle/Subtitle';
import { useComment, useCommentLoadable } from '../../entities/address/model/comment.hooks';

export default function Order() {
	const addressLoadable = useAddressLoadable();
	const commentLoadable = useCommentLoadable();
	const address = useAddress();
	const comment = useComment();

	return (
		<View style={styles.container}>
			<SafeAreaView style={styles.area}>
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
					</View>
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
});
