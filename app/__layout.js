import { View, Text } from "react-native";
import { Slot } from "expo-router";
export default function Layout() {
    return (
        <View style={{ backgroundColor: "blue", paddingVertical: 100 }}>
            <Text >Hola 2</Text>
            <Slot />
        </View>
    )
}