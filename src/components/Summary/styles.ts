// import { colors } from "@/theme/colors";
// import { fontFamily } from "@/theme/fontFamily";
import { colors, fontFamily } from "@/theme/index"

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        gap: 5
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },
    label: {
        color: colors.white,
        fontSize: 12,
        fontFamily: fontFamily.regular
    },
    value: {
        fontSize: 18,
        color: colors.white,
        fontFamily: fontFamily.regular
    }
})