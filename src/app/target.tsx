import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeder";
import { Button } from "@/components/Button";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { CurrencyInput } from "@/components/CurrencyInput";

export default function Target(){
    return (
        <View style={{flex: 1, padding: 24}}>
            <PageHeader title="Meta" subtitle="Economize para alcançar sua meta financeira" />
            <View style={{marginTop: 32, gap: 24}}>
                <Input label="Nome da meta" placeholder="Ex: Viagem, carro, apartamento..." />
                <CurrencyInput label="Valor alvo" placeholder="Ex: 1.000,00" value={0} />
                <Button title="Salvar" />
            </View>
        </View>
    )
}