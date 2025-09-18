import { StyleSheet, Text, View } from 'react-native';
import Input from '../../shared/input/Input';
import { SafeAreaView } from 'react-native-safe-area-context';
import Title from '../../shared/title/Title';
import { Colors } from '../../constants/colors';
import { Gap, Padding } from '../../constants/sizes';
import Category from '../../shared/category/Category';
import { categories } from '../../utils/db';
import { useAtom, useAtomValue } from 'jotai';
import { visibleProductsLoadableAtom } from '../../entities/product/api/api';
import { selectedTypeAtom, searchTextAtom } from '../../entities/product/model/product.state';
import Card from '../../shared/card/Card';
import CardsGrid from '../../entities/product/ui/CardsGrid';

export default function Catalog() {
	const [selectedType, setSelectedType] = useAtom(selectedTypeAtom);
	const [search, setSearch] = useAtom(searchTextAtom);

	const handleCategorySelect = (type: string) => setSelectedType(type);
	const onChangeSearch = (text: string) => setSearch(text);

	return (
		<View style={styles.container}>
			<SafeAreaView style={styles.area}>
				<View style={styles.header}>
					<Title text="Адрес доставки" />
					<Input placeholder="Поиск" value={search} onChangeText={onChangeSearch} />
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
					<CardsGrid />
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
		paddingTop: Padding.p20,
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
