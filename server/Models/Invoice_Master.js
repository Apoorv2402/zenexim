var mongoose = require('mongoose');
const { Schema } = mongoose;

const InvoiceSchema = new Schema({
    invoice_no: {
        type: Number,
        required: true,
        unique: true,
    },
    customer_name: {
        type: String,
        required: true
    },
    total_amount: {
        type: Number,
        required: true
    },
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Invoice_Master", InvoiceSchema);