const express = require('express')
const { requireSignin, adminMiddleware } = require('../common-middleware')

const { addCategory, getCategory, updateCategories, deleteCategories } = require('../controller/category')
const router = express.Router()
const shortid = require('shortid')
const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {

        cb(null, shortid.generate() + '-' + file.originalname)
    }
})
const upload = multer({ storage })
router.post('/category/create', requireSignin, adminMiddleware, upload.single('categoryImg'), addCategory)
router.get('/category/getcategory', getCategory)
router.post('/category/update', upload.array('categoryImg'), updateCategories)
router.post('/category/delete', deleteCategories)

module.exports = router