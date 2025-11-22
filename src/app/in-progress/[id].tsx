import { Button } from "@/components/Button";
import { List } from "@/components/List";
import { PageHeader } from "@/components/PageHeder";
import { Progress } from "@/components/Progress";
import { Transaction } from "@/components/Transaction";
import { router, useLocalSearchParams } from "expo-router";
import { View } from "react-native";

const details = {
    current: "R$ 580,00",
    target: "R$ 1580,00",
    percentage: 50
}

const transactions = [
    {
        id: "1",
        value: "R$ 300,00",
        date: "12/04/25",
        description: "CDB de 110% no banco xpto",
        type: "input"
    },
    {
        id: "2",
        value: "R$ 300,00",
        date: "12/04/25",
        description: "CDB de 110% no banco xpto",
        type: "output"
    },
    {
        id: "3",
        value: "R$ 300,00",
        date: "12/04/25",
        description: "CDB de 110% no banco xpto",
        type: "input"
    },
]

export default function InProgress(){
    const params = useLocalSearchParams<{id: string}>()

    return (
        <View style={{flex: 1, padding: 24}}>
            <PageHeader title="Carro" />

            <Progress data={details} />

            <List title="Transações" 
                data={transactions} 
                renderItem={({item}) => <Transaction data={item}
                onRemove={() => {}} />} 
                emptyMessage="Nenhuma transação registrada"/>

            <Button title="Nova transação" onPress={() => router.navigate(`/transaction/${params.id}`)} />
        </View>
    )
}