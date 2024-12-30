import { StyleSheet, Text, View, TextInput, useWindowDimensions, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Link } from "expo-router";
import axios from "axios";
import { useRouter } from "expo-router";
export function Login() {
    const { width } = useWindowDimensions();
    const isWeb = width >= 1500; // Determina si es "web"

    const styles = isWeb ? webStyles : appStyles; // Usa estilos según la plataforma

    const initialFormState = {
        userName: "",
        pass: "",
    };
    const [formState, setFormState] = useState(initialFormState);
    const [passwordVisible, setPasswordVisible] = useState(false); // Estado para alternar visibilidad de contraseña
    const API_BASE_URL = "http://192.168.1.35:5001"; // Cambia la IP según tu red local

    function onChangeDato(name, value) {
        console.log(name, value)
        setFormState((prevState) => ({ ...prevState, [name]: value }));
    }

    async function registerUser() {
        if (formState.userName && formState.pass) {
            try {
                const response = await axios.post(`${API_BASE_URL}/register`, {
                    userName: formState.userName,
                    password: formState.pass,
                });
                if (response.data === "User already exists") {
                    alert("Usuario ya registrado");
                } else {
                    alert("Usuario registrado con éxito");
                }
            } catch (error) {
                console.log("Error al registrar usuario:", error.message);
            }
        } else {
            alert("Complete los datos");
        }
    }

    const router = useRouter(); // Hook para controlar la navegación
    async function logIn() {
        if (formState.userName !== "" && formState.pass !== "") {

            console.log("formState.userName && formState.pass", formState.userName, formState.pass)
            try {
                // Realiza la solicitud y almacena la respuesta en 'response'
                const response = await axios.post('http://192.168.1.35:5001/login-user', {
                    userName: formState.userName,
                    password: formState.pass,
                });

                console.log("aqeui", response.data); // Ahora 'response' está correctamente definida

                if (response.data.status === "ok") {
                    // Guarda el usuario en AsyncStorage
                    await AsyncStorage.setItem("username", formState.userName);
                    alert("Inicio de sesión exitoso");
                    router.push("/principal");
                } else {
                    alert("Credenciales incorrectas");
                }
            } catch (error) {
                console.log("Error al iniciar sesión:", error.message);
            }
        } else {
            alert("Complete los datos");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido! ¿Listo para crear nuevos registros?</Text>
            <View style={{ backgroundColor: "#F1F1F1", width: "100%", height: "70%", borderTopStartRadius: 20, borderTopRightRadius: 20, alignItems: "center" }}>
                <View style={[styles.inputContainer, { marginTop: "10%" }]}>
                    <TextInput
                        style={styles.input}
                        placeholder="Usuario"
                        placeholderTextColor="#A3A3A3"
                        onChangeText={(userName) => onChangeDato("userName", userName)}
                    />
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Contraseña"
                            placeholderTextColor="#A3A3A3"
                            secureTextEntry={!passwordVisible} // Alternar visibilidad
                            onChangeText={(pass) => onChangeDato("pass", pass)}
                        />
                        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                            <Text style={styles.togglePassword}>
                                {passwordVisible ? "👁️" : "🙈"} {/* Íconos para alternar */}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity>
                        <Text style={styles.forgotPassword}>¿No tienes cuenta, regístrate?</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={logIn}>
                    <Text style={styles.buttonText}>Iniciar Sesión</Text>
                </TouchableOpacity>
                <Link href="/">
                    <Text style={[styles.backLink]}>Volver</Text>
                </Link>
            </View >
        </View >
    );
}

const appStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#072E44",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#F7F7F7",
        textAlign: "center",
        marginTop: "20%",
    },
    inputContainer: {
        width: "100%",
        alignItems: "center",
        marginBottom: 30,
    },
    input: {
        backgroundColor: "#FBFEFC",
        width: "90%",
        borderRadius: 12,
        height: 50,
        paddingHorizontal: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.58,
        shadowRadius: 16,
        elevation: 24,
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FBFEFC",
        width: "90%",
        borderRadius: 12,
        height: 50,
        paddingHorizontal: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.58,
        shadowRadius: 16,
        elevation: 24,
    },
    passwordInput: {
        flex: 1,
    },
    togglePassword: {
        fontSize: 18,
        color: "#A3A3A3",
        marginLeft: 10,
    },
    forgotPassword: {
        color: "#A3A3A3",
        fontSize: 14,
        textAlign: "center",
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#002D3C",
        width: "90%",
        paddingVertical: 15,
        marginBottom: 20,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    buttonText: {
        color: "#F7F7F7",
        fontSize: 16,
        fontWeight: "bold",
    },
    backLink: {
        color: "#A3A3A3",
        fontSize: 14,
        marginTop: 10,
    },
});

const webStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#072E44",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: "20%",
        paddingTop: "5%",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#F7F7F7",
        textAlign: "center",
        marginTop: "5%",
    },
    inputContainer: {
        width: "100%",
        alignItems: "center",
        marginBottom: 40,
    },
    input: {
        backgroundColor: "#FBFEFC",
        width: "60%", // Más estrecho para la web
        borderRadius: 12,
        height: 50,
        paddingHorizontal: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FBFEFC",
        width: "60%", // Más estrecho en web
        borderRadius: 12,
        height: 50,
        paddingHorizontal: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    passwordInput: {
        flex: 1,
    },
    togglePassword: {
        fontSize: 18,
        color: "#A3A3A3",
        marginLeft: 10,
    },
    forgotPassword: {
        color: "#A3A3A3",
        fontSize: 16,
        textAlign: "center",
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#002D3C",
        width: "60%", // Más estrecho para la web
        paddingVertical: 15,
        marginBottom: 20,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: "#F7F7F7",
        fontSize: 18,
        fontWeight: "bold",
    },
    backLink: {
        color: "#A3A3A3",
        fontSize: 14,
        marginTop: 15,
    },
});
