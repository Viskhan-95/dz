// app/catalog/CardsGrid.tsx
import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAtomValue } from 'jotai';
import { visibleProductsLoadableAtom } from '../api/api';
import Card from '../../../shared/card/Card';

function CardsGridInner() {
	const products = useAtomValue(visibleProductsLoadableAtom);

	if (products.state === 'loading') return <Text>Загрузка...</Text>;
	if (products.state === 'hasError') return <Text>Ошибка</Text>;
	if (products.data.length === 0) return <Text>Ничего не найдено</Text>;

	return (
		<View style={styles.container}>
			{products.data.map((item) => (
				<Card
					key={item.id}
					image={item.image}
					rating={item.rating}
					title={item.name}
					subtitle={item.subTitle}
					price={String(item.price)}
				/>
			))}
		</View>
	);
}
export default memo(CardsGridInner);

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 12,
	},
});
