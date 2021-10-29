const express = require('express')
const { requireSignin, adminMiddleware, upload } = require('../common-middleware')
const { createProduct, getProductBySlug } = require('../controller/product')
const router = express.Router()

router.post('/product/create', requireSignin, adminMiddleware, upload.array('thumbnail'), createProduct)
router.get('/product/:slug', getProductBySlug)

module.exports = router