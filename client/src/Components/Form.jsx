import React, { Component } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import TableComponent from './TableComponent';

export default class FormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerName: "",
            allProducts: [],
            selectedProduct: {},
            qty: 1,
            unit: 0,
            rate: 0,
            discount: 0,
            netAmount: "",
            totalAmount: "",
        }
    }

    submitFormHandler = (e) => {
        e.preventDefault();
        const { customerName,unit, qty,selectedProduct,rate, discount,netAmount,totalAmount,allProducts } = this.state;
        let productsArray = allProducts;
        var obj = {};
        if(customerName && qty && selectedProduct && selectedProduct._id){    
            obj["productId"] = selectedProduct._id;
            obj["name"] = selectedProduct.name;
            obj["customerName"] = customerName;
            obj["rate"] = selectedProduct.rate;
            obj["units"] = selectedProduct.units;
            obj["qty"] = qty;
            obj["discount"] = discount;
            obj["netAmount"] = netAmount;
            obj["totalAmount"] = totalAmount;
        }else{
            alert("Incomplete Form")
        }
        console.log("obj - - -",obj)
        productsArray.push(obj)
        
        this.setState({allProducts:productsArray})
    }

    onChangeQuantity = (e) => {
        this.setState({ qty: e.target.value }, () => {
            const { qty, netAmount } = this.state;
            if (qty > 1) {
                this.setState({ totalAmount: netAmount * qty });
            } else {
                this.setState({ totalAmount: netAmount });
            }
        })
    }

    onChangeDiscount = (e) => {
        if (e.target.value < 100) {
            this.setState({ discount: e.target.value }, () => {
                const { discount, rate, netAmount, qty, totalAmount } = this.state;
                let disc = netAmount * discount /100 ;
                let discAmount = netAmount - disc;
                console.log("disk", disc)
                console.log("diskAmount", discAmount)
                if (discount) {
                    this.setState({ netAmount: discAmount })
                } else {
                    this.setState({ netAmount: rate })
                }
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { discount, rate, netAmount, qty, selectedProduct } = this.state;
        if (prevState.netAmount !== netAmount) {
            this.setState({ totalAmount: netAmount * qty })
        }
    }

    onChangeSelectedProduct = (e) => {
        let temp = e.target.value;
        const { products } = this.props;
        let selected = products.filter(item => {
            if (item._id === temp) {
                return item
            }
        })
        this.setState({ selectedProduct: selected[0] }, () => {
            const { selectedProduct } = this.state;
            this.setState({
                netAmount: selectedProduct.rate,
                totalAmount: selectedProduct.rate,
                discount: 0,
                qty: 1
            })
        })
    }

    render() {
        const { selectedProduct, allProducts } = this.state
        console.log("productsArray -  -- - -",allProducts)
        return (
            <Container className="mt-5 px-5" onSubmit={this.submitFormHandler}>
                <Form className="w-60 rounded p-5">
                    <Form.Group as={Row} className="mb-1" controlId="customerName">
                        <Form.Label column sm="2">
                            Customer Name
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Enter Name" onChange={(e) => this.setState({ customerName: e.target.value })} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1" controlId="selectedProduct">
                        <Form.Label column sm="2">
                            Product
                        </Form.Label>
                        <Col sm="10">
                            <Form.Select defaultValue={"Select Product"}
                                onChange={(e) => this.onChangeSelectedProduct(e)}>
                                <option key={0} disabled >Select Product</option>
                                {this.props.products && this.props.products.map((item, index) => {
                                    return <option key={index + 1} value={item._id}>{item.name}</option>
                                })}
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1" controlId="rate">
                        <Form.Label column sm="2">
                            Rate
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control plaintext disabled value={selectedProduct.rate ? selectedProduct.rate : "Select Product"} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1" controlId="unit">
                        <Form.Label column sm="2">
                            Units
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control plaintext disabled value={selectedProduct.units ? selectedProduct.units : "Select Product"} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1" controlId="quantity">
                        <Form.Label column sm="2">
                            Qty.
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                type="number" min="1" max={selectedProduct.units} value={this.state.qty}
                                placeholder="Enter Quantity"
                                disabled={selectedProduct.rate ? false : true}
                                onChange={(e) => this.onChangeQuantity(e)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1" controlId="discount">
                        <Form.Label column sm="2">
                            Discount(%)
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="number" min="0" max="100" step={0.1}
                                disabled={selectedProduct.rate ? false : true}
                                placeholder="Enter Discount %"
                                onChange={(e) => this.onChangeDiscount(e)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1" controlId="netAmount">
                        <Form.Label column sm="2">
                            Net Amount
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control plaintext disabled value={this.state.netAmount} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1" controlId="totalAmount">
                        <Form.Label column sm="2">
                            Total Amount
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control plaintext disabled value={this.state.totalAmount} />
                        </Col>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add +
                    </Button>
                </Form>

                <TableComponent allInvoices={allProducts} allProducts={this.props.products}/>
            </Container>
        )
    }
}
