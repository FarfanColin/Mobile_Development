import React, {useRef} from "react";
import { Animated, StyleSheet, Text, View, Button, Image } from "react-native";
//  Importing GoogleFonts
import {
    useFonts,
    Raleway_400Regular,
    Raleway_600SemiBold,
    Raleway_700Bold,
} from "@expo-google-fonts/raleway";

//  Showing home Screen Components
export default function home({ navigation }) {
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

    return (
        <View style={styles.container}>
            <Text style={styles.team}>Reactors</Text>
            <Image style={styles.logo} source={require("../assets/logo.png")} />
            <View style={styles.padd}>
                <Button
                    color="grey"
                    variant="contained"
                    onPress={() => {
                        navigation.navigate("findme");
                    }}
                    title="FIND ME"
                />
            </View>
            <View style={styles.padd}>
                <Button
                    color="grey"
                    variant="contained"
                    onPress={() => {
                        navigation.navigate("weather");
                    }}
                    title="WEATHER"
                />
            </View>
            <View style={styles.padd}>
                <Button
                    color="grey"
                    variant="contained"
                    onPress={() => {
                        navigation.navigate("converter");
                    }}
                    title="CURRENCY CONVERTER"
                />
            </View>
            <View style={styles.padd}>
                <Button
                    color="grey"
                    variant="contained"
                    onPress={() => {
                        navigation.navigate("developer");
                    }}
                    title="ABOUT THE DEVELOPER"
                />
            </View>
        </View>
        
    );
    
}

//  Stylesheet for home
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#02b2e8",
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        width: 200,
        height: 150,
    },
    team: {
        color: "#ffffff",
        fontFamily: "Raleway_700Bold",
        fontSize: 35,
    },
    padd: {
        fontFamily: "Raleway_400Regular",
        marginTop: 10,
        width: "30%",
    },
});