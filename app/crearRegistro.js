import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Platform,
} from "react-native";
import { Link } from "expo-router";
import * as ImagePicker from "expo-image-picker";

export default function CrearRegistro() {
    const [image, setImage] = useState(null); // Almacena la imagen seleccionada
    const [title, setTitle] = useState(""); // Título del registro
    const [description, setDescription] = useState(""); // Descripción del registro
    const [errorMessage, setErrorMessage] = useState("");

    const handlePickImage = async () => {
        if (Platform.OS === "web") {
            document.getElementById("fileInput").click();
        } else {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (permissionResult.granted === false) {
                setErrorMessage("Se requieren permisos para acceder a la galería.");
                return;
            }

            const pickerResult = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!pickerResult.canceled) {
                setImage(pickerResult.assets[0].uri);
            }
        }
    };

    const handleTakePhoto = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted === false) {
            setErrorMessage("Se requieren permisos para usar la cámara.");
            return;
        }

        const cameraResult = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!cameraResult.canceled) {
            setImage(cameraResult.assets[0].uri);
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

    const handleSave = () => {
        if (!image || !title || !description) {
            setErrorMessage("Por favor, complete todos los campos.");
            return;
        }

        // Aquí puedes enviar los datos al backend
        console.log("Registro guardado:", { title, description, image });
        alert("Registro guardado con éxito.");
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Link href={"/principal"}>
                <Text style={styles.backLink}>Volver</Text>
            </Link>
            <Text style={styles.title}>Crear Registro</Text>

            {/* Vista previa de la imagen */}
            {image && (
                <Image source={{ uri: image }} style={styles.previewImage} />
            )}

            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

            {/* Campos de entrada */}
            <TextInput
                style={styles.input}
                placeholder="Título"
                placeholderTextColor="#A3A3A3"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Descripción"
                placeholderTextColor="#A3A3A3"
                value={description}
                onChangeText={setDescription}
                multiline
            />

            {/* Opciones para subir o tomar una foto */}
            {Platform.OS === "web" ? (
                <View
                    style={styles.dropZone}
                    onDrop={(event) => {
                        event.preventDefault();
                        const file = event.dataTransfer.files[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = () => setImage(reader.result);
                            reader.readAsDataURL(file);
                        }
                    }}
                    onDragOver={(event) => event.preventDefault()}
                >
                    <Text style={styles.dropZoneText}>
                        Arrastra una imagen aquí o haz clic para seleccionar
                    </Text>
                    <input
                        type="file"
                        id="fileInput"
                        style={styles.fileInput}
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </View>
            ) : (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handlePickImage}>
                        <Text style={styles.buttonText}>Subir Foto</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
                        <Text style={styles.buttonText}>Tomar Foto</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Botón para guardar */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Guardar Registro</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: "center",
        padding: 16,
        backgroundColor: "#F7F7F7",
    },
    backLink: {
        color: "#072E44",
        fontSize: 16,
        textDecorationLine: "underline",
        alignSelf: "flex-start",
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 16,
    },
    previewImage: {
        width: 200,
        height: 200,
        borderRadius: 16,
        marginBottom: 16,
    },
    error: {
        color: "red",
        fontSize: 14,
        marginBottom: 16,
    },
    input: {
        backgroundColor: "#FBFEFC",
        width: "90%",
        borderRadius: 12,
        height: 50,
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    textArea: {
        height: 100,
        textAlignVertical: "top",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
    },
    button: {
        backgroundColor: "#072E44",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginHorizontal: 8,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    dropZone: {
        borderWidth: 2,
        borderColor: "#072E44",
        borderStyle: "dashed",
        borderRadius: 16,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        width: "80%",
    },
    dropZoneText: {
        color: "#666",
        fontSize: 16,
    },
    fileInput: {
        position: "absolute",
        width: "100%",
        height: "100%",
        opacity: 0,
        cursor: "pointer",
    },
    saveButton: {
        backgroundColor: "#28A745",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 16,
        width: "80%",
    },
    saveButtonText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "bold",
    },
});
