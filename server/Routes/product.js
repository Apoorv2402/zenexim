const router = require("express").Router();
const Product_Master = require("../Models/Product_Master");
const Status = require('../Constants/Request_Status');

// Create Product
router.post('/create', async (req, res) => {
    try {
      const { body } = req;
      const newProduct = new Product_Master({
        name: body.name,
        rate: body.rate,
        units: body.units,
      })
      const product = await newProduct.save();
      console.log(product)
      res.status(Status.OK).json(product)
    } catch (error) {
      res.status(Status.INTERNAL_SERVER_ERROR).json(error)
    }
  });

  // Get All Products
router.get('/all', async (req, res) => {
    try{
      const { query } = req;
      let products = await Product_Master.find();
      res.status(Status.OK).json(products);
    }catch(err){
      res.status(Status.BAD_REQUEST).json(err)
    }
  });

  module.exports = router;