import { Link } from "expo-router";
import { ScrollView, Text } from "react-native";

export default function Registro() {
    return (
        <ScrollView>
            <Link href={"/principal"}><Text>Volver</Text></Link>
            <Text>Aqui esta el registro </Text>
        </ScrollView>
    )
}