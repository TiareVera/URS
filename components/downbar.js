import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions, Image, Pressable } from "react-native";
import { Link, usePathname } from "expo-router";
import logo from "../assets/logo.jpeg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import CustomModal from "../components/modal/alertModal";
import Entypo from '@expo/vector-icons/Entypo';
export default function DownBar() {
    const pathname = usePathname(); // Ruta actual
    const { width } = useWindowDimensions();
    const isWeb = width >= 1500; // Detección de entorno web
    const [isModalVisible, setModalVisible] = useState(false);

    // Rutas donde NO se mostrarán las barras de navegación
    const hideNavigation = ["/login", "/main"];
    const shouldShowNavigation = !hideNavigation.includes(pathname);

    if (!shouldShowNavigation) {
        return null; // No renderiza la barra si está en una ruta excluida
    }

    const handleSecondaryAction = () => {
        setModalVisible(false);
    };
    const router = useRouter();

    async function logOut() {
        await AsyncStorage.removeItem('username');
        router.push("/");

    }
    const handlePrimaryAction = () => {
        // Lógica para cerrar sesión
        console.log("Cerrando sesión...");
        setModalVisible(false);
        logOut()
    };
    return (
        <>
            <CustomModal
                visible={isModalVisible}
                onClose={() => setModalVisible(false)}
                title="¿Estás seguro de cerrar sesión?"
                primaryAction={handlePrimaryAction}
                primaryText="Cerrar Sesión"
                secondaryAction={handleSecondaryAction}
                secondaryText="Cancelar"
            />
            {isWeb ? (
                <View style={styles.webHeader}>
                    <Link href={"/principal"}>
                        <Pressable>
                            <Image source={logo} style={styles.logo} />
                        </Pressable>
                    </Link>
                    <View style={styles.navigation}>
                        <Link href="/principal" style={styles.navLink}>
                            Inicio
                        </Link>
                        <Link href="/crearRegistro" style={styles.navLink}>
                            Agregar Registro
                        </Link>
                        <Link href="/registro" style={styles.navLink}>
                            Ver Registros
                        </Link>
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <Text style={styles.navLink}>Cerrar Sesión</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View style={styles.mobileFooter}>
                    <Link href="/principal">
                        <Entypo name="home" size={24} color="#072E44" />
                    </Link>
                    <Link href="/crearRegistro" >
                        <Entypo name="add-to-list" size={24} color="#072E44" />
                    </Link>
                    <Link href="/registro" >
                        <Entypo name="list" size={24} color="#072E44" />
                    </Link>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Entypo name="log-out" size={24} color="#072E44" />
                    </TouchableOpacity>
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    mobileFooter: {
        position: "absolute",
        bottom: 10,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#FBFBFB", // Fondo blanco
        borderRadius: 20, // Bordes redondeados
        marginHorizontal: 10, // Margen lateral para dar espacio al footer
        paddingVertical: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5, // Sombra para Android
    },
    navButton: {
        width: 50, // Ajustar el tamaño del área táctil
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },

    webHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#072E44", // Color correcto para el fondo
        padding: 16,
        height: 70,
    },
    logo: {
        width: 120,
        height: 50,
        resizeMode: "contain",
    },
    navigation: {
        flexDirection: "row",
    },
    navLink: {
        color: "#FFF", // Color blanco para el texto
        fontSize: 18,
        fontWeight: "bold",
        marginHorizontal: 20,
        textDecorationLine: "none",
        cursor: "pointer", // Para web
    },

});
