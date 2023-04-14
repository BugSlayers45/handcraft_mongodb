import express from "express";
import bodyParser from "body-parser";
import dbConfig from "./db/dbConfig.js";


import AdminRouter from "./routes/admin.js";
import CategoryRouter from "./routes/category.route.js";
import ProductRouter from "./routes/product.route.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/admin",AdminRouter);
app.use("/category",CategoryRouter);
app.use("/product",ProductRouter);


app.listen(3000, () => {
    console.log("Server started....");
})
