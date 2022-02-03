
// import './App.css';
import React, { useEffect, useState, useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import HomePages from './components/HomePages';
import HomePage from './components/HomePage';
//import Navbar from './components/Navbar';
import CreaProduct from './components/CreaProduct';
import axios from 'axios';
import Cart from "./components/Cart";
import ProductDetail from './components/ProductDetail'
import ProductDetails from './components/ProductDetails'
import Register from './components/Register';
import Login from './components/Login'
import { initialState, reducer } from './components/reducer/reducer';
import About from './components/About'
import Logout from './components/Logout'
import MyOrder from './components/MyOrder';
import UserOrder from './components/UserOrder';
import AdminDashboard from './components/AdminDashboard';
import './App.css'
//import 'bootstrap/dist/css/bootstrap.min.css';

export const MyContext = React.createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const carts = JSON.parse(localStorage.getItem('cart') || "[]")
  const [data, setdata] = useState([]);
  const [cartItems, setCartItems] = useState(carts);

  const onAdd = (product) => {
    setCartItems([...cartItems, product])
  }

  //const url = `https://hackathon2-back.herokuapp.com/getProduct`;
  const url = `/getproduct`
  const userdata = async () => {
    try {
      const d = await axios.get(url);
      //console.log(d)
      setdata(d.data.message);

    } catch (err) {
      console.log(err, "errr");
    }
  }

  const onRemove = async (product) => {
    setCartItems(cartItems.filter((x) => x._id !== product._id))
  }
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])


  useEffect(() => {
    userdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>
    <Router>
      <MyContext.Provider value={{ userdata, onRemove, onAdd, data, cartItems, state, dispatch }}>
        {/* <Navbar /> */}
        <Route exact path='/' component={HomePages} />
        <Switch>
          <Route exact path='/' component={HomePages} />
          <Route path='/create' component={CreaProduct} />
          <Route path="/cart" component={Cart} />
          <Route path="/cat/:name" component={HomePage} />
          <Route path="/details/:_id" component={ProductDetail} />
          <Route path="/Register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/about" component={About} />
          <Route path='/logout' component={Logout} />
          <Route path='/my-order' component={MyOrder} />
          <Route path='/user/:_id' component={UserOrder} />
          <Route path='/dashboard' component={AdminDashboard} />
          <Route path="/product/:_id" component={ProductDetails} />
          <Redirect to="/" />
        </Switch>
      </MyContext.Provider>
    </Router>
  </>;
}

export default App;
