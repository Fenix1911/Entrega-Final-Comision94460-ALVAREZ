import { Router } from "express";
import ProductManager from "../dao/ProductManager.js";

const router = Router();

router.get("/products", async (req, res) => {
    const {
        limit = 10,
        page = 1,
        sort,
        query
    } = req.query;

    const filter = {};
    if (query) {
        if (query === "true" || query === "false") {
            filter.status = query === "true";
        } else {
            filter.category = query;
        }
    }

    const options = {
        limit: Number(limit),
        page: Number(page),
        lean: true
    };

    if (sort) {
        options.sort = { price: sort === "asc" ? 1 : -1 };
    }

    const result = await ProductManager.getProducts(filter, options);

    res.render("products", {
        products: result.docs,
        pagination: result
    });
});

export default router;