import { Button } from "@/components/Button";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeder";
import { TransactionType } from "@/components/TransactionTypes";
import { TransactionTypes } from "@/utils/TransactionTypes";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

export default function Transaction(){
    const params = useLocalSearchParams<{id: string}>()
    const [type, setType] = useState<TransactionTypes>(TransactionTypes.Input)

    return (
        <View style={{flex: 1, padding: 24}}>
            <PageHeader title="Nova transação" subtitle="A cada valor guardado você fica mais próximo da sua meta." />

            <View style={{marginTop: 32, gap: 24}}>
                <TransactionType selected={type} onChange={setType}  />

                <CurrencyInput label="Valor (R$)" value={0} />

                <Input label="Motivo (opcional)"
                    placeholder="Ex: Gasto com mercado" />
                
                <Button title="Salvar" onPress={() => router.back()} />
            </View>
        </View>
    )
}