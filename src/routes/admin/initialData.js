const express = require('express')
const router = express.Router()
const { initialData } = require('../../controller/admin/initalController')




router.post('/admin/initial', initialData)




module.exports = router