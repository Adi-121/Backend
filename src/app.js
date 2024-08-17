import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";


const app = express();

// origin tells from where are we accepting requests from
app.use(cors({
  origin: process.env.CORS_ORIGIN
}))

// to get form data in form of a json
app.use(express.json({ limit: "16kb" }))

//to be able to fetch data from url
app.use(express.urlencoded(extended))

// to keep the uploaded data at our server ("public" name is not necessary this can be anything here we have public file where we will store the uploaded data for a while)
app.use(express.static("public"))

// to perform crud operation on user cookies
app.use(cookieParser());


export { app };