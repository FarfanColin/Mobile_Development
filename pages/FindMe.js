import { StatusBar } from "expo-status-bar";
import React, { useState, useRef, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Animated, StyleSheet, Text, View, Button } from "react-native";
//  Importing Google Fonts
import {
    useFonts,
    Raleway_400Regular,
    Raleway_600SemiBold,
    Raleway_700Bold,
} from "@expo-google-fonts/raleway";
//  Importing library for Icons
import { FontAwesome5 } from "@expo/vector-icons";
//  Importing Geolocation library
import Geolocation from "@react-native-community/geolocation";

export default function findme({ navigation }) {

    //  Stores user's data
    const [userData, setUserData] = useState({
        latitude: 0,
        longitude: 0,
        location: "",
        country: "",
        county: "",
        postcode: "",
    });

    //  Used for the animated boxes style
    const fadeAnim = useRef(new Animated.Value(0)).current;
    //  Loading fonts
    useFonts({
        Raleway_400Regular,
        Raleway_600SemiBold,
        Raleway_700Bold,
    });

    //  Open cage function to retrieve data using the latitude and longitude
    let findLocation = (lat, long) => {
        let url =
            "https://api.opencagedata.com/geocode/v1/json?key=44a9f29b61514c1bb30d4781d418d6f3&q=" +
            lat +
            "+" +
            long;
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                let loc = "Other";
                if ("district" in json.results[0].components) {
                    loc = json.results[0].components.district;
                } else if ("town" in json.results[0].components) {
                    loc = json.results[0].components.town;
                }
                //  Calls function to save data
                return setUserData({
                    latitude: lat,
                    longitude: long,
                    location: loc,
                    country: json.results[0].components.country,
                    county: json.results[0].components.county,
                    postcode: json.results[0].components.postcode,
                });    
            });
    };


    //  Main function called when the button is pressed
    function locateMe() {
        //  Gets the position of the user
        Geolocation.getCurrentPosition(
            (position) => {
                //  Calling opencage function using the coords achieved
                findLocation(position.coords.latitude, position.coords.longitude);
            },
            //  Calling error function
            (err) => {
                errorMessage(err);
            },
            //  Enabling accuracy option, setting time options
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 2000 }
        );
        //  Starts animation to present the text and statistics
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 3000,
        }).start();
    }

    //  Function called in case of error
    function errorMessage(err) {
        navigation.navigate("errorpage", { err });
    }

    //  Displays components
    return (
        <View style={styles.container}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        LOCATION
                    </Typography>
                </Toolbar>
            </AppBar>
            <Text style={styles.title}>CHECK THE LOCATION</Text>

            <View style={{ width: "45%" }}>
                <Button onPress={locateMe} title="Where am I?" />
            </View>
            <Animated.View
                style={[
                    styles.fadingContainer,
                    {
                        opacity: fadeAnim, // Bind opacity to animated value
                    }
                ]}
            >
                <Text style={styles.subtitle}>LOCATION </Text>
                <View style={styles.list}>
                    <Text style={styles.listRowHeader}>Latitude:</Text>
                    <Text style={styles.listRow}>{userData.latitude.toFixed(7)}</Text>
                </View>
                <View style={styles.list}>
                    <Text style={styles.listRowHeader}>Longitude:</Text>
                    <Text style={styles.listRow}>{userData.longitude.toFixed(7)}</Text>
                </View>
            </Animated.View>
            <Animated.View
                style={[
                    styles.fadingContainer,
                    {
                        opacity: fadeAnim, // Bind opacity to animated value
                    }
                ]}
            >
                <Text style={styles.subtitle}>DETAILS </Text>
                <View style={styles.list}>
                    <Text style={styles.listRowHeader}>Country:</Text>
                    <Text style={styles.listRow}>{userData.country}</Text>
                </View>
                <View style={styles.list}>
                    <Text style={styles.listRowHeader}>County:</Text>
                    <Text style={styles.listRow}>{userData.county}</Text>
                </View>
                <View style={styles.list}>
                    <Text style={styles.listRowHeader}>District/Town:</Text>
                    <Text style={styles.listRow}>{userData.location}</Text>
                </View>
                <View style={styles.list}>
                    <Text style={styles.listRowHeader}>Postcode:</Text>
                    <Text style={styles.listRow}>{userData.postcode}</Text>
                </View>
            </Animated.View>
        </View>
    );
}

//  Stylesheet for findme Screen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#02b2e8",
    },
    title: {
        color: "#ffffff",
        fontFamily: "Raleway_700Bold",
        fontSize: 25,
        fontWeight: "bold",
        paddingTop: 45,
        paddingBottom: 15,
    },
    subtitle: {
        color: "grey",
        fontFamily: "Raleway_600SemiBold",
        fontSize: 20,
        fontWeight: "bold",
    },
    subtitle2: {
        color: "grey",
        fontFamily: "Raleway_600SemiBold",
        fontSize: 15,
        fontWeight: "bold",
    },
    rowUser: {
        flexDirection: "row",
        flexWrap: "wrap",
        width: "60%",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    user: {
        fontFamily: "Raleway_600SemiBold",
        fontSize: 15,
        fontWeight: "bold",
        paddingTop: 20,
        paddingBottom: 25,
    },
    fadingContainer: {
        width: "70%",
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: "powderblue",
        marginTop: 20,
        fontFamily: "Raleway_400Regular",
        fontSize: 15,
    },
    fadingContainerdeveloper: {
        width: "50%",
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginTop: 20,
        fontFamily: "Raleway_400Regular",
        fontSize: 15,
    },
    list: {
        flexDirection: "row",
        flexWrap: "wrap",
        borderTopWidth: "thin",
        borderTopColor: "grey",
        paddingBottom: 5,
    },
    listRowHeader: {
        flex: 1,
        color: "grey",
    },
    listRow: {
        flex: 1,
    }
});