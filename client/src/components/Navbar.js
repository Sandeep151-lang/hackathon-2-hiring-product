import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../App';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {

    const context = useContext(MyContext);
    //console.log(context)
    const { state, dispatch } = context;
    const [loading, setloading] = useState(true);
    const [data, setdata] = useState([]);
    const userdata = async () => {
        // const token = window.localStorage.getItem('jwt')
        try {
            const res = await axios.create({
                // baseURL: "http://localhost:5000",
                withCredentials: true,
                credentials: "include",
            }).get('/about')
            //console.log(res.data.message)
            if (res.status === 200) {
                dispatch({ type: 'USER', payload: true })
                localStorage.getItem('jwt');
                setloading(false);
                setdata(res.data.message);
            }
        } catch (err) {
            setloading(loading);
        }
    }

    useEffect(() => {
        userdata()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const token = JSON.parse(localStorage.getItem('user'))
    if (token === null) {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light container-fluid  w3-card-4">
                <div className="container-fluid">

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <NavLink className="navbar-brand" to='/'>Home</NavLink>

                        </ul>
                        <span className="navbar-text">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink className='nav-link' to="/login">Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className='nav-link ' to="/register">Register</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/cart"><i className="nav-link far fa-2x fa-shopping-cart"><span className='cart text-bolder' style={{ 'position': 'relative', 'bottom': '25px', 'right': '15px', 'zIndex': '1', 'color': 'red', 'fontSize': '70%', 'fontWeight': 'bolder' }}>{context.cartItems.length}</span></i></NavLink>
                                </li>
                            </ul>

                        </span>
                    </div>
                </div>
            </nav>
        )
    } else if (token.role === 'user') {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light w3-card-4">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <NavLink className="navbar-brand" to='/'>Home</NavLink>

                        </ul>
                        <span className="navbar-text">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink className='nav-link' to="/about">About</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className='nav-link' to="/my-order">My-Order</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className='nav-link' to="/logout">Logout</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/cart"><i className="nav-link far fa-2x fa-shopping-cart">
                                        <span className='cart'
                                            style={{ 'position': 'relative', 'bottom': '25px', 'right': '15px', 'zIndex': '1', 'color': 'red', 'fontSize': '70%', 'fontWeight': 'bolder' }}>{context.cartItems.length}</span>
                                    </i></NavLink>
                                </li>
                            </ul>

                        </span>
                    </div>

                </div>
            </nav>
        )
    } else if (token.role === 'admin') {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light w3-card-4">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <NavLink className="navbar-brand" to='/'>Home</NavLink>

                        </ul>
                        <span className="navbar-text">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink className='nav-link' to="/about">About</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className='nav-link' to="/my-order">My-Order</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className='nav-link' to="/create">Create-product</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className='nav-link' to="/dashboard">Admin-Dashboard</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className='nav-link' to="/user">User-List</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className='nav-link' to="/logout">Logout</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/cart"><i className="nav-link far fa-2x fa-shopping-cart">
                                        <span className='cart'
                                            style={{ 'position': 'relative', 'bottom': '25px', 'right': '15px', 'zIndex': '1', 'color': 'red', 'fontSize': '70%', 'fontWeight': 'bolder' }}>{context.cartItems.length}</span>
                                    </i></NavLink>
                                </li>
                            </ul>

                        </span>
                    </div>

                </div>
            </nav>
        )
    } else {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light container-fluid  w3-card-4">
                <div className="container-fluid">

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <NavLink className="navbar-brand" to='/'>Home</NavLink>

                        </ul>
                        <span className="navbar-text">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink className='nav-link' to="/login">Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className='nav-link ' to="/register">Register</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/cart"><i className="nav-link far fa-2x fa-shopping-cart"><span className='cart text-bolder' style={{ 'position': 'relative', 'bottom': '25px', 'right': '15px', 'zIndex': '1', 'color': 'red', 'fontSize': '70%', 'fontWeight': 'bolder' }}>{context.cartItems.length}</span></i></NavLink>
                                </li>
                            </ul>
                        </span>
                    </div>
                </div>
            </nav>
        )
    }
}
//     if (state && data.role === 'admin') {
//         return (
//             <nav className="navbar navbar-expand-lg navbar-light bg-light w3-card-4">
//                 <div className="container-fluid">
//                     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
//                         <span className="navbar-toggler-icon"></span>
//                     </button>
//                     <div className="collapse navbar-collapse" id="navbarText">
//                         <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                             <NavLink className="navbar-brand" to='/'>Home</NavLink>

//                         </ul>
//                         <span className="navbar-text">
//                             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                                 <li className="nav-item">
//                                     <NavLink className='nav-link' to="/about">About</NavLink>
//                                 </li>
//                                 <li className="nav-item">
//                                     <NavLink className='nav-link' to="/my-order">My-Order</NavLink>
//                                 </li>
//                                 <li className="nav-item">
//                                     <NavLink className='nav-link' to="/create">create-product</NavLink>
//                                 </li>
//                                 <li className="nav-item">
//                                     <NavLink className='nav-link' to="/logout">Logout</NavLink>
//                                 </li>
//                                 <li className="nav-item">
//                                     <NavLink to="/cart"><i className="nav-link far fa-2x fa-shopping-cart">
//                                         <span className='cart'
//                                             style={{ 'position': 'relative', 'bottom': '25px', 'right': '15px', 'zIndex': '1', 'color': 'red', 'fontSize': '70%', 'fontWeight': 'bolder' }}>{context.cartItems.length}</span>
//                                     </i></NavLink>
//                                 </li>
//                             </ul>

//                         </span>
//                     </div>

//                 </div>
//             </nav>
//         )
//     } else if (state && data.role === 'user') {
//         return (
//             <nav className="navbar navbar-expand-lg navbar-light bg-light w3-card-4">
//                 <div className="container-fluid">
//                     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
//                         <span className="navbar-toggler-icon"></span>
//                     </button>
//                     <div className="collapse navbar-collapse" id="navbarText">
//                         <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                             <NavLink className="navbar-brand" to='/'>Home</NavLink>

//                         </ul>
//                         <span className="navbar-text">
//                             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                                 <li className="nav-item">
//                                     <NavLink className='nav-link' to="/about">About</NavLink>
//                                 </li>
//                                 <li className="nav-item">
//                                     <NavLink className='nav-link' to="/my-order">My-Order</NavLink>
//                                 </li>
//                                 <li className="nav-item">
//                                     <NavLink className='nav-link' to="/logout">Logout</NavLink>
//                                 </li>
//                                 <li className="nav-item">
//                                     <NavLink to="/cart"><i className="nav-link far fa-2x fa-shopping-cart">
//                                         <span className='cart'
//                                             style={{ 'position': 'relative', 'bottom': '25px', 'right': '15px', 'zIndex': '1', 'color': 'red', 'fontSize': '70%', 'fontWeight': 'bolder' }}>{context.cartItems.length}</span>
//                                     </i></NavLink>
//                                 </li>
//                             </ul>

//                         </span>
//                     </div>

//                 </div>
//             </nav>
//         )
//     }
//     else {
//         return (
//             <nav className="navbar navbar-expand-lg navbar-light bg-light container-fluid  w3-card-4">
//                 <div className="container-fluid">

//                     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
//                         <span className="navbar-toggler-icon"></span>
//                     </button>
//                     <div className="collapse navbar-collapse" id="navbarText">
//                         <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                             <NavLink className="navbar-brand" to='/'>Home</NavLink>

//                         </ul>
//                         <span className="navbar-text">
//                             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                                 <li className="nav-item">
//                                     <NavLink className='nav-link' to="/login">Login</NavLink>
//                                 </li>
//                                 <li className="nav-item">
//                                     <NavLink className='nav-link ' to="/register">Register</NavLink>
//                                 </li>
//                                 <li className="nav-item">
//                                     <NavLink to="/cart"><i className="nav-link far fa-2x fa-shopping-cart"><span className='cart text-bolder' style={{ 'position': 'relative', 'bottom': '25px', 'right': '15px', 'zIndex': '1', 'color': 'red', 'fontSize': '70%', 'fontWeight': 'bolder' }}>{context.cartItems.length}</span></i></NavLink>
//                                 </li>
//                             </ul>

//                         </span>
//                     </div>
//                 </div>
//             </nav>
//         )
//     }
// }

export default Navbar
