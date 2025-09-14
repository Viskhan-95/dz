import { Pressable, PressableProps, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/colors";
import { BorderRadius, Margin, Padding, Sizes } from "../../constants/sizes";

const Button = ({title, ...props}: PressableProps & {title: string}) => {
    return (
        <Pressable style={styles.button}>
            <Text style={styles.buttonText}>{title}</Text>
        </Pressable>
    )
 }

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
