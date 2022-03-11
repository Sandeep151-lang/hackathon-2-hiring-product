import React, { useContext, useState, useEffect } from 'react'
import { MyContext } from '../App';
import { Button, Row, Col } from 'reactstrap';
import Stripe from './Stripe';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';


const { RangePicker } = DatePicker;
const Cart = () => {
    const [data, setdata] = useState([]);
    const [starttime, setstarttime] = useState(null)
    const [endtime, setendtime] = useState(null)
    const [Total, setTotal] = useState(null)


    const handleSelect = (date) => {

        if (date == null) {
            toast('select date')
        } else {
            if (date[0] < Date.now()) {
                toast(`select date after ${moment(Date.now()).format('DD-MMM-yyyy')}`)
            } else {
                setstarttime(moment(date[0]).format('DD-MMM-yyyy , HH:mm A'))
                setendtime(moment(date[1]).format('DD-MMM-yyyy,  HH:mm A'))
                setTotal(date[1].diff(date[0], 'hours'))
            }
        }
    }

    const startvalue = new Date()
    const userdata = async () => {
        // const token = window.localStorage.getItem('jwt')
        try {
            const res = await axios.create({
                // baseURL: "http://localhost:5000",
                withCredentials: true,
                credentials: "include",
            }).get('/about')
            // console.log(res.data.message)
            if (res.status === 200) {
                localStorage.getItem('jwt');
                setdata(res.data.message);
                // console.log(res.data)
            }
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        userdata()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const context = useContext(MyContext);
    //console.log(context.cartItems)
    // console.log({ message: context.cartItems });
    const p = { message: context.cartItems };
    const ar = p.message.map((product) => product.price);
    if (ar.length > 0) {
        var price = ar.reduce((a, c) => a + c);
        //console.log(`price is ${price}`);
    } else {
        var c = 0;
        console.log(c)
    }
    const T = Total;
    const Price = T * price
    if (ar.length > 0) {
        return <>
            <div>
                <Navbar />
                <div className="container mt-5">
                    <Row >
                        <Col xs="4">
                            {
                                context.cartItems.map((product, key) => {
                                    //destructuring the products
                                    const { image, price, product_name } = product;
                                    return (
                                        <div className="card mb-3" style={{ 'max-width': '600px' }} key={key}>
                                            <div className="row g-0">
                                                <div className="col-md-4">
                                                    <img src={image} className="img-fluid rounded-start" alt="..." style={{ 'height': '200px' }} />
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="card-body">
                                                        <h5 className="card-title" style={{ 'overflow': 'hidden', 'whiteSpace': 'nowrap', 'textOverflow': 'ellipsis' }}>{product_name}</h5>

                                                        <p className="card-text"><small className="text-muted">&#8377;{price}/hr</small></p>
                                                        <p className="card-text">  <Button className="btn btn-success" onClick={() => context.onRemove(product)}>Remove from Cart</Button></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </Col>
                        <Col xs="4">
                            <h5>Select Date :</h5>
                            <RangePicker startDate={startvalue} showTime={{ format: 'HH:mm' }} format="DD-MMM-yyyy HH:mm" defaultValue={moment()} onChange={(e) => handleSelect(e)} />
                            <ToastContainer />
                        </Col>
                        {starttime !== null ? <Col xs="4">
                            <h3 className='mt-5'>Rent Price :<small className="text-muted">{price}&#8377;/hr</small></h3>
                            <hr />
                            <p> <span style={{ 'fontSize': '20px' }}>StartTime : </span> <strong>{starttime}</strong></p>
                            <p>EndTime : <strong>{endtime}</strong></p>
                            <p>Total Hours : <strong>{Total}</strong></p>
                            <p>Total  <strong>({ar.length} item)</strong></p>
                            <hr />
                            <h3 className='mt-5'>Total Amount : <span style={{ 'color': 'red' }}><small style={{ 'color': 'red' }}>{Price}/-&#8377;</small></span></h3>
                            <hr />
                            <Stripe total={Price}
                                name={data.name}
                                email={data.email}
                                cart={context.cartItems}
                                id={data._id}
                                starttime={starttime}
                                endtime={endtime}
                                Total={Total}
                            />
                        </Col> : null}
                    </Row>
                </div>
            </div>
        </>
    } else {
        return (
            <div>
                <Navbar />
                <NavLink to='/'><h1 style={{ 'position': 'absolute', 'top': '50%', 'left': '50%', 'transform': 'translate(-50%,-262%)', 'color': 'black', 'fontSize': '29.5px' }}>Shop Now</h1></NavLink>
                <NavLink to='/'><i className="fas fa-shopping-cart" style={{ 'fontSize': '100px', 'position': 'absolute', 'top': '50%', 'left': '50%', 'transform': 'translate(-50%,-50%)', 'color': '#ff2f00d6' }}></i></NavLink>
            </div>
        )
    }
}


export default Cart
