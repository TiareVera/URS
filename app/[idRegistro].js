import { StyleSheet } from "react-native";
import { Detail } from "../components/viewRegistro";
import { useLocalSearchParams } from "expo-router";

export default function Details() {
    const { idRegistro } = useLocalSearchParams(); // Obtiene idRegistro de los parámetros de la ruta

    return <Detail idRegistro={idRegistro} />; // Pasa el parámetro como prop al componente Detail
}
