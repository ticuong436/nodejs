const Cart = require('../models/cart')
exports.addToCart = (req, res) => {

    Cart.findOne({ user: req.user._id }).exec((err, cart) => {
        if (err) res.status(400).json({ err })
        if (cart) {
            // Đã có sản phẩm trong cart
            const product = req.body?.cartItems.product
            const item = cart.cartItems.find(c => c.product == product)
            let condition, update
            if (item) {
                //Đã có số lượng của sản phâm
                condition = { "user": req.user._id, "cartItems.product": product }

                update = {
                    "$set": {
                        "cartItems.$": {
                            ...req.body.cartItems,
                            quantity: item.quantity + req.body.cartItems.quantity
                        }
                    }
                }


            } else {
                // chưa có số lượng của sản phẩm
                condition = { user: req.user._id }

                update = {
                    "$push": {
                        "cartItems": req.body.cartItems
                    }
                }

            }
            Cart.findOneAndUpdate(condition, update)
                .exec((err, _cart) => {
                    if (err) return res.status(400).json({ err })
                    if (_cart) return res.status(200).json({ _cart })
                })

        } else {
            //Chưa có sản phẩm trong cart
            const cart = new Cart({
                user: req.user._id,
                cartItems: [req.body.cartItems]
            })
            cart.save((err, data) => {
                if (err) res.status(400).json({ err })
                if (data) {
                    return res.status(200).json({ data })
                }
            })

        }
    })

}