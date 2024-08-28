import express from 'express'
import { apiRoute } from '../router/api'

const web = express()

web.use(express.json())
web.use(apiRoute)

export {
    web
}