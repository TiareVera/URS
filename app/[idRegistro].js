import { Link } from "expo-router";
import { ActivityIndicator, Text, View, StyleSheet, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { getPokemonDetails } from "../lib/metacritic";

export default function Detail() {
    const { idRegistro } = useLocalSearchParams();
    const [registroInfo, setRegistroInfo] = useState(null); // Asegúrate de inicializar con null para manejar correctamente el estado

    useEffect(() => {
        if (idRegistro) {
            getPokemonDetails(idRegistro).then((registro) => {
                setRegistroInfo(registro);
            });
        }
    }, [idRegistro]);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            {registroInfo === null ? (
                <ActivityIndicator color="blue" size="large" style={{ paddingVertical: 30 }} />
            ) : (
                <View style={{ padding: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                        Aquí está el ID: {registroInfo.id}
                    </Text>
                    <Text style={{ marginTop: 10, fontSize: 16 }}>
                        Aquí está la foto
                    </Text>
                    <Image
                        source={{ uri: registroInfo.image }}
                        style={styles.image}
                    />
                    <Text style={{ marginTop: 10, fontSize: 16 }}>
                        Aquí está la descripción: {registroInfo.name}
                    </Text>
                    <Link href="/" asChild>
                        <Text style={{ color: "blue", marginTop: 20, textDecorationLine: "underline" }}>
                            VOLVER A LISTADO
                        </Text>
                    </Link>
                </View>
            )}
        </View>
    );
}
const styles = StyleSheet.create({
    card: {
        marginBottom: 16,
        alignItems: "center",
        backgroundColor: "green"
    },
    image: {
        width: 100, // Corregido
        height: 100,
        borderRadius: 20,
    },
    text: {
        marginTop: 8,
        fontSize: 16,
        color: "#333",
    },
});

