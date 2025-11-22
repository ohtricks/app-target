import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Target(){
    return (
        <View >
            <Text>Teste</Text>
            <Button title="voltar" onPress={() => router.back()} />
        </View>
    )
}