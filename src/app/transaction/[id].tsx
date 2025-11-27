import { Button } from "@/components/Button";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeder";
import { TransactionType } from "@/components/TransactionTypes";
import { useTransactionsDatabase } from "@/database/useTransactionsDatabase";
import { TransactionTypes } from "@/utils/TransactionTypes";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";

export default function Transaction(){
    const params = useLocalSearchParams<{id: string}>()
    const transactionsDatabase = useTransactionsDatabase()
    
    const [type, setType] = useState<TransactionTypes>(TransactionTypes.Input)
    const [amount, setAmount] = useState(0)
    const [observation, setObservation] = useState('')
    const [isCreating, setIsCreating] = useState(false)


    async function handleCreate() {
        try {
            if( amount <= 0){
                return Alert.alert("Atenção", "Preencha o valor. A transação deve ser maior que zero Zé.")
            }

            setIsCreating(true)

            await transactionsDatabase.create({
                target_id: Number(params.id), 
                amount: type === TransactionTypes.Output ? amount * -1 : amount,
                observation
            })

            Alert.alert("Alerta", "Transação salva com sucesso Zé!", [{
                text: 'Ok',
                onPress: () => router.back()
            }])

        } catch (error) {
            console.log("error ao salver: ", error)

            Alert.alert("Erro", "Erro ao salvar transação Zé.", [{
                text: 'Ok',
                onPress: () => router.replace('/')
            }])

        }
    }

    return (
        <View style={{flex: 1, padding: 24}}>
            <PageHeader title="Nova transação" subtitle="A cada valor guardado você fica mais próximo da sua meta." />

            <View style={{marginTop: 32, gap: 24}}>
                <TransactionType selected={type} onChange={setType}  />

                <CurrencyInput label="Valor (R$)" value={amount} 
                    onChangeValue={setAmount}/>

                <Input label="Motivo (opcional)" placeholder="Ex: Gasto com mercado"
                    onChangeText={setObservation} />
                
                <Button title="Salvar" onPress={handleCreate} isProcessing={isCreating} />
            </View>
        </View>
    )
}