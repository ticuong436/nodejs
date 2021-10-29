const Page = require('../../models/page')


exports.createPage = (req, res) => {
    const { banners, products } = req.files;
    if (banners.length > 0) {
        req.body.banners = banners.map((banner, index) => ({
            img: `${process.env.API}/public/${banner.filename}`,
            navigateto: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`
        }))
    }
    if (products.length > 0) {
        req.body.products = products.map((product, index) => ({
            img: `${process.env.API}/public/${product.filename}`,
            navigateto: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`
        }))
    }
    req.body.createBy = req.user._id
    const page = new Page(req.body);
    page.save((err, page) => {
        if (err) return res.status(400).json({ err })
        if (page) {
            res.status(200).json({ body: req.body })
        }
    })

}