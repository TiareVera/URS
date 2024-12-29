import { StyleSheet, Text, View, Image, StatusBar, ScrollView, ActivityIndicator, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { getLatestPokemon } from "../lib/metacritic";
import { SafeAreaView } from "react-native-safe-area-context";
import { AnimatedCard, Card } from "./card";
import { Link } from "expo-router";
export function Main() {
    const [registros, setRegistro] = useState([]);

    useEffect(() => {
        getLatestPokemon().then((registro) => {
            setRegistro(registro);
        });
    }, []);

    return (<>
        <View style={styles.container}>
            <Link href={"/crearRegistro"}><Text>crear registro</Text></Link >
            {
                registros.length === 0 ?
                    (<ActivityIndicator
                        style={{ paddingVertical: "30%", color: "blue", size: "large" }}>
                    </ActivityIndicator>)
                    :
                    (
                        <FlatList
                            data={registros}
                            keyExtractor={(registro) => registro.id}
                            renderItem={({ item, index }) => <AnimatedCard registro={item} index={index} />}>

                        </FlatList>
                    )
            }


        </View>
    </>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 24,
        backgroundColor: "white",

    },

});
