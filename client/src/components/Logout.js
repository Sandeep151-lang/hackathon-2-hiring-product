import React, { useEffect, useContext } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'
import { MyContext } from '../App'
import LoadingSpinners from './LoadingSpinner'

const Logout = () => {
    const { dispatch } = useContext(MyContext)
    const history = useHistory();
    useEffect(() => {
        axios.create({
            // baseURL: "http://localhost:5000",
            withCredentials: true,
            credentials: "include",
        }).get('/logout').then((res) => {
            localStorage.removeItem("user");
            dispatch({ type: 'USER', payload: false })
            history.push('/login', { replace: true })
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch({ type: 'USER', payload: false })])
    return (
        <div>
            <LoadingSpinners />
        </div>
    )
}

export default Logout