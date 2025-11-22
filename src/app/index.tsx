import { fontFamily } from "@/theme/fontFamily";
import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index(){
    return (
        <View style={{flex: 1, justifyContent: "center"}}>
            <Text style={{fontFamily: fontFamily.bold}}>Oi, Zé</Text>

            <Button title="Target"
            onPress={() => router.navigate('/target')} />

            <Button title="Transaction"
            onPress={() => router.navigate('/transaction/123')} />

            <Button title="Progresso"
            onPress={() => router.navigate('/in-progress/123')} />
        </View>
    )
}