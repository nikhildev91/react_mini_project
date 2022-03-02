import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'
import connectDB from './config/database.js'


import productRoutes from './routes/productRoute.js'


dotenv.config()

connectDB()
const app = express()

app.use((req, res, next) => {
    console.log(req.originalUrl);
    next()
})

app.get('/', (req, res) => {
    res.send('API Is Running')
});

app.use('/api/products', productRoutes);
app.use(notFound)

app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.underline.bold))

