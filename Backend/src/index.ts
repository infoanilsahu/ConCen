import { app } from "./app.js";
import dotenv from 'dotenv'
import { connectDB } from "./db/database.js";

dotenv.config({
    path: './.env'
})

const port = process.env.PORT || 8000;

connectDB()
    .then( () => {
        app.listen(port, () => {
            console.log(`sever is running on ${process.env.SERVER_URL}`);
        })
    })
    .catch( (err) => {
        console.log("Error on connection to data base :",err);
        process.exit(1)
    } )

