import {
    Animated,
    GestureResponderEvent,
    Pressable,
    PressableProps,
    StyleSheet,
    Text,
} from "react-native";
import { Colors } from "../../constants/colors";
import { BorderRadius, Margin, Padding, Sizes } from "../../constants/sizes";

const Button = ({ title, ...props }: PressableProps & { title: string }) => {
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
        <Animated.View style={{ ...styles.button, backgroundColor: color }}>
            <Pressable onPressIn={fadeIn} onPressOut={fadeOut} {...props}>
                <Text style={styles.buttonText}>{title}</Text>
            </Pressable>
        </Animated.View>
    );
};

export default Button;

const styles = StyleSheet.create({
    button: {
        width: "100%",
        backgroundColor: Colors.primary,
        paddingVertical: Padding.p20,
        borderRadius: BorderRadius.b16,
        marginTop: Margin.m14,
    },
    buttonText: {
        color: Colors.white,
        fontSize: Sizes.s16,
        textAlign: "center",
    },
});
