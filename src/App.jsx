import { LoadingButton } from "@mui/lab";
import { Box, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";

const API_WEATHER = `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&q=`;

function App() {
    /* ----- States ----- */
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState({
        error: false,
        message: "",
    });
    const [weather, setWeather] = useState({
        city: '',
        country: '',
        temperature: '',
        condition: '',
        icon: '',
        conditionText: ''
    });

    /**
     * Submit form
     * 
     * @param {Object} event 
     */
    const onSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
        setError({
            error: false,
            message: ''
        });

        try {
            if (!city.trim()) {
                throw { message: 'Este campo es obligatorio. 😾' };
            }

            const response = await fetch(`${API_WEATHER}${city}`);
            const data = await response.json();

            if (data.error) {
                throw { message: data.error.message };
            }

            setWeather({
                city: data.location.name,
                country: data.location.country,
                temperature: data.current.temp_c,
                condition: data.current.condition.code,
                icon: data.current.condition.icon,
                conditionText: data.current.condition.text,
            });
        } catch (error) {
            setError({
                error: true,
                message: error.message,
            });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container
            maxWidth="xs"
            sx={{ mt: 2 }}
        >
            <Typography
                variant="h2"
                component="h1"
                align="center"
                gutterBottom
            >
                Weather App
            </Typography>

            <Box
                sx={{ display: "grid", gap: 2 }}
                component="form"
                autoComplete="off"
                onSubmit={onSubmit}
            >
                <TextField
                    id="city"
                    label="Ciudad"
                    variant="outlined"
                    size="small"
                    required
                    fullWidth
                    value={city}
                    onChange={(event) => { setCity(event.target.value); }}
                    error={error.error}
                    helperText={error.message}
                />

                <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={loading}
                    loadingIndicator="Cargando..."
                >
                    Buscar
                </LoadingButton>
            </Box>

            {weather.city && (
                <Box
                    sx={{
                        mt: 2,
                        display: "grid",
                        gap: 2,
                        textAlign: "center"
                    }}
                >
                    <Typography
                        variant="h3"
                        component="h2"
                    >
                        {weather.city}, {weather.country}
                    </Typography>

                    <Box
                        component="img"
                        alt={weather.conditionText}
                        src={weather.icon}
                        sx={{ margin: "0 auto" }}
                    />
                    <Typography
                        variant="h4" component="h3"
                    >
                        {weather.temperature} °C
                    </Typography>

                    <Typography
                        variant="h5"
                        component="h4"
                    >
                        {weather.conditionText}
                    </Typography>
                </Box>
            )}

            <Typography
                textAlign="center"
                sx={{ mt: 2, fontSize: "10px" }}
            >
                Powered by:{" "}
                <a
                    href="https://www.weatherapi.com/"
                    title="Weather API"
                >
                    WeatherAPI.com
                </a>
            </Typography>
        </Container>
    );
}
export default App;
