import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Platform,
    TextInput,
    useWindowDimensions,
    ScrollView,
} from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

import DownBar from "./downbar";
import UpBar from "./upbar";
export function CrearRegistro() {
    const { width } = useWindowDimensions();
    const isWeb = width >= 1500; // Determina si es "web"
    const styles = isWeb ? webStyles : appStyles; // Usa estilos según la plataforma

    const [image, setImage] = useState(null); // Imagen seleccionada
    const [title, setTitle] = useState(""); // Título del registro
    const [description, setDescription] = useState(""); // Descripción del registro
    const [userID] = useState("12345"); // Ejemplo de userID (ajusta según tu autenticación)

    const handlePickImage = async () => {
        console.log("here")
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert("Se requieren permisos para acceder a la galería.");
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true, // Incluir base64
        });

        if (!pickerResult.canceled) {
            setImage(`data:image/jpeg;base64,${pickerResult.assets[0].base64}`); // Guardar la imagen en base64
        }
    };

    const handleTakePhoto = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (!permissionResult.granted) {
            alert("Se requieren permisos para usar la cámara.");
            return;
        }

        const cameraResult = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true, // Incluir base64
        });

        if (!cameraResult.canceled) {
            setImage(`data:image/jpeg;base64,${cameraResult.assets[0].base64}`); // Guardar la imagen en base64
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImage(reader.result);
            reader.readAsDataURL(file);
        }
    };
    const handleSave = async () => {
        if (!title || !description || !image) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        try {
            const response = await axios.post("http://192.168.1.35:5001/crear-registro", {
                titulo: title,
                descripcion: description,
                foto: image,
                userID: userID, // Ajustar según tu lógica de autenticación
            });

            if (response.data.status === "ok") {
                alert("Registro creado con éxito");
                // Resetear el formulario
                setTitle("");
                setDescription("");
                setImage(null);
            } else {
                alert("Error al guardar el registro");
            }
        } catch (error) {
            console.error(error);
            alert("Error al conectar con el servidor");
        }
    };


    return (
        <View style={{
            height: "100%",
            backgroundColor: "#BFC1C0",
        }} >

            {isWeb && (<DownBar></DownBar>)}
            {!isWeb && (<UpBar></UpBar>)}
            <ScrollView >
                <View style={styles.container}>

                    {/* Contenedor del formulario */}
                    <View style={styles.card}>
                        {/* Input para el título */}
                        <TextInput
                            style={styles.titleInput}
                            placeholder="Título del registro"
                            placeholderTextColor="#A3A3A3"
                            value={title}
                            onChangeText={setTitle}
                        />

                        {/* Imagen o ícono de cámara */}
                        <TouchableOpacity
                            style={styles.imageContainer}
                            onPress={Platform.OS === "web" ? handlePickImage : null}
                        >
                            {image ? (
                                <Image source={{ uri: image }} style={styles.image} />
                            ) : (
                                <>
                                    {Platform.OS == "web" ?
                                        (<Text style={styles.cameraIcon}>📷</Text>) :
                                        (<TouchableOpacity style={{ height: "100%", width: "100%", alignItems: "center", justifyContent: "center" }} onPress={handleTakePhoto}>
                                            <Text style={styles.cameraIcon}>📷</Text>
                                        </TouchableOpacity>)}
                                </>

                            )}
                        </TouchableOpacity>

                        {/* Opciones para subir o tomar foto en móvil */}
                        {Platform.OS !== "web" && (
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.button} onPress={handlePickImage}>
                                    <Text style={styles.buttonText}>Galería</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
                                    <Text style={styles.buttonText}>Cámara</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {/* Descripción */}
                        <TextInput
                            style={styles.description}
                            placeholder="Descripción del registro"
                            placeholderTextColor="#A3A3A3"
                            multiline
                            value={description}
                            onChangeText={setDescription}
                        />
                    </View>

                    {/* Input de archivos para web */}
                    {Platform.OS === "web" && (
                        <input
                            type="file"
                            id="fileInput"
                            style={styles.fileInput}
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    )}

                    {/* Botón para guardar */}
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Guardar Registro</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView >
            {!isWeb && (<DownBar></DownBar>)
            }
        </View >
    );
}

const appStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: "10%"
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
    titleInput: {
        width: "100%",
        borderRadius: 8,
        height: 50,
        paddingHorizontal: 15,
        marginBottom: 16,
        marginTop: 16,
        fontSize: 16,

        borderRadius: 20,
        backgroundColor: "#FBFEFC",
    },
    imageContainer: {
        backgroundColor: "#000",
        width: "100%",
        height: 200,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 8,
    },
    cameraIcon: {
        fontSize: 32,
        color: "#FFF",
    },
    description: {
        width: "100%",
        height: "20%",
        borderRadius: 12,
        padding: 12,
        textAlignVertical: "top",
        height: 80,
        backgroundColor: "#FBFEFC",
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
});
