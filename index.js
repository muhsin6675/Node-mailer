const express =require('express')      //step 1
const mongoose=require('mongoose')     //step 2
const dotenv=require('dotenv').config()        //step 3
const Authentication=require('./Routes/Authentication')                   //step 13
const port = process.env.PORT||3000                           //step 7
const app =express()                           //step 5



//db connection                                   step 6
mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>console.log('Db connected'))
.catch(()=>console.log('err'))

//link from server to auth
app.use(express.json())
app.use('/Authentication',Authentication)                            //step 14 use it with auth route


app.listen(port,()=>{
    console.log(`server is running at ${port}`)                   //step 4
})