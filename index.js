import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import fileUpload from  "express-fileupload"
import path from 'path'
import session from "express-session";

const app = express()
dotenv.config()
mongoose.set("strictQuery", false);

// //middleware
const __dirname = path.resolve();
app.use('/', express.static(path.join(__dirname, 'public')))
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json())
// Use the express-fileupload middleware
app.use(fileUpload());
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


// user
import homeRoute from "./routes/home.js"
import authRoute from "./routes/auth.js"

// admin (owner)
import authAdminRoute from "./routes/admin/auth.js"
import placesAdminRoute from "./routes/admin/places.js"
import homeAdminRoute from "./routes/admin/home.js"


app.use("/", homeRoute)
app.use('/auth', authRoute)

// admin (owner)
app.use("/", homeAdminRoute)
app.use('/admin/auth',authAdminRoute)
app.use("/places",placesAdminRoute)
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
         
app.listen(5000,()=>{
    connect()
    console.log("connected to backend");
    
})
