import { router, useLocalSearchParams } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Transaction(){
    const params = useLocalSearchParams<{id: string}>()

    return (
        <View>
            <Text>Id: {params.id}</Text>
            <Button title="voltar" onPress={() => router.back()} />
        </View>
    )
}