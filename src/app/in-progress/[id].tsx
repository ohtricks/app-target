import { PageHeader } from "@/components/PageHeder";
import { Progress } from "@/components/Progress";
import { router, useLocalSearchParams } from "expo-router";
import { Button, Text, View } from "react-native";

const details = {
    current: "R$ 580,00",
    target: "R$ 1580,00",
    percentage: 50
}

export default function InProgress(){
    const params = useLocalSearchParams<{id: string}>()

    return (
        <View style={{flex: 1, padding: 24}}>
            <PageHeader title="Carro" />

            <Progress data={details} />
        </View>
    )
}