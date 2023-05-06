import { Product } from "../model/product.model.js";
import dbConfig from "../db/dbConfig.js";
import { Category } from "../model/category.model.js";

export const Save = async (request, response, next) => {
    try {
        await Product.create(request.body.products)

        return response.status(200).json({ message: "Product saved...", status: true });
    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}

export const productListBySellerId = async (request, response, next) => {
    try {
        let result = await Product.find({ sellerId: request.params.sellerId })
        return response.status(200).json({ productsList: result, status: true })
    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: "INTERNAL SERVER ERROR", status: false })
    }
}

export const updateproducts = async (request, response, next) => {
    try {
        let result = await Product.updateMany({ _id: request.params._id }, { title: request.body.title, description: request.body.description, price: request.body.price, stock: request.body.stock, discountPercentage: request.body.discountPercentage });
        return response.status(200).json({ result: result, status: true })
    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: "INTERNAL SERVER ERROR", status: false })
    }
}


export const removeProduct = async (request, response, next) => {
    try {
        let status = await Product.deleteOne({ _id: request.params._id });
        return response.status(200).json({ message: "Product removed", status: true })

    } catch (err) {
        console.log(err);
        return response.status(500).json({ message: "Internal server error", status: false });
    }
}

export const viewProduct = async (request, response, next) => {
    try {
        let product = await Product.find()
        return response.status(200).json({ products: product, status: true });
    } catch (err) {
        return response.status(500).json({ error: "Internal Server", status: false });
    }
}
export const featuresProduct = async (request, response, next) => {
    try {
        let product = await Product.find().limit(8)
        // console.log(product)
        return response.status(200).json({ products: product, status: true });
    } catch (err) {
        return response.status(500).json({ error: "Internal Server", status: false });
    }
}

export const getProductById = (request, response, next) => {
    Product.findById(request.params.id).populate("categoryId")
        .then(result => {
            return response.status(200).json({ product: result, status: true });
        }).catch(err => {
            console.log(err);
            return response.status(500).json({ error: "Internal Server", status: false });
        })
}


export const addPage = (request, response, next) => {
    response.render("image.ejs");
}

export const getProductByCategory = (request, response, next) => {
    Product.find({ categoryId: request.params.categoryId })
        .then(result => {
            return response.status(200).json({ products: result, status: true });
        }).catch(err => {
            console.log(err);
            return response.status(500).json({ error: "Internal Server", status: false });
        })
}


export const productAdd = (request, response, next) => {
    try {
        console.log("called....")
        console.log(request.files);
        const images = request.files.map(file => {
            return file.filename
        });
        console.log(images);

        console.log(category + "nghg");
        let { title, description, price, discountPercantage, rating, stock, categoryId, keyword } = request.body
        Product.create(({ images: images, price: price, title: title, description: description, discountPercentage: discountPercantage, rating: rating, stock: stock, categoryId: categoryId, keyword: keyword }))
        return response.status(200).json({ message: "saved...", status: true });

    }
    catch (err) {
        console.log(err);
        return response.statsu(500).json({ error: "Internal server error", status: false });
    }
}


export const search = async (request, response, next) => {
    try {
        let searchResult = await Product.find({
            $or: [{ title: { $regex: request.params.keyword, $options: "i" } },
            { keyword: { $regex: request.params.keyword, $options: "i" } },
            { description: { $regex: request.params.keyword, $options: "i" } }]
        })
        if (searchResult.length > 0)
            return response.status(200).json({ Product: searchResult, status: true })
        else
            return response.status(401).json({ result: "NO result found", status: false })
    }
    catch (err) {
        console.log(err)
        return response.status(500).json({ error: err, status: false })
    }
}
