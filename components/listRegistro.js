import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    useWindowDimensions,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import axios from "axios";
import DownBar from "./downbar";
import UpBar from "./upbar";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Registro() {
    const { width } = useWindowDimensions();
    const isWeb = width >= 1500; // Determina si es "web"
    const styles = isWeb ? webStyles : appStyles; // Usa estilos según la plataforma
    const router = useRouter();

    const [registros, setRegistros] = useState([]); // Estado para almacenar los registros

    useEffect(() => {
        // Función para obtener los registros desde el backend
        const obtenerRegistros = async () => {
            try {
                const response = await axios.get("http://192.168.1.35:5001/obtener-registros");
                if (response.data.status === "ok") {

                    setRegistros(response.data.data); // Guarda los registros en el estado

                } else {
                    console.log("Error al obtener registros:", response.data.data);
                }
            } catch (error) {
                console.log("Error al conectar con el backend:", error.message);
            }
        };

        obtenerRegistros(); // Llamar a la función al cargar la página
    }, []);

    const renderRegistro = ({ item }) => (

        <TouchableOpacity

            style={styles.card}
            onPress={() => router.push(`/${item._id}`)} // Navega al detalle del registro
        >
            <Text style={styles.cardTitle}>{item.titulo}</Text>
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.foto }} style={styles.image} />
            </View>
        </TouchableOpacity>
    );
    return (
        <View style={{ height: "100%", backgroundColor: "#BFC1C0" }}>
            {isWeb && <DownBar />}
            {!isWeb && <UpBar />}

            <Text style={styles.title}>Todos los registros</Text>
            {registros.length == 0 ? (
                <ActivityIndicator color="blue" size="large" />
            ) :
                (<>
                    {
                        isWeb ? (
                            <FlatList
                                data={registros}
                                renderItem={renderRegistro}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                style={styles.carousel}
                            />
                        ) : (
                            <View style={{ marginHorizontal: "auto", height: "70%" }}>
                                <SafeAreaView>
                                    <FlatList
                                        data={registros}
                                        renderItem={renderRegistro}
                                        keyExtractor={(item, index) => index.toString()}
                                        showsVerticalScrollIndicator={false}
                                        style={styles.list}
                                    />

                                </SafeAreaView>

                            </View>


                        )}
                </>)}


            {!isWeb && <DownBar />}
        </View>
    );
}

const appStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: "10%",
        marginBottom: "10%",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
        marginTop: 16,
        paddingHorizontal: 20,
        textAlign: "start",
    },
    card: {
        backgroundColor: "#F1F1F1",
        width: 500, // Ancho ajustado para carrusel
        borderRadius: 20,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginHorizontal: 10, // Espaciado entre tarjetas
        marginVertical: 10
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    imageContainer: {
        backgroundColor: "#000",
        width: "100%",
        height: 150, // Tamaño fijo para imágenes
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
        borderRadius: 8,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 8,
    },
    cardDescription: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
    },
    list: {
        width: "100%",
        alignContent: "center"
    },
    carousel: {
        paddingVertical: 10,
    },
});

const webStyles = StyleSheet.create({
    ...appStyles,
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
    },
    card: {
        ...appStyles.card,
        width: 400, // Aumenta el ancho de la tarjeta
        height: 500
    },
    imageContainer: {
        backgroundColor: "#000",
        width: "100%",
        height: 300, // Tamaño fijo para la altura
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
        borderRadius: 8,
        overflow: "hidden", // Asegura que la imagen no se desborde
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "contain", // Ajusta la imagen para que se vea completa
    },
    title: {
        ...appStyles.title,
        marginBottom: 16,
    }
});
