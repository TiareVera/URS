import React from "react";
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from "react-native";

export default function CustomModal({
    visible,
    onClose,
    title,
    message,
    primaryAction,
    primaryText,
    secondaryAction,
    secondaryText
}) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>{title}</Text>
                    {message && <Text style={styles.message}>{message}</Text>}
                    <View style={styles.buttonContainer}>
                        {primaryAction && (
                            <TouchableOpacity
                                style={[styles.button, styles.primaryButton]}
                                onPress={primaryAction}
                            >
                                <Text style={styles.primaryButtonText}>{primaryText}</Text>
                            </TouchableOpacity>
                        )}
                        {secondaryAction && (
                            <TouchableOpacity
                                style={[styles.button, styles.secondaryButton]}
                                onPress={secondaryAction}
                            >
                                <Text style={styles.secondaryButtonText}>{secondaryText}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: Dimensions.get("window").width * 0.8,
        backgroundColor: "#3E3E3E",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFF",
        textAlign: "center",
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        color: "#FFF",
        textAlign: "center",
        marginBottom: 20,
    },
    buttonContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        flex: 1,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 5,
    },
    primaryButton: {
        backgroundColor: "#E4573D",
    },
    secondaryButton: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: "#E4573D",
    },
    primaryButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    secondaryButtonText: {
        color: "#E4573D",
        fontSize: 16,
        fontWeight: "bold",
    },
});
