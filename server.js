import ProductManager from './dao/ProductManager.js';
import express from 'express';
import productsRouter from './routes/products_routes.js';
import cartsRouter from './routes/carts_routes.js';

const app = express()
app.use(express.json());


const productManager = new ProductManager ('products.json');

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);


app.listen(8080, () => {
    console.log("Servidor escuchando en puerto 8080");
});
