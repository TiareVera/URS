import { Link } from "expo-router";
import { ScrollView, Text } from "react-native";

export default function CrearRegistro() {
    return (
        <ScrollView>
            <Link href={"/"}><Text>Volver</Text></Link>
            <Text>Aqui esta el crear registro </Text>
        </ScrollView>
    )
}