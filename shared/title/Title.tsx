import { Animated, StyleSheet, TextProps } from 'react-native';
import { Sizes } from '../../constants/sizes';
import { Colors } from '../../constants/colors';

const Title = ({ text, ...props }: TextProps & { text: string }) => {
	const animatedValue = new Animated.Value(-100);
	const opacity = animatedValue.interpolate({
		inputRange: [-100, 0],
		outputRange: [0, 1],
	});

	const onEnter = () => {
		Animated.timing(animatedValue, {
			toValue: 0,
			duration: 1500,
			useNativeDriver: true,
		}).start();
	};

	return (
		<Animated.Text
			style={{
				...styles.title,
				transform: [{ translateY: animatedValue }],
				opacity: opacity,
			}}
			onLayout={onEnter}
			{...props}
		>
			{text}
		</Animated.Text>
	);
};

export default Title;

const styles = StyleSheet.create({
	title: {
		fontFamily: 'Sora-SemiBold',
		fontSize: Sizes.s34,
		fontWeight: '600',
		color: Colors.white,
		textAlign: 'center',
		lineHeight: Sizes.s34 * 1.3,
	},
});
