import { Button } from "@/components/Button";
import { List } from "@/components/List";
import { Loading } from "@/components/Loading";
import { PageHeader } from "@/components/PageHeder";
import { Progress } from "@/components/Progress";
import { TargetProps } from "@/components/Target";
import { Transaction, TransactionProps } from "@/components/Transaction";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { useTransactionsDatabase } from "@/database/useTransactionsDatabase";
import { numberToCurrency } from "@/utils/numberToCurrency";
import { TransactionTypes } from "@/utils/TransactionTypes";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, StatusBar, View } from "react-native";
import dayjs from "dayjs";

export default function InProgress(){
    const params = useLocalSearchParams<{id: string}>()
    const targetDatabase = useTargetDatabase()
    const transactionsDatabase = useTransactionsDatabase()

    const [isFetching, setIsFetching] = useState(true)
    const [details, setDetails] = useState({
        name: "",
        current: "R$ 0,00",
        target: "R$ 0,00",
        percentage: 0
    })
    const [transactions, setTransaction] = useState<TransactionProps[]>([])

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

    async function fetchTransactions(){
        try {
            const response = await transactionsDatabase.listByTargetId(Number(params.id))
            const data: TransactionProps[] = response.map((item) => ({
                id: String(item.id),
                value: numberToCurrency(item.amount),
                date: dayjs(item.created_at).format("DD/MM/YYYY [às] HH:mm"),
                description: item.observation,
                type: item.amount < 0 ? TransactionTypes.Output : TransactionTypes.Input,
            }))
            setTransaction(data)
        } catch (error) {
            
        }
    }


    async function fetchData() {
        const fetchDetailsPromise = fetchDetails()
        const fetchTransactionsPromise = fetchTransactions()

        await Promise.all([fetchDetailsPromise, fetchTransactionsPromise])

        setIsFetching(false)
    }

    function handleTransactionRemove(id: string){
         Alert.alert("Remover", "Deseja realmente remover?", [
            { text: "Não" },
            { text: "Sim", onPress: () => transactionRemove(id)}
        ])
    }

    async function transactionRemove(id: string){
        try {
            await transactionsDatabase.remove(Number(id))
            fetchData()
            Alert.alert("Alerta", "Zé se deletou a transação!")
        } catch (error) {
            Alert.alert("Erro", "Não foi possivel deletar Zé")
            console.log(error);
        }
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
            <StatusBar barStyle="dark-content" />
            
            <PageHeader title={details.name} rightButton={{
                icon: "edit",
                onPress: () => router.navigate(`/target?id=${params.id}`)
            }} />

            <Progress data={details} />

            <List title="Transações" 
                data={transactions} 
                renderItem={({item}) => <Transaction data={item}
                onRemove={() => handleTransactionRemove(item.id)} />} 
                emptyMessage="Nenhuma transação registrada"/>

            <Button title="Nova transação" onPress={() => router.navigate(`/transaction/${params.id}`)} />
        </View>
    )
}