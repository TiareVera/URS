
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import axios from "axios";
import {
    View, Text, Image, StyleSheet,
    useWindowDimensions, ScrollView, TouchableOpacity,
    SafeAreaView, FlatList, ActivityIndicator
} from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import DownBar from "./downbar";
import UpBar from "./upbar";
export function Principal() {
    const { width } = useWindowDimensions();
    const isWeb = width >= 1500; // Determina si es "web"
    const styles = isWeb ? webStyles : appStyles; // Usa estilos según la plataforma
    const [ultimoRegistro, setUltimoRegistro] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null)
    const [userID, setUserID] = useState(null);
    async function getUser() {
        setUser(await AsyncStorage.getItem('username'))
        setUserID(await AsyncStorage.getItem('userID'))
        return await AsyncStorage.getItem('username');
    }
    const fetchUltimoRegistro = async () => {
        try {
            const response = await axios.get(`http://192.168.1.35:5001/ultimo-registro/${userID}`);
            setUltimoRegistro(response.data.data);
        } catch (error) {
            //console.error("Error al obtener el último registro:", error.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {

        fetchUltimoRegistro()
    })
    useEffect(() => {
        getUser()

    }, [])
    const cards = [
        {
            title: "Diseño De Solución",
            descrition:
                "Fase de entendimiento y levantamiento de necesidades para personalizar la solución a la medida de cada proyecto. Definición de magnitudes a monitorear, alcance de los dispositivos y límites de operación.",
            posterUrl: "https://www.mawat.io/wp-content/uploads/2024/05/SOLUCION-graphic-2.svg",
        },
        {
            title: "Implementación Eficiente",
            descrition:
                "Fase de implementación con estándares globales y optimización de recursos. Se prioriza la calidad en cada paso.",
            posterUrl: "https://www.mawat.io/wp-content/uploads/2024/05/PRUEBA-graphic-1.svg",
        },
        {
            title: "Implementación",
            descrition:
                "Para una implementación efectiva, se establecen las ubicaciones de los sensores y se crean los usuarios y dependencias. Con el fin de garantizar una transición efectiva y un funcionamiento óptimo se realiza una capacitación detallada al personal.",
            posterUrl: "https://www.mawat.io/wp-content/uploads/2024/05/IMPLEMENTACION-graphic-V2.svg",
        },
        {
            title: "Validación",
            descrition:
                "Aplicamos el protocolo de validación y calificación local para garantizar el cumplimiento de las normativas GAMP5 en el ecosistema del cliente.",
            posterUrl: "https://www.mawat.io/wp-content/uploads/2024/05/VALIDACION-graphic-1.svg",
        },
        {
            title: "Soporte",
            descrition:
                "Nuestro equipo de soporte brinda asesoría continua en la gestión operativa y ante la generación de incidencias. Realizamos calibraciones y mantenciones de los dispositivos y de ser necesario, su reposición durante todo el periodo de contratación.",
            posterUrl: "https://www.mawat.io/wp-content/uploads/2024/05/SOPORTE-graphic-1.svg",
        },
    ];
    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemtitle}>{item.title}</Text>
            <View style={styles.itemdescriptionContainer}>
                <Text style={styles.itemdescription}>{item.descrition}</Text>

            </View>
        </View >
    );
    return (

        <View style={styles.container}>
            {user ? (<>
                {isWeb && (<DownBar></DownBar>)}
                {!isWeb && (<UpBar></UpBar>)}

                <View style={styles.content}>
                    <Text style={styles.greeting}>Hola {user}</Text>
                    <Text style={styles.greeting}>Bienvenido a Mawat</Text>

                    {/* Tarjetas informativas */}
                    {isWeb ? (<View style={styles.card}>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            snapToAlignment="center" // Alinea el carrusel al centro
                            decelerationRate="fast" // Hace el scroll más rápido
                            contentContainerStyle={styles.scrollContainer}
                        >
                            {cards.map((item, index) => (
                                <View key={index} style={[styles.card,]}>
                                    <Text style={styles.cardTitle}>{item.title}</Text>
                                    <Image
                                        source={{ uri: item.posterUrl }}
                                        style={styles.image}
                                    />
                                    <View style={[styles.cardDescriptionContainer,]}>
                                        {!isWeb && (<ScrollView>
                                            <Text style={styles.cardDescription}>{item.descrition}</Text>
                                        </ScrollView>)}
                                        {isWeb && (<Text style={styles.cardDescription}>{item.descrition}</Text>)}

                                    </View>
                                </View>
                            ))}


                        </ScrollView>
                    </View>) : (

                        <View style={{ marginHorizontal: "auto", height: "50%" }}>
                            <SafeAreaView>
                                <FlatList
                                    data={cards}
                                    renderItem={renderItem}
                                    keyExtractor={(item, index) => index.toString()}
                                    showsVerticalScrollIndicator={false}
                                    style={styles.list}
                                />

                            </SafeAreaView>

                        </View>


                        /*  <ScrollView
                             vertical={true} // Cambio importante aquí
                         >
                             
                                 {cards.map((item, index) => (
                                     <View key={index} style={styles.card}>
                                         <Text style={styles.cardTitle}>{item.title}</Text>
                                         <Image source={{ uri: item.posterUrl }} style={[styles.image, { backgroundColor: "red" }]} />
                                         <View style={styles.cardDescriptionContainer}>
 
                                             <Text style={styles.cardDescription}>{item.descrition}</Text>
 
                                         </View>
                                     </View>
                                 ))}
 
                         </ScrollView> */
                    )}


                    {/*  <Text style={styles.sectionTitle}>Último registro</Text>

        
            <View style={styles.lastRecord}>
                <View style={styles.recordIconContainer}>
                    <Text style={styles.recordIcon}>📷</Text>
                </View>
                <View style={styles.recordContent}>
                    <Text style={styles.recordTitle}>Título</Text>
                    <Text style={styles.recordDescription}>
                        Descripción del registro, Lorem ipsum dolor amet, consectetur adipiscing elit. Finibus mus diam libero
                        lobortis porttitor.
                    </Text>
                </View>
            </View> */}
                    {!isWeb && (<><Text style={[styles.greeting, { fontSize: 20, width: "100%" }]}>Ultimo Registro</Text>
                        {ultimoRegistro ? (
                            <View style={styles.mobileFooter}>
                                <Image source={{ uri: ultimoRegistro.foto }} style={[styles.image, { borderRadius: 100, margin: 10 }]} />
                                <View style={{ width: "60%" }}>
                                    <Text style={[styles.greeting, { fontSize: 18, width: "100%" }]}>{ultimoRegistro.titulo}</Text>
                                    <Text style={styles.description}>{ultimoRegistro.descipcion}</Text>
                                </View>

                            </View>
                        ) : (
                            <TouchableOpacity
                                style={styles.createButton}
                                onPress={() => router.push("/crearRegistro")}
                            >
                                <Text style={styles.createButtonText}>Crear Registro</Text>
                            </TouchableOpacity>
                        )}</>)}

                </View >

                {/* Navegación inferior (solo móvil) */}

                {!isWeb && (<DownBar></DownBar>)}
            </>) : (

                <View style={styles.lastRecord}>
                    <ActivityIndicator color="blue" size="large" />
                </View>
            )}

        </View >
    )
}
const appStyles = StyleSheet.create({
    mobileFooter: {
        position: "absolute",
        bottom: "12%",
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#FBFBFB", // Fondo blanco
        borderRadius: 20, // Bordes redondeados
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5, // Sombra para Android
    },
    itemContainer: {
        backgroundColor: '#f9f9f9',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    itemtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    itemdescriptionContainer: {
        marginTop: 5,
    },
    itemdescription: {
        fontSize: 14,
        color: '#666',
    },
    image: {
        backgroundColor: "red",
        height: 100,
        width: 100,
        padding: 5
    },
    list: {
        width: "100%",
        alignContent: "center",
        height: "100%"
    },
    scrollContainer: {
        width: "100%",
    },
    cardDescriptionContainer: {
        maxHeight: 100, // Altura máxima del área de descripción
        width: "95%", // Ocupa el ancho completo de la tarjeta
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 10, // Espaciado interno para el texto
        backgroundColor: "#FBFBFB", // Fondo claro para visibilidad

    },
    cardDescription: {
        fontSize: 18,
        color: "#666",
        lineHeight: 20, // Espaciado entre líneas
        textAlign: "justify", // Justificación para mejor lectura
    },
    container: {
        flex: 1,
        height: "90%",

        backgroundColor: "#BFC1C0",
    },
    content: {
        padding: 16,
        height: "90%",
        marginVertical: "auto",
        alignItems: "center",
        width: "80%",
        marginHorizontal: "auto",

    },
    greeting: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        margin: 8,
        textAlign: "left",
        width: "80%"
    },
    card: {
        marginBottom: 16,
        height: "60%",
        borderColor: "black",
        width: "80%",
        margin: "3%",
        alignItems: "center",
        backgroundColor: "blue"
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: "bold",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        margin: 20,
        textAlign: "left",
        width: "80%"
    },
    lastRecord: {
        flexDirection: "row",
        alignItems: "left",
        backgroundColor: "#FBFBFB",
        borderRadius: 16,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    recordIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#EFEFEF",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 16,
    },
    recordIcon: {
        fontSize: 24,
    },
    recordContent: {
        flex: 1,
    },
    recordTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    recordDescription: {
        fontSize: 14,
        color: "#666",
    },
});

const webStyles = StyleSheet.create({
    ...appStyles,
    content: {
        padding: 16,
        height: "90%",
        marginVertical: "auto",
        alignItems: "center",
        width: "80%",
        marginHorizontal: "auto",

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderRadius: 20,
        backgroundColor: "#FBFBFB",
        borderColor: "black",

    },
    card: {
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        height: "60%",
        borderColor: "black",
        width: "80%",
        margin: "3%",
        alignItems: "center"
    },

    image: {
        width: "100%",
        height: "100%",
        resizeMode: "contain", // Asegura que toda la imagen sea visible
    },
});