import express, { Router, Request, Response } from 'express'
//import { apiData } from '../mock-api/apiData'
import { getApiForecast } from '../src/api'
import { getProcessedForecast } from '../src/data-processing'


const router: Router = express.Router()

router.get('/', (req: Request, res: Response) => {
    (async () => {
        const apiData = await getApiForecast()
        if (apiData) {
            const dataFor5Days = await getProcessedForecast(apiData)
            res.json(dataFor5Days)
        } else {
            res.json({error: true})
        }
    })()
})

export default router
