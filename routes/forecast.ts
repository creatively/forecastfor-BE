import express, { Router, Request, Response } from 'express'
//import { apiData } from '../mock-api/apiData'
import { getApiForecast } from '../src/api'
import { getProcessedForecast } from '../src/data-processing'


const router: Router = express.Router()

router.get('/', (req: Request, res: Response) => {

    const lat: string = req.query.lat as string
    const lon: string = req.query.lon as string

    (async () => {
        const apiData = await getApiForecast({latitude: lat, longitude: lon})
        if (apiData) {
            const dataFor5Days = await getProcessedForecast(apiData)
            res.json(dataFor5Days)
        } else {
            res.send(`error : remote call to weather api failed`)
        }
    })()
})

export default router
