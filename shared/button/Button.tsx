import { ReactNode } from 'react';
import {
	Animated,
	GestureResponderEvent,
	Pressable,
	PressableProps,
	StyleSheet,
	Text,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { Padding, Sizes } from '../../constants/sizes';

const Button = ({
	children,
	width,
	height,
	borderRadius,
	padding,
	...props
}: PressableProps & {
	children?: ReactNode;
	width?: number | undefined;
	height?: number | undefined;
	borderRadius?: number;
	padding?: number;
}) => {
	const animatedValue = new Animated.Value(100);
	const color = animatedValue.interpolate({
		inputRange: [0, 100],
		outputRange: [Colors.primaryHover, Colors.primary],
	});

	const fadeIn = (e: GestureResponderEvent) => {
		Animated.timing(animatedValue, {
			toValue: 0,
			duration: 100,
			useNativeDriver: true,
		}).start();
		props.onPressIn?.(e);
	};

	const fadeOut = (e: GestureResponderEvent) => {
		Animated.timing(animatedValue, {
			toValue: 100,
			duration: 100,
			useNativeDriver: true,
		}).start();
		props.onPressOut?.(e);
	};

	return (
		<Animated.View
			style={{ ...styles.button, backgroundColor: color, width, height, borderRadius }}
		>
			<Pressable
				onPressIn={fadeIn}
				onPressOut={fadeOut}
				{...props}
				style={{ width, height, padding }}
			>
				<Text style={styles.buttonText}>{children}</Text>
			</Pressable>
		</Animated.View>
	);
};

export default Button;

const styles = StyleSheet.create({
	button: {
		backgroundColor: Colors.primary,
		justifyContent: 'center',
	},
	buttonText: {
		fontFamily: 'Sora-SemiBold',
		color: Colors.white,
		fontSize: Sizes.s16,
		fontWeight: '600',
		textAlign: 'center',
	},
});
