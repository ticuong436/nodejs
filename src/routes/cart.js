const express = require('express')
const { userMiddleware, requireSignin } = require('../common-middleware')
// const { requireSignin, userMiddleware } = require('../common-middleware')

const { addToCart } = require('../controller/cart')
const router = express.Router()

router.post('/user/cart/addtocart', requireSignin, userMiddleware, addToCart)

module.exports = router