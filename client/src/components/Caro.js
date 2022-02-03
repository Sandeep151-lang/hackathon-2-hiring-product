import React from 'react'


const Caro = () => {
    return (
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="https://cdn11.bigcommerce.com/s-1zvaiaywbz/images/stencil/original/carousel/807/banner7IV.jpg?c=2" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="https://camerabazar.net/wp-content/uploads/2021/01/1-1.png" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="https://cdn.pixabay.com/photo/2017/03/13/17/26/ecommerce-2140603_960_720.jpg" className="d-block w-100" alt="..." />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}

export default Caro

