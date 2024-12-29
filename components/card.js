import { Link } from "expo-router";
import { useEffect, useRef } from "react";
import { View, Text, Image, StyleSheet, Animated, Pressable } from "react-native"
export function Card({ registro }) {
    return (<Link href={`/${registro.id}`} asChild>
        <Pressable>
            <View key={registro.id} style={styles.card}>
                <Image
                    source={{ uri: registro.image }}
                    style={styles.image}
                />
                <Text style={styles.text}>{registro.name}</Text>
                <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
            </View>
        </Pressable>
    </Link>
    )
}
export function AnimatedCard({ registro, index }) {
    const opacity = useRef(new Animated.Value(0)).current
    useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 1000,
            delay: index * 500,
            useNativeDriver: true,
        }).start()
    }, [opacity, index])
    return (
        <Animated.View style={opacity}>
            <Card registro={registro}></Card>
        </Animated.View>
    )
}
const styles = StyleSheet.create({
    card: {
        marginBottom: 16,
        alignItems: "center",
        backgroundColor: "green"
    },
    image: {
        width: 100, // Corregido
        height: 100,
        borderRadius: 20,
    },
    text: {
        marginTop: 8,
        fontSize: 16,
        color: "#333",
    },
});
