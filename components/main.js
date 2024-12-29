import { StyleSheet, Text, View, Image, useWindowDimensions, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import logo from '../assets/logo.jpeg';
import linkeding from '../assets/icons/linkedin.png';

export function Main() {
    const { width } = useWindowDimensions();

    const isWeb = width >= 1500; // Determina si es "web"
    const styles = isWeb ? webStyles : appStyles; // Usa estilos según la plataforma

    return (
        <View style={styles.container}>
            {/* Logo */}
            <Image source={logo} style={styles.logo} />

            {/* Texto de bienvenida */}
            <Text style={styles.welcomeText}>Bienvenido de vuelta</Text>

            {/* Botón de inicio de sesión */}
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btn}>
                    <Link href={'/logIn'}>
                        <Text style={styles.btnText}>Iniciar Sesión</Text>
                    </Link>
                </TouchableOpacity>
            </View>

            {/* Redes sociales (solo en móvil) */}
            {!isWeb && (
                <View style={styles.socialContainer}>
                    <Text style={styles.socialText}>
                        ¡Síguenos en nuestras redes sociales{"\n"}para más información!
                    </Text>
                    <TouchableOpacity style={styles.socialButton}>
                        <Link href={'https://www.linkedin.com/company/mawat-solutions/?originalSubdomain=cl'}>
                            <Image source={linkeding} style={styles.socialIcon} />
                        </Link>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const appStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#072E44",
        alignItems: "center", // Centrado en móvil
    },
    logo: {
        marginVertical: "10%",
        alignSelf: "center",
        height: 150,
        width: 500,
    },
    welcomeText: {
        fontSize: 30,
        color: "white",
        marginVertical: 20,
        fontFamily: 'OpenSans-Bold',
        textAlign: "center",
    },
    btnContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: "5%",
        width: "100%",
        paddingHorizontal: "10%",
    },
    btn: {
        backgroundColor: "#F1F1F1",
        width: "70%",
        padding: 10,
        borderRadius: 20,
        alignItems: "center",
    },
    btnText: {
        fontSize: 16,
        color: "#2E2E2E",
        fontFamily: 'OpenSans-Regular',
        textAlign: "center",
    },
    socialContainer: {
        alignItems: "center",
        marginTop: 30,
    },
    socialText: {
        color: '#E7E7E7',
        textAlign: "center",
        fontSize: 16,
    },
    socialButton: {
        marginTop: 30,
    },
    socialIcon: {
        width: 40,
        height: 40,
    },
});

const webStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#072E44",
    },
    logo: {
        marginVertical: "20%",
        alignSelf: "flex-start",
        height: 250,
        width: 800,
        marginStart: "5%",
    },
    welcomeText: {
        fontSize: 50,
        color: "white",
        fontFamily: 'OpenSans-Bold',
        position: 'absolute',
        textAlign: "right",
        alignSelf: "flex-start",
        width: "90%",
        marginVertical: "20%",
        paddingEnd: 50,
    },
    btnContainer: {
        alignItems: "flex-end",
        position: "absolute",
        marginVertical: "30%",
        width: "90%",
    },
    btn: {
        backgroundColor: "#F1F1F1",
        width: "30%",
        padding: 20,
        borderRadius: 20,
        alignItems: "center",
    },
    btnText: {
        fontSize: 20,
        color: "#2E2E2E",
        fontFamily: 'OpenSans-Regular',
        textAlign: "center",
    },
});
