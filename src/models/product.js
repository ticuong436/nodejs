const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    offer: { type: Number },
    thumbnail: [
        { img: { type: String } }
    ],
    review: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            review: String
        }
    ],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    updateAt: Date,

}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema)