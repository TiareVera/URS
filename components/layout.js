import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { Link, usePathname } from "expo-router";

export default function Layout({ children }) {
    const pathname = usePathname(); // Obtiene la ruta actual

    // Rutas donde NO se mostrarán las barras de navegación
    const hideNavigation = ["/login", "/main"];

    const shouldShowNavigation = !hideNavigation.includes(pathname);

    return (
        <View style={styles.container}>
            {/* Contenido de la pestaña */}
            <View style={styles.content}>{children}</View>

            {/* Barra de navegación condicional */}
            {shouldShowNavigation && (
                <View style={Platform.OS === "web" ? styles.navBarWeb : styles.navBarMobile}>
                    <Link href="/principal" style={styles.navLink}>
                        🏠 Inicio
                    </Link>
                    <Link href="/crearRegistro" style={styles.navLink}>
                        ➕ Crear Registro
                    </Link>
                    <Link href="/registro" style={styles.navLink}>
                        📋 Ver Registros
                    </Link>
                    <TouchableOpacity onPress={() => alert("Cerrar sesión")}>
                        <Text style={styles.navLink}>⚙️ Configuración</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F7F7",
    },
    content: {
        flex: 1,
    },
    navBarMobile: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#072E44",
        paddingVertical: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5, // Sombra en Android
        position: "absolute",
        bottom: 0,
        width: "100%",
    },
    navBarWeb: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "#072E44",
        paddingVertical: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5, // Sombra en Android
        position: "sticky",
        bottom: 0,
        width: "100%",
    },
    navLink: {
        fontSize: 16,
        color: "#FFF",
        textAlign: "center",
    },
});
