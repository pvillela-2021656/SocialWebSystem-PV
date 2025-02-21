"use strict"

import cors from "cors"
import express from "express"
import helmet from "helmet"
import morgan from "morgan"
import authRoutes from "../src/auth/auth.routes.js"
import categoryRoutes from "../src/category/category.routes.js"
import apiLimiter from "../src/middlewares/rate-limit-validator.js"
import publicationRoutes from "../src/publication/publication.routes.js"
import userRoutes from "../src/user/user.routes.js"
import { dbConnection } from "./mongo.js"

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(apiLimiter)
}

const routes = (app) => {
    app.use("/socialNetwork/v1/auth", authRoutes);
    app.use("/socialNetwork/v1/user", userRoutes);
    app.use("/socialNetwork/v1/category", categoryRoutes);
    app.use("/socialNetwork/v1/publication", publicationRoutes);
}

const conectarDB = async () => {
    try {
        await dbConnection()
    } catch (err) {
        console.log(`Database connection failed: ${err}`)
        process.exit(1)
    }
}

export const initServer = () => {
    const app = express()
    try {
        middlewares(app)
        conectarDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
    } catch (err) {
        console.log(`Server init failed: ${err}`)
    }
}