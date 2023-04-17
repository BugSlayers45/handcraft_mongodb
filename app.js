import express from "express";
import bodyParser from "body-parser";
import dbConfig from "./db/dbConfig.js";

import SellerRouter from "./routes/seller.route.js";
import ProductRouter from "./routes/product.route.js";
import AdminRouter from "./routes/admin.js";
import CategoryRouter from "./routes/category.route.js";
import CustomerRouter from "./routes/customer.route.js";
import CartRouter from "./routes/cart.route.js";
import OrderRouter from "./routes/order.route.js";
import WishlistRouter from './routes/wishlist.route.js';

import path from "path";
import { fileURLToPath } from 'url';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view-engine","ejs");
app.use("/customer", CustomerRouter);
app.use("/product", ProductRouter);
app.use("/cart", CartRouter);

app.use("/seller", SellerRouter);
app.use("/product", ProductRouter);
app.use("/admin", AdminRouter);
app.use("/category", CategoryRouter);

app.use("/order",OrderRouter);
app.use('/wishlist',WishlistRouter);

const publicPath = path.join(path.dirname(fileURLToPath(import.meta.url)),"public");
app.use(express.static(publicPath));


app.listen(3000, () => {
    console.log("Server started....");
})
