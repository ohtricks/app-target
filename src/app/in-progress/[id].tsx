import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function InProgress(){
    return (
        <View style={{flex: 1, justifyContent: "center"}}>
            <Text>Em progresso</Text>
            <Button title="Voltar" onPress={() => router.back()} />
        </View>
    )
}