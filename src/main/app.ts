import express, { Application } from 'express'
import cors from 'cors'

const app: Application = express()
app.use(cors)

const port=2333;

// parse
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

export default app
