import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
//  Importing Google Fonts
import {
    useFonts,
    Raleway_400Regular,
    Raleway_700Bold,
} from "@expo-google-fonts/raleway";
//  Importing library for Icons
import { FontAwesome5 } from "@expo/vector-icons";


//  Showing Weather Screen Components
export default function Weather({ navigation }) {
    //  Loading fonts
    useFonts({
        Raleway_400Regular,
        Raleway_700Bold,
    });

    return (
        <View id="app-container" style={styles.container}>
            <View id="location">
                <Text style={styles.one}>Weather</Text>
            </View>

            {/* <Image style={styles.logo} source={require("../icons/atmosphere.svg")} /> */}

            <View id="temp" style={styles.two}>
                <Text id="temp_value" style={styles.three}>25</Text><Text id="temp_unit" style={styles.three}>{'\u00b0'}C</Text>
            </View>
            
            <View id="climate">
            <Text style={styles.four}>Sunny</Text>
            </View>
        </View>
    );
}



window.addEventListener("load", () => {
    let long=0;
    let lat=0;
    let temp=0;
    let place="";
    

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
            long=position.coords.longitude;
            lat=position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=b397a6ae6b55b8a60056d40ab62b8972`;
            fetch(api)
            .then((response) => {
                return response.json();
            })
            .then(data => {
                temp = console.log(data.main.feels_like);
                place = console.log(data.name);
                console.log(data);
            })
        })
    }
})


//Stylesheet for AboutUs screen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#02b2e8",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    one: {
        color: "#ffffff",
        fontFamily: "Raleway_700Bold",
        fontSize: 35,
        marginTop: 40,
    },
    four: {
        color: "#ffffff",
        fontFamily: "Raleway_700Bold",
        fontSize: 35,
        marginTop: 10,
    },
    small: {
        fontFamily: "Raleway_400Regular",
        fontSize: 12,
        marginBottom: 30,
    },
    two: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        paddingBottom: 15,
    },
    three: {
        fontFamily: "Raleway_400Regular",
        fontSize: 20,
        paddingLeft: 5,
    },
    logo: {
        width: 200,
        height: 150,
        marginTop: 10
    },
});