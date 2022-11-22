import React, { Component } from 'react'
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
export default class TableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoiceArray: []
        }
    }

    componentDidMount() {
        const { allInvoices } = this.props;
        this.setState({ invoiceArray: allInvoices })
    }

    removeInvoiceRow(id) {
        const { invoiceArray } = this.state;
        let data = invoiceArray.splice(id, 1);
        this.setState({ invoiceArray: data });
    }

    componentDidUpdate(prevprops, prevState) {
        if (prevprops.allInvoices.length !== this.state.invoiceArray.length) {
            const { allInvoices } = this.props;
            this.setState({ invoiceArray: allInvoices })
        }
    }

    updateQuantity(q, i) {
        const { invoiceArray } = this.state;
        let data = invoiceArray.map((item, index) => {
            if (i === index) {
                item["qty"] = q;
            }
            return item;
        })
        console.log(data)
        this.setState({ invoiceArray: data })
    }

    updateDiscount(d, i) {
        const { invoiceArray } = this.state;
        let data = invoiceArray.map((item, index) => {
            if (i === index) {
                item["discount"] = d;
            }
            return item;
        })
        this.setState({ invoiceArray: data })
    }

    render() {
        const { invoiceArray } = this.state;
        const { allProducts } = this.props;
        return (
            <>
                {invoiceArray.length ?
                    <div>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Rate</th>
                                    <th>Unit</th>
                                    <th>Qty</th>
                                    <th>Disc%</th>
                                    <th>Net Amt.</th>
                                    <th>Total Amt.</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    invoiceArray.map((item, index) => {
                                        return (<tr Key={index}>
                                            <td>
                                                <Form.Select defaultValue={item.name} placeholder="Select" onChange={(val) => { console.log(val.target.value) }}>
                                                    {allProducts && allProducts.map((elem, index) => {
                                                        return <option key={index + 1} value={elem._id}>{elem.name}</option>
                                                    })}
                                                </Form.Select>
                                            </td>
                                            <td>{item.rate}</td>
                                            <td>{item.units}</td>
                                            <td><input type="Number" min="0" max={item.units} value={item.qty} onChange={(e) => this.updateQuantity(e.target.value, index)} /></td>
                                            <td><input type="Number" min="0" max="100" step="0.1" value={item.discount} onChange={(e) => this.updateDiscount(e.target.value, index)} /></td>
                                            <td>{item.netAmount}</td>
                                            <td>{item.totalAmount}</td>
                                            <td><button type="primary" onClick={(e) => { this.removeInvoiceRow(index) }}>Remove</button></td>
                                        </tr>)
                                    })
                                }
                            </tbody>
                        </Table>
                        <button className="primary">Submit</button>
                    </div> : null}
            </>
        )
    }
}
