import { DataDay } from '../interfaces/ForecastInterfaces'
import axios from 'axios'

export async function getApiForecast(): Promise<DataDay[]> {
    
    //const apiUrl: string = `https://raw.githubusercontent.com/creatively/forecastfor-FE/main/src/mock-api/weather-data.json`;
    const apiUrl: string = `https://raw.githubusercontent.com/creatively/forecastfor-FE/main/src/mock-api/api-data.json`

    return (async () => {
        try {
            const response = await axios.get(apiUrl);
console.log(1)
console.log(response)
            return response.data
        } catch (error) {
            console.error(error);
            return null
        }
    })()
}
