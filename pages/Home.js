import React, { useRef } from "react";
import { Animated, StyleSheet, Text, View, Button, Image } from "react-native";
//  Importing GoogleFonts
import {
    useFonts,
    Raleway_400Regular,
    Raleway_600SemiBold,
    Raleway_700Bold,
} from "@expo-google-fonts/raleway";

//  Showing home Screen Components
export default function HOME({ navigation }) {
    // Loading fonts
    useFonts({
        Raleway_400Regular,
        Raleway_700Bold,
    });

    //  Used for the animated boxes style
    const fadeAnim = useRef(new Animated.Value(0)).current;
    //  Loading fonts
    useFonts({
        Raleway_400Regular,
        Raleway_600SemiBold,
        Raleway_700Bold,
    });

    //Displaying home details and options, applying styles
    return (
        <View style={styles.container}>
            <Text style={styles.team}>myavocAPP</Text>
            <Image style={styles.logo} source={require("../assets/logo.gif")} />
            <br></br>
            <View style={styles.padd}>
                <Button
                    color="grey"
                    variant="contained"
                    onPress={() => {
                        navigation.navigate("LOCATION");
                    }}
                    title="LOCATION"
                />
            </View>
            <View style={styles.padd}>
                <Button
                    color="grey"
                    variant="contained"
                    onPress={() => {
                        navigation.navigate("WEATHER");
                    }}
                    title="WEATHER"
                />
            </View>
            <View style={styles.padd}>
                <Button
                    color="grey"
                    variant="contained"
                    onPress={() => {
                        navigation.navigate("CONVERTER");
                    }}
                    title="CURRENCY CONVERTER"
                />
            </View>
            <View style={styles.padd}>
                <Button
                    color="grey"
                    variant="contained"
                    onPress={() => {
                        navigation.navigate("CREDITS");
                    }}
                    title="ABOUT THE DEVELOPER"
                />
            </View>
        </View>

    );

}

//  Stylesheet for the home screen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#02e8d9",
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        width: 200,
        height: 200,
    },
    team: {
        color: "#ffffff",
        fontFamily: "Raleway_700Bold",
        fontSize: 35,
    },
    padd: {
        fontFamily: "Raleway_400Regular",
        marginTop: 10,
        width: "20%",
    },
});