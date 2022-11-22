var mongoose = require('mongoose');
const { Schema } = mongoose;

const InvoiceDetailSchema = new Schema({
    Invoice_Id: {
        type: String,
        required: true,
    },
    Product_Id: {
        type: String,
        required: true
    },
    Unit: {
        type: Number,
        required: true
    },
    Qty: {
        type: Number,
        required: true
    },
    Rate: {
        type: Number,
        required: true
    },
    Disk_Percentage: {
        type: Number,
        required: true
    },
    NetAmount: {
        type: Number,
        required: true
    },
    TotalAmount: {
        type: Number,
        required: true
    }
}
);

module.exports = mongoose.model("Invoice_Detail", InvoiceDetailSchema);