export default async location => {
    try {
        // Retrieving the weather data using the input (country) from the API
        const result = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=b397a6ae6b55b8a60056d40ab62b8972&units=metric`,
        );

        if (result.status === 200) {
            return { success: true, data: await result.json() };
        }

        return { success: false, error: result.statusText };
    } catch (ex) {
        return { success: false, error: ex.message };
    }
};
