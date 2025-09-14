import { StyleSheet, Text, TextProps } from "react-native";
import { Sizes } from "../../constants/sizes";
import { Colors } from "../../constants/colors";

const Title = ({text, ...props}: TextProps & {text: string}) => {
    return (
        <Text style={styles.title} {...props}>{text}</Text>
    )
}

export default Title;

const styles = StyleSheet.create({
    title: {
        fontSize: Sizes.s34,
        fontWeight: "600",
        color: Colors.white,
        textAlign: "center",
        lineHeight: Sizes.s34 * 1.3,
    },
});
