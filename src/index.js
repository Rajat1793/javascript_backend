// require('dotenv').config({path: './env'}) //one way to include dotenv
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants"

import dotenv from "dotenv"
import connectDB from "./db/index.js";

// we are using the experimental feature for dotenv and modified the package.json
dotenv.config({
    path: './env'
})

connectDB() // better approach is to write all DB connection logic in other file and import it into index.js file
.then(() =>{
    app.listen(process.env.PORT || 8000, () =>{
        console.log(`Server is running at PORT: ${process.env.PORT}`);
    })
    app.on("error", (error) =>{
            console.log("Error: ",error);
            throw error
    })
})
.catch((error) =>{
    console.error("MongoDB connection failed!!! ", error);
})


// its one of the approach where we write all DB connection logic in index.js file
/*
import express from "express"
const app = express()
( async() => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) =>{
            console.log("Error: ",error);
            throw error
        })
        app.listen(process.env.PORT, () =>{
            console.log(`App is listening on port ${process.env.PORT}`);  
        })
    }catch (error){
        console.error("ERROR: ", error);
        throw error
    }
})() //iffi (any function executed immediately)
 */