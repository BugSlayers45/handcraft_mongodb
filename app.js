import express from "express";
import bodyParser from "body-parser";
import AdminRouter from "./routes/admin.js";
import dbConfig from "./db/dbConfig.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/admin",AdminRouter);




app.listen(3000, () => {
    console.log("Server started....");
})
