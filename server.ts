import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config({ path: "./.env" });

const hostName: string = "127.0.0.1";
const app:Application=express()

const port: string | number | undefined = process.env.PORT || 9900;
const dbUrl: any = process.env.MONGO_DB_CLOUD_URL;
const dbName: string | undefined = process.env.MONGO_DB_DATABASE;

app.use(express.json())
mongoose.connect(dbUrl, { dbName: dbName })
    .then(() => { console.log("Database Connection is Ready..") })
    .catch((err) => { console.log(err) })



app.get("/", (request: Request, response: Response) => {
    response.status(200);
    response.json({
        msg: "Welcome to Expresss Server"
    });
});

// router Configuration
import gropRouter from './Router/groupRouter'
app.use("/groups", gropRouter);

import userRouter from './Router/userRouter';
app.use("/user" ,userRouter )

if (port) {
    app.listen(Number(port), () => {
        if (dbUrl && dbName) {
            mongoose.connect(dbUrl, { dbName: dbName })
                .then((dbResponse) => {
                    console.log("connection Established...");

                })
                .catch((error) => {
                    console.error(error);
                    process.exit(0);  // force stop express server
                });
        };
    })
}

app.listen(Number(port), hostName , () => {
    console.log(`Express Server is started at http://${hostName}:${port}`);
});

