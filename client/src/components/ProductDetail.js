import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { Card, Button, Row, Col } from 'reactstrap';
import { MyContext } from '../App';
import LoadingSpinner from './LoadingSpinner';
import Navbar from './Navbar';

const ProductDetail = () => {
    const context = useContext(MyContext);
    const { _id } = useParams();
    const [loading, setloading] = useState(true);
    const [data, setdata] = useState([])
    const net = async () => {
        const res = await axios.get(`/lost/${_id}`)
        setdata(res.data.message);
        setloading(false);
    }
    console.log(data)
    useEffect(() => {
        net()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <Navbar />

            <div className='container-fluid '>

                {loading ? <LoadingSpinner /> : <Row>
                    <Col sm="2" className="py-3 " style={{ 'width': '23rem' }}>
                        <Card body className='w3-card-4'>
                            <img src={data.image} alt="..." />
                            <Button className={"btn my-2 mx-5 btn-success " + (context.cartItems.find((x) => x._id === data._id) ? "disabled" : "btn-success")} onClick={() => context.onAdd(data)}>Add to Cart</Button>
                        </Card>
                    </Col>
                    <Col sm="8" className="py-3 ">
                        <Card body className='w3-card-4'>
                            <h4>{data.product_name}</h4>
                            <h4>&#8377;{data.price}/<small>hr</small></h4>
                            <ul>
                                <li>{data.description}</li>
                                <li>{data.description1}</li>
                                <li>{data.list1}</li>
                                <li>{data.list2}</li>
                                <li>{data.list3}</li>
                            </ul>

                        </Card>
                    </Col>
                </Row>}

            </div>
        </>
    )
}

export default ProductDetail
