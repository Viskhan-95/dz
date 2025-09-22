import { Tabs } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function TabLayout() {
	return (
		<>
			<StatusBar style="light" backgroundColor="#000" translucent={false} />
			<Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: Colors.placeholder }}>
				<Tabs.Screen
					name="index"
					options={{
						tabBarLabel: 'Главная',
						tabBarLabelPosition: 'beside-icon',
						tabBarIcon: ({ focused }) => (
							<Image
								source={
									focused
										? require('../../assets/icons/homeActive.png')
										: require('../../assets/icons/home.png')
								}
								style={{ width: 24, height: 24 }}
								resizeMode="contain"
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="cart"
					options={{
						tabBarLabel: 'Корзина',
						tabBarLabelPosition: 'beside-icon',
						tabBarIcon: ({ focused }) => (
							<Image
								source={
									focused
										? require('../../assets/icons/cartActive.png')
										: require('../../assets/icons/cart.png')
								}
								style={{ width: 24, height: 24 }}
								resizeMode="contain"
							/>
						),
					}}
				/>
			</Tabs>
		</>
	);
}
