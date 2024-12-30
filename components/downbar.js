import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions, Image } from "react-native";
import { Link, usePathname } from "expo-router";
import logo from "../assets/logo.jpeg";

export default function DownBar() {
    const pathname = usePathname(); // Ruta actual
    const { width } = useWindowDimensions();
    const isWeb = width >= 1500; // Detección de entorno web

    // Rutas donde NO se mostrarán las barras de navegación
    const hideNavigation = ["/login", "/main"];
    const shouldShowNavigation = !hideNavigation.includes(pathname);

    if (!shouldShowNavigation) {
        return null; // No renderiza la barra si está en una ruta excluida
    }

    return (
        <>
            {isWeb ? (
                <View style={styles.webHeader}>
                    <Image source={logo} style={styles.logo} />
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
                        <TouchableOpacity onPress={() => alert("Cerrar sesión")}>
                            <Text style={styles.navLink}>Configuración</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View style={styles.mobileFooter}>
                    <Link href="/principal" style={styles.navButton}>
                        🏠
                    </Link>
                    <Link href="/crearRegistro" style={styles.navButton}>
                        ➕
                    </Link>
                    <Link href="/registro" style={styles.navButton}>
                        📋
                    </Link>
                    <TouchableOpacity onPress={() => alert("Cerrar sesión")}>
                        <Text style={styles.navButton}>⚙️</Text>
                    </TouchableOpacity>
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
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
    mobileFooter: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#072E44",
        paddingVertical: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    navButton: {
        fontSize: 20,
        color: "#FFF",
        textAlign: "center",
    },
});
