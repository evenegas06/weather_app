import { LoadingButton } from "@mui/lab";
import { Box, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";

function App() {
    /* ----- States ----- */
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);

    /**
     * Submit form
     * @param {Object} event 
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submit');
    };

    return (
        <Container
            maxWidth="xs"
            sx={{ mt: 2 }}
        >
            <Typography
                variant="h3"
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
                onSubmit={handleSubmit}
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
                />

                <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={loading}
                    loadingIndicator="Cargando..."
                >
                    Buscar
                </LoadingButton>

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
            </Box>
        </Container>
    );
}
export default App;
