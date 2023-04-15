import express from "express";
import bodyParser from "body-parser";
import CustomerRouter from "./routes/customer.route.js";
import ProductRouter from "./routes/product.route.js";
import CartRouter from "./routes/cart.route.js";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/customer", CustomerRouter);
app.use("/product", ProductRouter);
app.use("/cart", CartRouter);


app.listen(8000, () => {
    console.log("Server started....");
})
