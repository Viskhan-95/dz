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
	backgroundColor,
	borderColor,
	borderWidth,
	onPress,
	...props
}: PressableProps & {
	children?: ReactNode;
	width?: number | undefined;
	height?: number | undefined;
	borderRadius?: number;
	padding?: number;
	backgroundColor?: string;
	borderColor?: string;
	borderWidth?: number;
	onPress?: () =>  void;
}) => {
	const animatedValue = new Animated.Value(100);
	const color = animatedValue.interpolate({
		inputRange: [0, 100],
		outputRange: [Colors.primaryHover, backgroundColor ?? Colors.primary],
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
				onPress={onPress}
				onPressIn={fadeIn}
				onPressOut={fadeOut}
				{...props}
				style={{ width, height, padding, borderColor, borderWidth, borderRadius }}
			>
				<Text style={styles.buttonText}>{children}</Text>
			</Pressable>
		</Animated.View>
	);
};

export default Button;

const styles = StyleSheet.create({
	button: {
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
