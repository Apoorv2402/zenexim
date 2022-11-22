var mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    rate: {
        type: Number,
        required: true
    },
    units: {
        type: Number,
        required: true
    },
}
);

module.exports = mongoose.model("Product_Master", ProductSchema);