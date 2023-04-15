import express from "express";
import bodyParser from "body-parser";
import dbConfig from "./db/dbConfig.js";

import SellerRouter from "./routes/seller.route.js";
import ProductRouter from "./routes/product.route.js";
import AdminRouter from "./routes/admin.js";
import CategoryRouter from "./routes/category.route.js";
import orderRouter from "./routes/order.route.js"


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/seller", SellerRouter);
app.use("/product", ProductRouter);
app.use("/admin", AdminRouter);
app.use("/category", CategoryRouter);
app.use("/order",orderRouter)



app.listen(3000, () => {
    console.log("Server started....");
})
