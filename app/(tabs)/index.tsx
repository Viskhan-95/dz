import { Image, StyleSheet, Text, View } from 'react-native';
import Input from '../../shared/input/Input';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { Gap, Padding, Sizes } from '../../constants/sizes';
import Category from '../../shared/category/Category';
import { categories } from '../../utils/db';
import { useAtom } from 'jotai';
import { selectedTypeAtom, searchTextAtom } from '../../entities/product/model/product.state';
import CardsGrid from '../../entities/product/ui/CardsGrid';
import Button from '../../shared/button/Button';
import { useAddress, useAddressLoadable } from '../../entities/address/model/address.hooks';
import { router } from 'expo-router';

export default function Catalog() {
	const [selectedType, setSelectedType] = useAtom(selectedTypeAtom);
	const [search, setSearch] = useAtom(searchTextAtom);
	const address = useAddress();
	const addressLoadable = useAddressLoadable();

	const handleCategorySelect = (type: string) => setSelectedType(type);
	const onChangeSearch = (text: string) => setSearch(text);

	return (
		<View style={styles.container}>
			<SafeAreaView style={styles.area}>
				<View style={styles.header}>
					<View style={styles.addressContainer}>
						<Text style={styles.addressTitle}>Адрес</Text>
						<View style={styles.addressTextContainer}>
							<Text style={styles.addressText}>
								{addressLoadable.state === 'loading'
									? 'Загрузка...'
									: address?.fullAddress || 'Не указан'}
							</Text>
							<Button backgroundColor={Colors.black} onPress={() => router.push('/address')}>
								<Image source={require('../../assets/icons/edit.png')} />
							</Button>
						</View>
					</View>
					<Input
						placeholder="Поиск"
						value={search}
						onChangeText={onChangeSearch}
						icon={require('../../assets/icons/search.png')}
						backgroundColor={Colors.background}
						color={Colors.white}
					/>
				</View>
			</SafeAreaView>
			<View style={styles.content}>
				<View style={styles.categories}>
					{categories.map((c) => (
						<Category
							key={c.id}
							name={c.name}
							selected={(selectedType ?? 'all') === c.type}
							onPress={() => handleCategorySelect(c.type)}
						/>
					))}
				</View>
				<View style={styles.products}>
					<CardsGrid onPress={(id) => router.push(`/catalog/${id}`)} />
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.secondary,
	},
	area: {
		backgroundColor: Colors.black,
	},
	header: {
		gap: Gap.g28,
		paddingHorizontal: Padding.p30,
	},
	addressContainer: {
		gap: Gap.g4,
	},
	addressTitle: {
		fontFamily: 'Sora-Regular',
		fontWeight: '400',
		fontSize: Sizes.s12,
		color: Colors.textAddressTitle,
	},
	addressTextContainer: {
		flexDirection: 'row',
		gap: Gap.g4,
	},
	addressText: {
		fontFamily: 'Sora-SemiBold',
		fontWeight: '600',
		fontSize: Sizes.s14,
		color: Colors.textAddressText,
	},
	content: {
		flex: 1,
		paddingHorizontal: Padding.p12,
	},
	categories: {
		flexDirection: 'row',
		gap: Gap.g10,
	},
	products: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: Gap.g12,
	},
});
