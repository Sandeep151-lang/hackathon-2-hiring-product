import React, { useEffect, useState } from 'react'
import { Card, Row, Col } from 'reactstrap';
//import { useHistory } from "react-router-dom";
//import { MyContext } from '../App';
//import Pagination from "react-js-pagination";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
// import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';
import Navbar from './Navbar';

const HomePage = () => {
    const history = useHistory();
    const { name } = useParams();
    const [loading, setloading] = useState(true);
    const [dat, setdat] = useState([])
    const [search, setsearch] = useState(name)

    const data = async () => {
        const res = await axios.get(`/getProducts/?keyword=${search}`)
        setdat(res.data.products)
        setloading(false);
        //console.log(res)
    }

    const net = async (e) => {
        console.log(e)
        history.push(`/details/${e._id}`)
    }
    //const context = useContext(MyContext);

    useEffect(() => {
        data()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div className='' style={{ 'position': 'relative' }}>
            <Navbar />
            <Row>
                <Col sm='2' className='m-4 w3-card-4'>
                    <input type="text" class="form-control" placeholder='search' id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => { setsearch(e.target.value) }} onKeyPress={(e) => e.key === 'Enter' ? data() : null} />
                </Col>
                {loading ? <LoadingSpinner /> : <>
                    {dat.map((product, key) => {
                        const { image, product_name, price } = product
                        return (
                            <Col sm="2" key={key} className="py-3 container-fluid" xs={3}>
                                <Card body onClick={(e) => { net(product) }} className='category'>
                                    <img src={image} className="card-img-top" alt="..." style={{ 'objectFit': 'scale-down' }} />
                                    <h6 className="text-center bold">{product_name}</h6>
                                    <h4 className="text-center bold">&#8377;{price}/<small>hr</small></h4>
                                </Card>
                            </Col>
                        )
                    })}
                </>
                }
            </Row>
        </div>
    )
}

export default HomePage
