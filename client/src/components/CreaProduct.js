import React, { useState } from 'react';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';
import { Redirect } from 'react-router-dom';

const CreateNewProducts = () => {

    const [name, setcategory] = useState('');
    const [image, setimage] = useState('');
    const [product_name, setproductName] = useState('');
    const [price, setprice] = useState('');
    const [description, setdesc] = useState('');
    const [description1, setdesc1] = useState('');
    const [list1, setlist1] = useState('');
    const [list2, setlist2] = useState('')
    const [list3, setlist3] = useState('')

    const category = (e) => {
        setcategory(e.target.value)
    }

    const ImageFunc = (e) => {
        setimage(e.target.value)
    }

    const ProductNameFunc = (e) => {
        setproductName(e.target.value)
    }

    const PriceFunc = (e) => {
        setprice(e.target.value)
    }

    const DescFunc = (e) => {
        setdesc(e.target.value)
    }

    const DescFunc1 = (e) => {
        setdesc1(e.target.value)
    }

    const ProdList1 = (e) => {
        setlist1(e.target.value)
    }

    const ProdList2 = (e) => {
        setlist2(e.target.value)
    }

    const ProdList3 = (e) => {
        setlist3(e.target.value)
    }

    const createProduct = async (e) => {
        e.preventDefault();
        try {
            const url = `/product`;
            const res = await axios.post(url, { name, image, product_name, price, description, description1, list1, list2, list3 });
            toast(res.data)
        } catch (error) {
            toast(error.response.data)
        }
    }

    const token = JSON.parse(localStorage.getItem('user'))



    if (token === null) {
        return <Redirect to="/" />
    } else if (token.role === 'admin') {

        return (
            <>
                <Navbar />

                <form className='reg_page container'>
                    <h2 className='text-center'>Create Products</h2>
                    <hr />
                    <div className="mb-4">
                        <label htmlFor="exampleInputEmail1" className="form-label">Select Category</label>
                        <select name="priority" id="priority" className="form-select" aria-label="Default select example" onChange={category}>
                            <option selected disabled>Select Category</option>
                            <option value="Car">Car</option>
                            <option value="Camera">Camera</option>
                            <option value="Tripod">Tripod</option>
                            <option value="Baby Light">Baby Light</option>
                            <option value="BestView">BestView</option>
                            <option value="Benro Monopod">Benro Monopod</option>
                            <option value="Backdrop Stand">Backdrop Stand</option>
                            <option value="Atomos Showgun">Atomos Showgun</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="exampleInputEmail1" className="form-label">Enter Image Link</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter Image Link' onChange={ImageFunc} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="exampleInputEmail1" className="form-label">Product Name</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter Product Name' onChange={ProductNameFunc} />

                    </div>
                    <div className="mb-4">
                        <label htmlFor="exampleInputEmail1" className="form-label">Price</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter Price' onChange={PriceFunc} />

                    </div>
                    <div className="mb-4">
                        <label htmlFor="exampleInputEmail1" className="form-label">Description</label>
                        <textarea rows="4" cols="50" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter Product Description' onChange={DescFunc} />

                    </div>
                    <div className="mb-4">
                        <label htmlFor="exampleInputEmail1" className="form-label">Description</label>
                        <textarea rows="4" cols="50" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter Product Description' onChange={DescFunc1} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="exampleInputEmail1" className="form-label">List</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter Product List' onChange={ProdList1} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="exampleInputEmail1" className="form-label">List</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter Product List' onChange={ProdList2} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="exampleInputEmail1" className="form-label">List</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter Product List' onChange={ProdList3} />
                    </div>
                    <button onClick={createProduct} className="btn btn-primary createButton">Submit</button>
                    <ToastContainer />
                </form>
            </>
        )

    } else {
        return <Redirect to="/" />
    }
}

export default CreateNewProducts;
