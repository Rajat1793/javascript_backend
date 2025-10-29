import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
})) //act as a middleware

app.use(express.json({limit: '16kb'})) //to accept the json data
app.use(express.urlencoded({extended: true, limit: '16kb'}))
app.use(express.static("public"))
app.use(cookieParser())

// routes import

import userRouter from './routes/user.routers.js'

// routes decleration
app.use("/api/v1/users", userRouter)

// https://localhost:5000/api/v1/users/register
export {app}