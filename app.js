import express from "express";
import bodyParser from "body-parser";
import dbConfig from "./db/dbConfig.js";

import SellerRouter from "./routes/seller.route.js";
import ProductRouter from "./routes/product.route.js";
import AdminRouter from "./routes/admin.js";
import CategoryRouter from "./routes/category.route.js";
import CustomerRouter from "./routes/customer.route.js";
import ProductRouter from "./routes/product.route.js";
import CartRouter from "./routes/cart.route.js";



const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/customer", CustomerRouter);
app.use("/product", ProductRouter);
app.use("/cart", CartRouter);

app.use("/seller", SellerRouter);
app.use("/product", ProductRouter);
app.use("/admin", AdminRouter);
app.use("/category", CategoryRouter);


app.listen(3000, () => {

    console.log("Server started....");
})
