import { DataDay } from '../interfaces/ForecastInterfaces'
import axios, { AxiosError, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios'
import dotenv from 'dotenv'
dotenv.config()

interface PropsCoordinates {
    latitude: string,
    longitude: string
}

const key: string | undefined = process.env.OPENWEATHERMAP_KEY

export async function getApiForecast({latitude, longitude}: PropsCoordinates): Promise<DataDay[]> {

    const cleanOffApiKeyWhenNotInDevelopment = (url: string | undefined): string => {
        return (process.env.ENVIRONMENT !== `dev`) 
            ? url?.substring(0, url?.indexOf(`&appid=`)) || ``
            : url || ``
    }

    const apiUrl: string = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${key}`
    const loggableUrl: string = cleanOffApiKeyWhenNotInDevelopment(apiUrl)
    const requestConfig: AxiosRequestConfig = {
        method: 'GET',
        url: apiUrl
    }

    return (async () => {
        try {
            const response: AxiosResponse = await axios(requestConfig)
            if (response.status === 200) {
                return response.data
            } else {
                console.log(`
                    --- REMOTE WEATHER API CALL ERROR - INCORRECT STATUS CODE - ${response.status} :\n
                    --- weather api server called with :\n
                    --- ${loggableUrl}\n
                    --- and returned a response of :\n
                    --- ${response.statusText}
                `)
            }
        } catch (error) {
            console.log(`
                --- WEATHER API CALL ERROR :
                --- ${loggableUrl}
                --- ${error.message}`)
            return null
        }
    })()
}
