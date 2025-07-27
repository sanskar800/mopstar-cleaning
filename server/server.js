import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import blogRouter from './routes/blogRoutes.js'
import adminRouter from './routes/adminRoutes.js'
import contactRouter from './routes/contactRoutes.js'

//app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//middleware
app.use(express.json())
app.use(cors())

//api endpoints
app.get('/', (req, res) => {
    res.send('API Working')
})

app.use('/api/blogs', blogRouter)
app.use('/api/admin', adminRouter)
app.use('/api/contact', contactRouter)

app.listen(port, () => console.log('Server Started!', port))
