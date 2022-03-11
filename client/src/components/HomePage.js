import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Container } from 'reactstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import LoadingSpinner from './LoadingSpinner';
import Navbar from './Navbar';
import Footer from './Footer';
import FooterComponent from './FooterComponent';

const HomePage = () => {
    const history = useHistory();
    const { name } = useParams();
    const [loading, setloading] = useState(true);
    const [dat, setdat] = useState([])
    const [search, setsearch] = useState(name)
    const [category, setcategory] = useState([]);



    const data = async () => {
        try {
            const res = await axios.get(`/getProducts/?keyword=${search}`)
            setdat(res.data.products)
            setloading(false);
        } catch (err) {
            console.log(err.response.data)
        }

        //console.log(res)
    }

    const net = async (e) => {

        history.push(`/details/${e._id}`)
    }
    //const context = useContext(MyContext);

    const categories = async () => {
        try {
            const res = await axios.get(`/getProduct`)
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


    return <>

        <Navbar />

        <div className='w3-card-4 container-fluid mt-1'>
            {
                category.map((item, key) => {
                    return <>
                        {/* <button onClick={(e) => setsearch(item.name)} value={item.name} type="text" className="form-control mt-3" >{item.name}</button> */}
                        <span key={key} onClick={(e) => setsearch(item.name)} value={item.name} type="text" className="list-category mt-3 mx-4 p-2" >{item.name}</span>
                    </>
                })
            }
        </div>
        <Container>
            <input type="text" className=" mt-3" placeholder='search' id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => { setsearch(e.target.value) }} onKeyPress={(e) => e.key === 'Enter' ? data() : null} />
        </Container>
        <div className='container mt-3 mb-5 card-category'>
            {loading ? <LoadingSpinner /> : <Row>
                {
                    dat.map((product, key) => {
                        const { image, product_name, price } = product
                        //destructuring the products 
                        return (
                            <Col sm="3" key={key} className="py-3 category">
                                <Card body onClick={(e) => { net(product) }} style={{ 'height': '15rem' }} >
                                    <img src={image} className="card-img-top" alt="..." height='100px' width='50px' />
                                    <div className="card-body">
                                        <p className="card-text" style={{ 'overflow': 'hidden', 'whiteSpace': 'nowrap', 'textOverflow': 'ellipsis' }}>{product_name}</p>
                                        <small className="card-text" style={{ 'fontWeight': 'bold' }}>&#8377;{price}/hr</small>
                                    </div>
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
            }
        </div >
        <FooterComponent />
        <Footer />

    </>
}

export default HomePage
