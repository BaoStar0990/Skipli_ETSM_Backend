import express, { Application, NextFunction, Request, Response } from 'express'
import errorHandlerMiddleware from '~/middlewares/error-handler.middleware'
import appRouter from '~/routes/index.route'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app: Application = express()

// CORS configuration
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
)
// Middleware to parse cookies
app.use(cookieParser())

// Middleware to parse JSON requests
app.use(express.json())

// Common prefix endpoint
app.use('/api/v1', appRouter)

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => errorHandlerMiddleware(err, req, res, next))

export default app
