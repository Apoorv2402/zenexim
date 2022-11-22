const router = require("express").Router();
const Invoice_Master = require("../Models/Invoice_Master");
const Invoice_Detail = require("../Models/Invoice_Detail");
const Status = require('../Constants/Request_Status');

// Create invoice
router.post('/create', async (req, res) => {
  try {
    const { body } = req;
    let invoice = await Invoice_Master.find();
    const newInvoiceMaster = new Invoice_Master({
      invoice_no: invoice.length + 1,
      total_amount: body.total_amount,
      customer_name: body.customer_name,
    })
    const invoiceMaster = await newInvoiceMaster.save();

    const newInvoiceDetail = new Invoice_Detail({
      Invoice_Id: invoiceMaster._id,
      Product_Id: body.Product_Id,
      Unit: body.Unit,
      Qty: body.Qty,
      Rate: body.Rate,
      Disk_Percentage: body.Disk_Percentage,
      NetAmount: body.NetAmount,
      TotalAmount: body.TotalAmount,
    })
    const invoicedetails = await newInvoiceDetail.save();
    res.status(Status.OK).json("Invoice Generated Successfully");
  } catch (error) {
    res.status(Status.INTERNAL_SERVER_ERROR).json(error.message)
  }
});

module.exports = router;