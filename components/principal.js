import { Link } from "expo-router";
import { useEffect, useRef, useState } from "react";
import logo from '../assets/logo_blanco.jpeg';
import { useRouter } from "expo-router";
import { View, Text, Image, StyleSheet, Animated, Pressable, useWindowDimensions, TouchableOpacity } from "react-native"
export function Principal() {
    const { width } = useWindowDimensions();
    const isWeb = width >= 1500; // Determina si es "web"
    const styles = isWeb ? webStyles : appStyles; // Usa estilos según la plataforma
    const [showDropdown, setShowDropdown] = useState(false); // Estado para mostrar/ocultar el menú desplegable
    const router = useRouter();
    const handleNavigation = (route) => {
        router.push(route);
    };
    return (<View style={styles.container}>
        <View style={styles.header}>
            <Image source={logo} style={styles.logo} />
            {isWeb && (
                <View style={styles.navigation}>
                    <Link href="/principal" style={styles.navLink}>
                        Inicio
                    </Link>
                    <TouchableOpacity
                        onPress={() => handleNavigation("/crearRegistro")}
                        style={styles.navLink}
                    >
                        <Text style={styles.navLink}>Agregar Registro</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleNavigation("/registro")}
                        style={styles.navButton}
                    >
                        <Text style={styles.navLink}>Ver Registros</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => alert("Cerrar sesión")} style={styles.navButton}>
                        <Text style={styles.navLink}>Configuración</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
        <View style={styles.content}>
            <Text style={styles.greeting}>Hola UserName,</Text>
            <Text style={styles.subtitle}>Soluciones sin Límite de Industria</Text>

            {/* Tarjetas informativas */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Industria Farmacéutica</Text>
                <Text style={styles.cardText}>
                    MAWAT garantiza la integridad, seguridad y propiedad de los datos. Cumple con las exigencias actuales
                    de monitoreo al estar validada por GMP, GSP GAMP5 y CFR21.
                </Text>
            </View>

            <Text style={styles.sectionTitle}>Último registro</Text>

            {/* Registro */}
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
            </View>
        </View>

        {/* Navegación inferior (solo móvil) */}
        {!isWeb && (
            <View style={styles.bottomNavigation}>
                <Link href="/principal" style={styles.navButton}>
                    🏠
                </Link>
                <Link href="/crearRegistro" style={styles.navButton}>
                    ➕
                </Link>
                <Link href="/registro" style={styles.navButton}>
                    📋
                </Link>
                <TouchableOpacity onPress={() => alert("cerrar sesion")}>
                    <Text style={styles.navButton}>
                        ⚙️
                    </Text>
                </TouchableOpacity>
            </View>
        )}
    </View>
    )
}
const appStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F7F7",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
    },
    logo: {
        width: 120,
        height: 50,
        resizeMode: "contain",
    },
    content: {
        padding: 16,
    },
    greeting: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        marginBottom: 16,
    },
    card: {
        backgroundColor: "#EFEFEF",
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    cardText: {
        fontSize: 14,
        color: "#666",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 8,
    },
    lastRecord: {
        flexDirection: "row",
        alignItems: "center",
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
    bottomNavigation: {
        position: "absolute", // Fija la barra de navegación
        bottom: 0, // Toca el borde inferior de la pantalla
        left: 0, // Alineado al borde izquierdo
        right: 0, // Alineado al borde derecho
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#072E44",
        paddingVertical: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5, // Sombra en Android
    },

    navButton: {
        fontSize: 20,
        color: "#FFF",
        textAlign: "center",
    },
});

const webStyles = StyleSheet.create({
    ...appStyles,
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
    },
    navigation: {
        flexDirection: "row",
    },/* 
    navLink: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#072E44",
        marginHorizontal: 16,
    }, */
    navLink: {
        color: "#072E44",
        fontSize: 18,
        fontWeight: "bold",
        marginHorizontal: 20,
        cursor: "pointer", // Agrega el cursor para web
    },
    dropdownContainer: {
        position: "relative", // Necesario para posicionar el menú desplegable
    },
    dropdownMenu: {
        position: "absolute",
        top: "100%", // Posiciona el menú debajo del enlace
        left: 0,
        backgroundColor: "#FFF",
        borderRadius: 8,
        padding: 8,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        zIndex: 10, // Asegura que el menú aparezca encima de otros elementos
    },
    dropdownItem: {
        color: "#333",
        fontSize: 16,
        paddingVertical: 8,
        paddingHorizontal: 16,
        cursor: "pointer", // Cursor en la web
        textAlign: "left",
    },
});