import express, { Express, Request, Response } from 'express'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()
const port: string = process.env.PORT || '5000';
const app: Express = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/src')))


app.get('*', (req: Request, res: Response) => {
    res.send('Hi from express server root - index.ts')
})

app.listen(port, () => {
    console.log(`--- express listening on port ${port} ---`)
})
