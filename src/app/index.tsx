import { HomeHeader } from "@/components/HomeHeader";
import { List } from "@/components/List";
import { Target } from "@/components/Target";
import { Button } from "@/components/Button";
import { fontFamily } from "@/theme/fontFamily";
import { router } from "expo-router";
import { StatusBar, Text, View } from "react-native";

const summary = {
    total: "R$ 6.000,00",
    input: { label: "Entradas", value: "R$ 1.000,42"},
    output: { label: "Entradas", value: "-R$ 800,42"},
}
const targets = [
    {
        id: "2313",
        name: "Comprar cadeira",
        percentage: "75%",
        current: "900,00",
        target: "1.200,00"
    },
    {
        id: "23132",
        name: "Comprar cadeira",
        percentage: "75%",
        current: "900,00",
        target: "1.200,00"
    },
    {
        id: "231332",
        name: "Comprar cadeira",
        percentage: "75%",
        current: "900,00",
        target: "1.200,00"
    },
];

export default function Index(){
    return (
        <View style={{flex: 1}}>
            <StatusBar barStyle="light-content" />
            <HomeHeader data={summary} />

            <List title="Metas" 
                data={targets} 
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <Target data={item} onPress={() => router.navigate(`/in-progress/${item.id}`)} />}
                emptyMessage="Nehum item"
                containerStyle={{paddingHorizontal: 24}} />
            <View style={{padding: 24, paddingBottom: 32}}>
                <Button title="Nova Meta" onPress={() => router.navigate("/target")} />
            </View>
        </View>
    )
}