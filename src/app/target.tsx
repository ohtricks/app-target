import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeder";
import { Button } from "@/components/Button";
import { router, useLocalSearchParams } from "expo-router";
import { Alert, View } from "react-native";
import { CurrencyInput } from "@/components/CurrencyInput";
import { useEffect, useState } from "react";
import { useTargetDatabase } from "@/database/useTargetDatabase";

export default function Target(){
    const params = useLocalSearchParams<{id?: string}>();
    const targetDatabase = useTargetDatabase();
    const [isProcessing, setIsProcessing] = useState(false);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState(0);

    function handleSave(){
        if(!name.trim() || amount <= 0){
            return Alert.alert("Atenção", "Preencha nome e valor Zé.")
        }

        setIsProcessing(true);

        if(params.id){
            update()
        }else{
            create();
        }
    }

    async function create(){
        try {
            await targetDatabase.create({ name, amount })
            Alert.alert("Alerta", "Meta salva com sucesso Zé!", [{
                text: 'Ok',
                onPress: () => router.back()
            }])
        } catch (error) {
            Alert.alert("Erro", "Deu erro ao salvar Zé!")
            console.log(error)

            setIsProcessing(false)
        }
    }

    async function update(){
        try {
            await targetDatabase.update({
                id: Number(params.id),
                name,
                amount
            })

            Alert.alert("Alerta", "Meta salva com sucesso Zé!", [{
                text: 'Ok',
                onPress: () => router.back()
            }])
        } catch (error) {
            Alert.alert("Erro", "Deu erro ao salvar Zé!")

            setIsProcessing(false)
        }
    }

    async function fetchDetails(){
        if(!params.id) return

        try {
            const response = await targetDatabase.show(Number(params.id))
            setName(response.name)
            setAmount(response.amount)
        } catch (error) {
            Alert.alert("Erro", "Não foi possivel carregar os detalhes da meta")
        }
    }

    function handleRemove(){
        if(!params.id) return

        Alert.alert("Remover", "Deseja realmente remover?", [
            { text: "Não" },
            { text: "Sim", onPress: remove}
        ])
    }

    async function remove(){
        try {
            await targetDatabase.remove(Number(params.id))

            Alert.alert("Alerta", "Zé se deletou a meta!", [{
                text: 'Ok',
                onPress: () => router.replace("/")
            }])
        } catch (error) {
            Alert.alert("Erro", "Não foi possivel deletar Zé")
            console.log(error);
        }
    }

    useEffect(() => {
        if(params.id){
            fetchDetails()
        }
    }, [params.id])

    return (
        <View style={{flex: 1, padding: 24}}>
            <PageHeader title="Meta" subtitle="Economize para alcançar sua meta financeira" 
                rightButton={
                    params.id ? { icon: "delete", onPress: handleRemove } : undefined
                }/>
            
            <View style={{marginTop: 32, gap: 24}}>
                <Input label="Nome da meta" placeholder="Ex: Viagem, carro, apartamento..."
                    onChangeText={setName}
                    value={name} />

                <CurrencyInput label="Valor alvo (R$)" placeholder="Ex: 1.000,00" value={amount}
                    onChangeValue={setAmount} />

                <Button title="Salvar" onPress={handleSave} isProcessing={isProcessing} />
            </View>
        </View>
    )
}