import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import CircularProgress from "@material-ui/core/CircularProgress";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import ErrorIcon from "@material-ui/icons/Error";
import APIweather from "./APIweather";


//  Stylesheet for the features on the weather screen
const useStyles = makeStyles(theme => ({
    headerLine: {
        display: "flex",
        alignItems: "center",
    },
    location: {
        flex: 1,
    },
    detailLine: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    description: {
        flex: 1,
    },
    largeAvatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));

//Indicating the process of the task
function LoadingIndicator({ isLoading }) {
    return isLoading ? <CircularProgress /> : null;
}

//Function in case of error
function ErrorMessage({ apiError }) {
    if (!apiError) return null;

    return (
        <>
            <ErrorIcon color="error" />
            <Typography color="error" variant="h6">
                {apiError}
            </Typography>
        </>
    );
}

//Retrieving weather features, so we can display extra details (windy, cloudy, rainy) from the API
function WeatherDisplay({ weatherData }) {
    const classes = useStyles();
    const { temp, description, icon, windTransform, windSpeed } = React.useMemo(() => {
        const [weather] = weatherData.weather || [];
        return {
            temp: weatherData.main && weatherData.main.temp ? Math.round(weatherData.main.temp).toString() : "",
            description: weather ? weather.description : "",
            icon: weather ? `http://openweathermap.org/img/wn/${weather.icon}@2x.png` : "",
            windTransform: weatherData.wind ? weatherData.wind.deg - 90 : null,
            windSpeed: weatherData.wind ? Math.round(weatherData.wind.speed) : 0,
        };
    }, [weatherData]);

    return (
        <>
            {temp && <Typography variant="h6">{temp}&deg;C</Typography>}
            {icon && (
                <Tooltip title={description} aria-label={description}>
                    <Avatar className={classes.largeAvatar} alt={description} src={icon} />
                </Tooltip>
            )}
            {windSpeed > 0 && (
                <>
                    <Typography variant="h6">{`${windSpeed} km/h`}</Typography>
                    {windTransform !== null && (
                        <ArrowRightAltIcon style={{ transform: `rotateZ(${windTransform}deg)` }} />
                    )}
                </>
            )}
        </>
    );
}

function LocationWeather({ location }) {
    const classes = useStyles();

    const [weatherData, setWeatherData] = React.useState({});
    const [apiError, setApiError] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        const loadingIndicatorTimeout = setTimeout(() => setIsLoading(true), 500);
        const getWeather = async () => {
            const result = await APIweather(location);
            clearTimeout(loadingIndicatorTimeout);
            setIsLoading(false);
            setWeatherData(result.success ? result.data : {});
            setApiError(result.success ? "" : result.error);
        };

        getWeather();
        return () => clearTimeout(loadingIndicatorTimeout);
    }, [location]);
    
    //Retrieving weather features, so we can display extra details (flags) from the API
    const { flagIcon, countryCode } = React.useMemo(() => {
        return {
            flagIcon: weatherData.sys ? `https://www.countryflags.io/${weatherData.sys.country}/shiny/32.png` : "",
            countryCode: weatherData.sys ? weatherData.sys.country : "",
        };
    }, [weatherData]);

    return (
        <>
            <div className={classes.headerLine}>
                <Typography className={classes.location} variant="h5">
                    {location}
                </Typography>
                {flagIcon && <img alt={countryCode} src={flagIcon} />}
            </div>
            <div className={classes.detailLine}>
                <LoadingIndicator isLoading={isLoading} />
                <ErrorMessage apiError={apiError} />
                <WeatherDisplay weatherData={weatherData} />
            </div>
        </>
    );
}

LocationWeather.propTypes = {
    location: PropTypes.string.isRequired,
};

export default LocationWeather;
