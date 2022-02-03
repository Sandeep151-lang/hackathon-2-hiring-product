import React, { useState } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';

import { Redirect } from 'react-router-dom';

const CreaProduct = () => {
    const [buy, setbuy] = useState({
        name: '',
        image: '',
        product_name: '',
        price: '',
        description: '',
        description1: '',
        list1: '',
        list2: '',
        list3: ''
    })

    const buyProduct = (e) => {
        const name = e.target.id;
        setbuy({ ...buy, [name]: e.target.value });
    }


    const buy_Product = async (e) => {
        // e.preventDefault();
        try {
            const url = `/product`;
            const d = await axios.post(url, buy);
            if (d.status === 201) {
                setbuy(d.data)
                toast('product created')
            } else {
                toast('product not created')
            }
        } catch {
            toast('product not created')
        }
    }

    const token = JSON.parse(localStorage.getItem('user'))

    if (token === null) {
        return <Redirect to="/" />
    } else if (token.role === 'admin') {

        return (
            <>
                <Navbar />
                <div className="container">

                    <h2>Create Product</h2>
                    <Form inline>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0 ">
                            <Label for="examplePassword" className="mr-sm-2">product Name</Label>
                            <Input type="text" id="name" placeholder='category name' value={buy.name} onChange={buyProduct} />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="examplePassword" className="mr-sm-2">product image</Label>
                            <Input type="text" id="image" placeholder="Enter image link" value={buy.image} onChange={buyProduct} />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="exampleEmail" className="mr-sm-2">Product_Name</Label>
                            <Input type="text" id="product_name" placeholder="product name" value={buy.product_name} onChange={buyProduct} />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="exampleEmail" className="mr-sm-2">Price</Label>
                            <Input type="text" id="price" placeholder="price" value={buy.price} onChange={buyProduct} />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="exampleEmail" className="mr-sm-2">Product description</Label>
                            <Input type="text" id="description" placeholder="product description" value={buy.description} onChange={buyProduct} />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="exampleEmail" className="mr-sm-2">Product description</Label>
                            <Input type="text" id="description1" placeholder="product description" value={buy.description1} onChange={buyProduct} />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="exampleEmail" className="mr-sm-2">Product List</Label>
                            <Input type="text" id="list1" placeholder="List" value={buy.list1} onChange={buyProduct} />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="exampleEmail" className="mr-sm-2">Product List</Label>
                            <Input type="text" id="list2" placeholder="List" value={buy.list2} onChange={buyProduct} />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="exampleEmail" className="mr-sm-2">Product List</Label>
                            <Input type="text" id="list3" placeholder="List" value={buy.list3} onChange={buyProduct} />
                        </FormGroup>
                        <Button className='btn my-2  btn-success' onClick={buy_Product}>Create</Button>
                        <ToastContainer />
                    </Form >
                </div>
            </>
        )

    } else {
        return <Redirect to="/" />
    }

}

export default CreaProduct
