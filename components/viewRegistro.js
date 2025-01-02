import { ActivityIndicator, Text, View, StyleSheet, Image, ScrollView, useWindowDimensions } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

import DownBar from "./downbar";
import UpBar from "./upbar";
export function Detail({ idRegistro }) {
    const [registroInfo, setRegistroInfo] = useState(null);
    const { width } = useWindowDimensions();
    const isWeb = width >= 1500; // Determina si es "web"
    const styles = isWeb ? webStyles : appStyles; // Usa estilos según la plataforma


    useEffect(() => {
        if (idRegistro) {
            axios.get(`http://192.168.1.35:5001/obtener-registro/${idRegistro}`)
                .then(response => setRegistroInfo(response.data.data))
                .catch(error => console.error("Error al obtener registro:", error.message));
        }
    }, [idRegistro]);

    return (
        <View style={{
            height: "100%",
            backgroundColor: "#BFC1C0",
        }} >
            {isWeb && (<DownBar></DownBar>)}
            {!isWeb && (<UpBar></UpBar>)}
            <View style={styles.container}>
                {registroInfo === null ? (
                    <ActivityIndicator color="blue" size="large" style={{ marginTop: 20 }} />
                ) : (
                    <ScrollView style={styles.content}>
                        <Text style={styles.title}>{registroInfo.titulo}</Text>
                        <View style={styles.descriptionContainer}>
                            <Text style={styles.description}>{registroInfo.descipcion}</Text>
                        </View>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: registroInfo.foto }} style={styles.image} />
                        </View>
                    </ScrollView>
                )}
            </View>
            {!isWeb && (<DownBar></DownBar>)}
        </View>

    );
}


const appStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        marginTop: "2%",
        width: "80%",
        height: "80%",
        marginHorizontal: "auto"
    },
    content: {
        flex: 1,
        width: "100%",
        height: "60%",

    },
    card: {
        backgroundColor: "#F1F1F1",
        width: "90%",
        height: "90%",
        borderRadius: 20,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        alignItems: "center",
    },
    imageContainer: {
        width: "100%",
        height: "100%", // Puedes ajustar la altura según tus necesidades
        marginBottom: 16,
        backgroundColor: "#EEE", // Fondo para diferenciar el área
        justifyContent: "space-between", // Alinea el contenido hacia arriba
        alignItems: "flex-start",
        borderRadius: 20,
        padding: "1%"
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "contain", // Ajusta la imagen para que quede completamente visible
        alignSelf: "flex-start", // Posiciona la imagen desde la parte superior

    },
    descriptionContainer: {
        backgroundColor: "#FFF",
        borderRadius: 16,
        padding: 16,
        marginVertical: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        width: "100%",
    },
    description: {
        fontSize: 16,
        color: "#555",
        lineHeight: 22,
        textAlign: "justify",
    },
    cameraIcon: {
        fontSize: 32,
        color: "#FFF",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 16,
    },
    button: {
        backgroundColor: "#072E44",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginHorizontal: 8,
        flex: 1,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    saveButton: {
        backgroundColor: "#28A745",
        width: "90%",
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 20,
    },
    saveButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    fileInput: {
        display: "none",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 16,
        textAlign: "start",
    },
});

const webStyles = StyleSheet.create({
    ...appStyles,
    card: {
        ...appStyles.card,
        width: "50%", // Ajusta el tamaño en web
    },
    saveButton: {
        ...appStyles.saveButton,
        width: "50%", // Ajusta el tamaño en web
    },
    imageContainer: {
        width: "100%",
        height: 500, // Puedes ajustar la altura según tus necesidades
        marginBottom: 16,
        backgroundColor: "#EEE", // Fondo para diferenciar el área
        justifyContent: "space-between", // Alinea el contenido hacia arriba
        alignItems: "flex-start",
        borderRadius: 20,
        padding: "1%"
    },
});
