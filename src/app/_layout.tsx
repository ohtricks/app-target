import { Stack } from "expo-router";
import { colors } from "@/theme/colors";
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold } from "@expo-google-fonts/inter";
import { Loading } from "@/components/Loading";

export default function Layout(){
    const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_500Medium, Inter_700Bold })
    console.log("carregando font")

    if(!fontsLoaded){
        console.log("nao carrego")

        return <Loading />
    }

    console.log("passou por aqui primeiro")
    return (
        <Stack 
            screenOptions={{
                headerShown: false,
                contentStyle: {
                    backgroundColor: colors.white
                }
            }}/>
    )
}