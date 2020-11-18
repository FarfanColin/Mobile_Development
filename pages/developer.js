import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { StyleSheet, Text, View } from "react-native";
//  Importing Google Fonts
import {
    useFonts,
    Raleway_400Regular,
    Raleway_700Bold,
} from "@expo-google-fonts/raleway";
//  Importing library for Icons
import { FontAwesome5 } from "@expo/vector-icons";

//  Showing developer Screen Components
export default function developer({ navigation }) {
    //  Loading fonts
    useFonts({
        Raleway_400Regular,
        Raleway_700Bold,
    });

    return (
        <View style={styles.container}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        CREDITS
                    </Typography>
                </Toolbar>
            </AppBar>

            <Text style={styles.team}>Developed by:</Text>
            
            <br></br><br></br>

            <View style={styles.rowDeveloper}>
                <FontAwesome5 name="user-alt" size={20} color="black" />
                <Text style={styles.developer}>Christian Jesus Farfan Colin</Text>
            </View>

            <br></br><br></br>

            <View style={styles.rowDeveloper}>
                <FontAwesome5 name="user-alt" size={20} color="black" />
                <Text style={styles.developer}>2020086</Text>
            </View>
            
        </View>
    );
}

//Stylesheet for developer screen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#02b2e8",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    team: {
        color: "#ffffff",
        fontFamily: "Raleway_700Bold",
        fontSize: 35,
        marginTop: 40,
    },
    small: {
        fontFamily: "Raleway_400Regular",
        fontSize: 12,
        marginBottom: 30,
    },
    rowDeveloper: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        paddingBottom: 15,
    },
    developer: {
        fontFamily: "Raleway_400Regular",
        fontSize: 20,
        paddingLeft: 5,
    },
});