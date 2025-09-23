// app/catalog/CardsGrid.tsx
import React, { memo, useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useAtomValue, useSetAtom } from 'jotai';
import { visibleProductsLoadableAtom, refreshProductsAtom } from '../api/api';
import Card from '../../../shared/card/Card';
import { Product } from '../model/product.state';
import { useAddToCart } from '../model/cart.hooks';

function CardsGridInner({ onPress }: { onPress: (id: number) => void }) {
	const products = useAtomValue(visibleProductsLoadableAtom);
	const triggerRefresh = useSetAtom(refreshProductsAtom);
	const [refreshing, setRefreshing] = useState(false);
	const addToCart = useAddToCart();
	const renderItem = useCallback(
		({ item }: { item: Product }) => (
			<Card
				image={item.image}
				rating={item.rating}
				title={item.name}
				subtitle={item.subTitle}
				price={String(item.price)}
				onPress={() => onPress(item.id)}
				onAdd={() =>
					addToCart({ id: item.id, name: item.name, subTitle: item.subTitle, image: item.image, price: item.price, size: "M" })
				}
			/>
		),
		[onPress, addToCart],
	);

	useEffect(() => {
		if (refreshing && (products.state === 'hasData' || products.state === 'hasError')) {
			setRefreshing(false);
		}
	}, [products.state, refreshing]);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		triggerRefresh();
	}, [triggerRefresh]);

	if (!refreshing && products.state === 'loading') return <Text>Загрузка...</Text>;
	if (products.state === 'hasError') return <Text>Ошибка</Text>;
	const data = products.state === 'hasData' ? products.data : [];
	if (!refreshing && data.length === 0) return <Text>Ничего не найдено</Text>;

	return (
		<View style={styles.container}>
			<FlatList
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
				data={data}
				keyExtractor={(item) => item.id.toString()}
				numColumns={2}
				columnWrapperStyle={{ gap: 12 }}
				contentContainerStyle={{ gap: 12, paddingBottom: 24 }}
				renderItem={renderItem}
			/>
		</View>
	);
}
export default memo(CardsGridInner);

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
