import { StyleSheet, Text, View, Image, StatusBar, ScrollView, ActivityIndicator, FlatList, TextInput, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { getLatestPokemon } from "../lib/metacritic";
import { SafeAreaView } from "react-native-safe-area-context";
import { AnimatedCard, Card } from "./card";
import { Link } from "expo-router";
import axios from 'axios'
export function Main() {
    const [registros, setRegistro] = useState([]);
    const initialFormState = {
        userName: "",
        pass: ""

    }
    const [formState, setFormState] = useState(initialFormState);
    const API_BASE_URL = "http://192.168.1.35:5001"; // Cambia "192.168.X.X" por la IP de tu computadora

    function onChangeDato(name, value) {
        console.log(name, value)
        setFormState(() => ({ ...formState, [name]: value }));
    }


    useEffect(() => {
        getLatestPokemon().then((registro) => {
            setRegistro(registro);
        });

    }, []);
    async function registerUser() {
        if (formState.userName && formState.pass) {
            try {
                const response = await axios.post(`${API_BASE_URL}/register`, {
                    userName: formState.userName,
                    password: formState.pass,
                });
                console.log(response.data);
                if (response.data == "User already exists") {
                    alert("Usuario ya registrado");
                }
            } catch (error) {
                console.log("Error al registrar usuario:", error.message);
            }
        } else {
            alert("Complete los datos");
        }
    }
    async function logIn() {

        if (formState.userName && formState.pass) {

            console.log("aqi1")
            const userData = {
                userName: formState.userName,
                password: formState.pass,
            }
            const response = await axios.post(`${API_BASE_URL}/login-user`, userData)

            console.log("aqi2")
            console.log(response.data);

            console.log("aqi3")
            if (response.data) {
                alert("User puede ingresar");
            }
        }

    }
    return (<>
        <View style={styles.container}>
            <Link href={"/crearRegistro"}><Text>crear registro</Text></Link >
            <TextInput
                style={styles.input}
                placeholder="username"
                placeholderTextColor={'black'}
                onChangeText={(name) => onChangeDato("userName", name)}
                required
            />
            <TextInput
                style={styles.input}
                placeholder="contraseña"
                placeholderTextColor={'black'}
                onChangeText={(pass) => onChangeDato("pass", pass)}
                required
            />
            <TouchableOpacity style={styles.btnW} onPress={registerUser}>
                <Text style={styles.btnText}>Registrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnW} onPress={logIn}>
                <Text style={styles.btnText}>Iniciar sesion</Text>
            </TouchableOpacity>

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
    input: {
        backgroundColor: "gray",
        width: "80%",
        borderRadius: 20,
        margin: 20,
        padding: 10

    }
    , btnW: {

        padding: 24,
        margin: 5,
        backgroundColor: "red"
    }

});
