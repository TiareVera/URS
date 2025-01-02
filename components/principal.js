import { Link } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "expo-router";
import {
    View, Text, Image, StyleSheet,
    Animated, Pressable, useWindowDimensions,
    TouchableOpacity, ScrollView, Dimensions, ImageBackground, Button,
    SafeAreaView, FlatList
} from "react-native"
import logo from "../assets/logo.jpeg";
import CustomModal from "./modal/alertModal";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SvgUri, { Svg } from 'react-native-svg'; // Asumiendo que usas una versión que aún lo soporta.
import img1 from "../assets/images/img1.png"


import DownBar from "./downbar";
import UpBar from "./upbar";
export function Principal() {
    const { width } = useWindowDimensions();
    const isWeb = width >= 1500; // Determina si es "web"
    const styles = isWeb ? webStyles : appStyles; // Usa estilos según la plataforma
    const [showDropdown, setShowDropdown] = useState(false); // Estado para mostrar/ocultar el menú desplegable
    const router = useRouter();
    const handleNavigation = (route) => {
        router.push(route);
    };
    const ITEM_WIDTH = Dimensions.get("window").width * 0.9
    const ITEM_HEIGHT = 200
    const [user, setUser] = useState(null)
    async function getUser() {
        setUser(await AsyncStorage.getItem('username'))
        return await AsyncStorage.getItem('username');
    }
    useEffect(() => {
        getUser()
    })
    const [isModalVisible, setModalVisible] = useState(false);

    const handlePrimaryAction = () => {
        // Lógica para cerrar sesión
        console.log("Cerrando sesión...");
        setModalVisible(false);
    };

    const handleSecondaryAction = () => {
        setModalVisible(false);
    };
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

                        <View style={{ marginHorizontal: "auto", height: "70%" }}>
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
                </View >

                {/* Navegación inferior (solo móvil) */}

                {!isWeb && (<DownBar></DownBar>)}
            </>) : (
                <View style={styles.lastRecord}>
                    <Text style={styles.recordTitle}>Acceso denegado</Text>
                </View>
            )}

        </View >
    )
}
const appStyles = StyleSheet.create({
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
        width: 100
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

        backgroundColor: "#FBFBFB",
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