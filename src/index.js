// we will always want our .env file to get loaded first as it contails most of the important info related to connections thus we import it first
import dotenv from "dotenv"


// there are 2 ways to connect to the database mtlb way to ek hi hai there are 2 types in which we can connect

// first write all code in the index file

// second write a modular code ie write a code in different file and import it in the Index file

// one more point 
// whenever we try to talk to DB, any issue can arise thus we should wrap the connection code in try-catch block
// also treat as your DB is in other continent thus it takes time thus use Async-await

// Following are the professional way of connecting to DB:- 
// 1.Wrap your connection code in "try-catch" as any issue may occur while connecting to DB
// 2.use "async-await" as treat you DB as if it is in different continent 
// 3.write modular code ie connection code in different file and then import it in index file and use it

import connectDB from './db/index.js';
import { app } from "./app.js";

dotenv.config({
  path: './env'
})


// connectDB is an asynchronous function that means it will return promise thus we will handle it to by .then and .catch
// modular code
connectDB()
  .then(() => {
    // as we have connected to DB, now we will use app to listen from specified port for incoming request
    const port = process.env.PORT || 8000;
    app.listen(port, ()=>{
      console.log(`Server is running on port: ${port}`);
    });
  }
  )
  .catch((error) => {
    console.log("MongoDB connection failed ", error);
  })
