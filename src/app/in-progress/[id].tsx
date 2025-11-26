import { Button } from "@/components/Button";
import { List } from "@/components/List";
import { Loading } from "@/components/Loading";
import { PageHeader } from "@/components/PageHeder";
import { Progress } from "@/components/Progress";
import { TargetProps } from "@/components/Target";
import { Transaction } from "@/components/Transaction";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { numberToCurrency } from "@/utils/numberToCurrency";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, View } from "react-native";

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
    const targetDatabase = useTargetDatabase()

    const [isFetching, setIsFetching] = useState(true)
    const [details, setDetails] = useState({
        name: "",
        current: "R$ 0,00",
        target: "R$ 0,00",
        percentage: 0
    })

    async function fetchDetails(){
        try {
            const response = await targetDatabase.show(Number(params.id))
            
            setDetails({
                name: response.name,
                current: numberToCurrency(response.current),
                target: numberToCurrency(response.amount),
                percentage: response.percentage
            })
        } catch (error) {
            Alert.alert("Erro", "Erro ao trazer dado Zé")
            console.log(error)
        }
    }


    async function fetchData() {
        const fetchDetailsPromise = fetchDetails()

        await Promise.all([fetchDetailsPromise])

        setIsFetching(false)
    }

    useFocusEffect(
        useCallback(() => {
            fetchData()
        }, [])
    )

    if(isFetching){
        return <Loading />
    }

    return (
        <View style={{flex: 1, padding: 24}}>
            <PageHeader title={details.name} rightButton={{
                icon: "edit",
                onPress: () => router.navigate(`/target?id=${params.id}`)
            }} />

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