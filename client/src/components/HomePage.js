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
     const [category, setcategory] = useState([]);

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
 const categories = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/getProduct`)
            setcategory(res.data.message)
            setloading(false);

        } catch (err) {
            console.log(err.response)
        }

        //console.log(res)
    }

  
    useEffect(() => {
        data()
        categories()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])


    return (
        <div className='' style={{ 'position': 'relative' }}>
            <Navbar />
            <Row>
                <Col sm='2' className='m-4 w3-card-4' style={{ 'height': '100%' }}>
                    <input type="text" className="form-control mt-3" placeholder='search' id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => { setsearch(e.target.value) }} onKeyPress={(e) => e.key === 'Enter' ? data() : null} />
                    <ul>
                        {
                            category.map((item, key) => {
                                return <>
                                    {/* <button onClick={(e) => setsearch(item.name)} value={item.name} type="text" className="form-control mt-3" >{item.name}</button> */}
                                    <li onClick={(e) => setsearch(item.name)} value={item.name} type="text" className="list-category mt-3" >{item.name}</li>
                                </>
                            })
                        }
                    </ul>
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
