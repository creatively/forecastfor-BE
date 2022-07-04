import { DataDay } from '../interfaces/ForecastInterfaces'
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const key: string | undefined = process.env.OPENWEATHERMAP_KEY
const lat: string = `51`
const lon: string = `0`

export async function getApiForecast(): Promise<DataDay[]> {

// //api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}
// //api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

    //const apiUrl: string = `https://raw.githubusercontent.com/creatively/forecastfor-FE/main/src/mock-api/api-data.json`
    const apiUrl: string = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`

    return (async () => {
        try {
            const response: any = await axios.get(apiUrl)
            console.log(response)
            if (response.status === 200) {
                return response.data
            } else {
                throw `api call returned a status code of ${response.status}
                        and a message of : ${response.statusText}`
            }
        } catch (error) {
            console.log('------ error ... -------')
            console.error(error);
            return null
        }
    })()
}
