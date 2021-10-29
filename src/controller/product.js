const Product = require('../models/product')
const slugify = require('slugify')
const Category = require('../models/category')
exports.createProduct = (req, res) => {
    const { name, description, price, category, createdBy, quantity } = req.body
    let thumbnail = []


    if (req.files.length > 0) {
        thumbnail = req.files.map(file => {
            return { img: file.filename }
        })
    }

    const product = new Product({
        name: req.body.name,
        slug: slugify(name),
        quantity,
        description,
        thumbnail,
        price,
        category,
        createdBy: req.user._id
    })
    product.save(((err, data) => {
        if (err) return res.status(400).json({ err })
        if (data) {
            res.status(200).json({ data })
        }
    }))
}

exports.getProductBySlug = (req, res) => {
    const { slug } = req.params
    Category.findOne({ slug: slug })
        .select('_id')
        .exec((err, category) => {
            if (err) {
                return res.status(400).json({ err })
            }
            if (category) {
                Product.find({ category: category._id }).exec((err, products) => {
                    if (products.length > 0) {
                        res.status(200).json({
                            products,
                            productsByPrice: {
                                under500: products.filter(product => product.price <= 500),
                                under1k: products.filter(product => product.price > 500 && product.price <= 1000),
                                under2k: products.filter(product => product.price > 1000 && product.price <= 2000),
                                under5k: products.filter(product => product.price > 2000 && product.price <= 5000),
                                under10k: products.filter(product => product.price > 5000 && product.price <= 10000)

                            }
                        })
                    }
                    else {
                        res.status(400).json({
                            message: 'Don not have product'
                        })
                    }
                })
            }


        })

}