const express  = require("express");
const { requireSignIn, isAdmin } = require("../middleware/authMiddleware");
const { createProductController, getProductController, getSingleProductController, deleteProductController, updateProductController, productFilterController, productCountController, productListController } = require("../controllers/createProductController");
const formidableMiddleware = require('express-formidable');

const router = express.Router();


router.post('/create-product', requireSignIn , isAdmin , createProductController)

router.get('/get-products', getProductController)

router.get('/get-products/:slug', getSingleProductController)

router.delete('/products/:pid', deleteProductController)

router.put('/update-product/:pid', requireSignIn , isAdmin , updateProductController)

router.post('/product-filter', productFilterController)


router.get('/product-count', productCountController)

router.get('/product-list/:page', productListController)


module.exports=router