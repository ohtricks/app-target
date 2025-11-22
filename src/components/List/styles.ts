// import { colors } from "@/theme/colors";
// import { fontFamily } from "@/theme/fontFamily";
import { colors, fontFamily } from "@/theme/index"

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listContent: {
        paddingBottom: 72,
    },
    name: {

    },
    title: {
        marginTop: 24,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray[200],
        fontSize: 16,
        fontFamily: fontFamily.medium,
        color: colors.black
    }
})