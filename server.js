import express from 'express'
const app = express()
import 'express-async-errors'
import morgan from 'morgan'
import dotenv from 'dotenv'
dotenv.config()

import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

// DATABASE CONNECTION
import connectDB from './db/connect.js'

// ROUTERS
import authRouter from './routes/authRoutes.js'
import categoryRouter from './routes/categoryRoutes.js'
import progressRouter from './routes/progressRoutes.js'
import clientRouter from './routes/clientRoutes.js'
import userClientRouter from './routes/userClientRoutes.js'
import scheduleRouter from './routes/scheduleRoutes.js'
import campaignRouter from './routes/campaignRoutes.js'
import socialRouter from './routes/socialRoutes.js'

// MIDDLEWARE
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import authenticateUser from './middleware/auth.js'

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname, './app/build')))

app.use(express.json())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/cate', authenticateUser, categoryRouter)
app.use('/api/v1/prog', authenticateUser, progressRouter)
app.use('/api/v1/client', authenticateUser, clientRouter)
app.use('/api/v1/userclient', authenticateUser, userClientRouter)
app.use('/api/v1/schedule', authenticateUser, scheduleRouter)
app.use('/api/v1/social', authenticateUser, socialRouter)
app.use('/api/v1/campaign', authenticateUser, campaignRouter)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './app/build', 'index.html'))
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`server is listening ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
