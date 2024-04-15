// This is the file from where server is run 
// Node package Imports
import express from "express";
import path from 'path';
import cors from 'cors';
import bodyparser from 'body-parser';
import 'dotenv/config'


// importing routes
import { middlewareInternalError } from "./middlewares/miderrorHandler.mjs";
import { router as compileapi } from "./routes/apiroutes.mjs";
import {router as viewroutes} from "./routes/viewroutes.mjs";

// env constants
const app = express()
const port = process.env.PORT
const frontend = process.env.FRONTEND
const __dirname = path.resolve()


// origin settings
let corsOptions = {
    origin:frontend,
    optionSuccessStatus: 200
}

if(process.env.NODE_ENV === "dev"){
    app.disable("view cache")
}

// express prefixes middlewares
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.json())

// express custom middleware
app.set("view engine","ejs")
app.set("views",[path.join(__dirname,"views")])
app.use(express.static(path.join(__dirname,"public")))

// using middlewares
app.use(cors(corsOptions))
app.use(middlewareInternalError)

//using routes
app.use(compileapi)
app.use(viewroutes)

app.listen(port,(err)=>{
    console.log(`http://127.0.0.1:${port}`) 
})


