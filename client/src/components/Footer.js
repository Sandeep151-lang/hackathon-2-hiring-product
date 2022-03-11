import React from 'react'


const Footer = () => {
    return (
        <div className='container-fluid d-flex justify-content-evenly text-white' style={{ 'backgroundColor': 'black' }}>
            <div>
                <p className='mt-5'>Contact No : <span>8738854495</span></p>
                <p>Email: sandeepnandawar92@gmail.com</p>
            </div>
            <div>
                <p className='mt-3 mx-5'>Address : Nagpur</p>
                <p className='mx-5'>Email: hiringKart@gmail.com</p>
                <p className='mx-5'>&#169; 2022  hiringKart.com</p>
            </div>
        </div>
    )
}

export default Footer
