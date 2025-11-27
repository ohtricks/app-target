import { HomeHeader, HomeHeaderProps } from "@/components/HomeHeader";
import { List } from "@/components/List";
import { Target, TargetProps } from "@/components/Target";
import { Button } from "@/components/Button";
import { fontFamily } from "@/theme/fontFamily";
import { router, useFocusEffect } from "expo-router";
import { Alert, StatusBar, Text, View } from "react-native";
import { TargetResponse, useTargetDatabase } from "@/database/useTargetDatabase";
import { useCallback, useState } from "react";
import { numberToCurrency } from "@/utils/numberToCurrency";
import { useTransactionsDatabase } from "@/database/useTransactionsDatabase";


export default function Index(){
    const targetDatabase = useTargetDatabase();
    const transactionsDatabase = useTransactionsDatabase()

    const [targets, setTargets] = useState<TargetProps[]>()
    const [summary, setSummary] = useState<HomeHeaderProps>({
        total: "R$ -",
        input: { label: "Entradas", value: "R$ -"},
        output: { label: "Saidas", value: "R$ -"},
    })

    async function fetchTargets(): Promise<TargetProps[]>{
        try {
            const response = await targetDatabase.listByPercentageValue()
            return response.map((item) => (
                {
                    id: String(item.id),
                    name: item.name,
                    current: numberToCurrency(item.current),
                    percentage: item.percentage.toFixed(0) + "%",
                    target: numberToCurrency(item.amount)
                }
            ))
        } catch (error) {
            Alert.alert("Erro", "Erro ao carregar Metas ZÉ!")
            console.log(error)
        }
    }

    async function fetchSummary(): Promise<HomeHeaderProps>{
        try {
            const response = await transactionsDatabase.summary()

            return {
                total: numberToCurrency(response.input + response.output),
                input: {
                    label: "Entrada",
                    value: numberToCurrency(response.input)
                },
                output: {
                    label: "Saidas",
                    value: numberToCurrency(response.output)
                }
            }
        } catch (error) {
            
        }
    }

    async function fetchData() {
        const targetDataPromise = fetchTargets()
        const summaryDataPromise = fetchSummary()

        const [targetData, summaryData] = await Promise.all([targetDataPromise, summaryDataPromise])

        setTargets(targetData)
        setSummary(summaryData)
    }

    useFocusEffect(
        useCallback(() => {
            fetchData()
        }, [])
    )


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