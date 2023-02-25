import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import placesRoute from "./routes/places.js"
import cookieParser from "cookie-parser"


const app =express()
dotenv.config()
mongoose.set("strictQuery", false);

const connect = async ()=>{
try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongodb")
} catch (error) {
    throw error
}
};
mongoose.connection.on("connected",()=>{
    console.log("connected")
})
mongoose.connection.on("disconnected",()=>{
    console.log("disconnected")
})
 

// //middleware
app.use(express.json())
app.use(cookieParser())


app.use('/auth',authRoute)
app.use("/places",placesRoute)
// app.use('place',placeRoute)
// app.use('user',userRoute)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });


app.listen(5000,()=>{
    connect()
    console.log("connected to backend");
    
})
