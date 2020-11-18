import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Animated, StyleSheet, Text, View, Button } from "react-native";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import WeatherCard from "./weatherCard";

//  Stylesheet for the weather screen
const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
        flex: 1,
        alignItems: "center",
        backgroundColor: "#02e8d9",
    },
    containerGrid: {
        flex: 1,
        overflowY: "auto",
        padding: "2em",
    },
    addButton: {
        position: "absolute",
        margin: "1em",
        top: "50px",
        right: "0px",
    },
    title: {
        color: "#61686b",
        fontFamily: "Raleway_700Bold",
        fontSize: 25,
        fontWeight: "bold",
        paddingTop: 45,
        paddingBottom: 15,
    }
}));

const LOCAL_STORAGE_KEY = "locations";
function saveToLocalStorage(locations) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(locations));
}

function readFromLocalStorage() {
    const storedLocations = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedLocations ? JSON.parse(storedLocations) : [];
}

function App() {
    const classes = useStyles();
    const [weatherLocations, setWeatherLocations] = React.useState(readFromLocalStorage());

    const handleAddClick = () => setWeatherLocations([...weatherLocations, ""]);

    const updateLocations = locations => {
        setWeatherLocations(locations);
        saveToLocalStorage(locations);
    };

    const removeAtIndex = index => () =>
        updateLocations(weatherLocations.filter((_, locationIndex) => locationIndex !== index));

    const updateAtIndex = index => updatedLocation =>
        updateLocations(
            weatherLocations.map((location, locationIndex) => (locationIndex === index ? updatedLocation : location)),
        );

    const canAddOrRemove = React.useMemo(() => weatherLocations.every(location => location !== ""), [weatherLocations]);

    //Displaying details for the weather screen by applying styles
    return (
        <div className={classes.root}>
            <Text style={styles.title}>CHECK AND SAVE THE WEATHER</Text>
            <Grid container spacing={3} className={classes.containerGrid}>
                {weatherLocations.map((location, index) => (
                    <Grid key={location} xs={12} sm={6} md={4} lg={3} item>
                        <WeatherCard
                            location={location}
                            canDelete={!location || canAddOrRemove}
                            onDelete={removeAtIndex(index)}
                            onUpdate={updateAtIndex(index)}
                        />
                    </Grid>
                ))}
            </Grid>
            <Fab
                onClick={handleAddClick}
                aria-label="add weather location"
                className={classes.addButton}
                color="secondary"
                disabled={!canAddOrRemove}
            >
                <AddIcon />
            </Fab>
        </div>
    );
}
//  Stylesheet for the weather screen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#02e8d9",
    },
    title: {
        color: "#61686b",
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

export default App;
