import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Navbar from './Navbar';
import Select from 'react-select'

const UserDetails = () => {
    const [user, setuser] = useState([]);
    const [pageNumbers, setPageNumber] = useState(0);
    const [numberofPages, setnumberofPages] = useState(0)
    const pages = new Array(pageNumbers + 1).fill(null).map((v, i) => i)

    const gotoPrevious = () => {
        setPageNumber(Math.max(0, pageNumbers - 1));
    };

    const gotoNext = () => {
        setPageNumber(Math.min(numberofPages - 1, pageNumbers + 1));
    };
    const userdata = async () => {
        try {
            const res = await axios.get(`/user?page=${pageNumbers}`);

            setuser(res.data.item)
            setnumberofPages(res.data.totalPages);
        } catch (error) {
            console.log('error')
        }
    }
    const options = [
        { value: 'admin', label: 'admin' },
        { value: 'user', label: 'user' }
    ]

    const onChangeInput = async (value, item) => {

        try {
            await axios.put('/userUpdate', { value, item })
            userdata()

        } catch (error) {
            console.log(error)
        }

    }


    useEffect(() => {
        userdata()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumbers])
    return (
        <>
            <Navbar />
            <div className='container mt-1'>
                <h1 className='text-center'>User List</h1>

                <table className="table caption-top">
                    <caption>List of Orders</caption>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Change-Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            user.map((item, key) => {
                                return <>
                                    <tr key={key}>
                                        <th scope="row">{key + 1}</th>
                                        <td>{item._id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.role}</td>
                                        <td> <Select options={options} onChange={(e) => onChangeInput(e.value, item._id)} styles={{ 'width': '20px' }} placeholder='Role' /></td>
                                    </tr>
                                </>
                            })
                        }
                    </tbody>
                </table>

                <div className='pagination'>

                    <button onClick={gotoPrevious} className='prv-button btn-primary btn'>Previous</button>
                    {pages.map((index, key) => (

                        <button key={key} onClick={() => setPageNumber(index)} className='btn-button btn-success btn mx-2'>{index + 1}</button>
                    ))}
                    <button onClick={gotoNext} className=' btn-primary btn'>Next</button>
                </div>
            </div>

        </>
    )
}

export default UserDetails
