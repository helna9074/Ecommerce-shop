import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import AdminRouter from './Routes/AdminRoute.js'
import UserRouter
 from './Routes/UserRoute.js'


dotenv.config();
process.on('uncaughtException',(err)=>{
    console.log('uncaught error',err)
})
const app=express();
app.use(express.json())
app.use(cors({
    origin:"*"
}))
const PORT=process.env.PORT
mongoose.connect(process.env.DB_URL).then(()=>console.log("database is connected successfully")).catch(err=>console.log("db failed",err))

app.use('/admin',AdminRouter)
app.use('/user',UserRouter
    
)
app.listen(PORT,()=>console.log(`listening to the port ${PORT}`))

