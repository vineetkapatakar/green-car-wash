import React, { Component } from 'react';

import './App.css';
import { BrowserRouter, Route} from 'react-router-dom';

import Home from './components/Home/Home';
import UserLogin from './components/User/UserLogin';
import UserSignup from './components/User/UserSignup';
import UserHome from './components/User/UserHome';
import UserForgotPassword from './components/User/UserForgotPassword';
import WasherLogin from './components/Washer/WasherLogin';
import WasherSignup from './components/Washer/WasherSignup';
import WasherHome from './components/Washer/WasherHome';
import WasherForgotPassword from './components/Washer/WasherForgotPassword';
import Navbar from './components/Navbar/Navbar';
import CarWashBooking from './components/Booking/Booking';
import Payment from './components/Payment/Payment';
import Receipt from './components/Receipt/Receipt';

class App extends Component {

  render() {
   const styles = {
      backgroundImage: "url('/images/carwash.png')",
      minHeight: "100%",
      minWidth: "100%", 
      position: "fixed",
      backgroundSize: "cover",
      backgroundPosition: "center"
    } 
    
    return (
      <BrowserRouter>
       <div style={styles} className="scroll">
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route path="/api/users/login" component={ UserLogin } />
        <Route path="/api/users/signup" component={ UserSignup } />
        <Route path="/api/users/home" component={ UserHome } />
        <Route path="/api/users/forgotPassword" component={ UserForgotPassword } />
        <Route path="/api/washers/login" component={ WasherLogin } />
        <Route path="/api/washers/signup" component={ WasherSignup } />
        <Route path="/api/washers/home" component={ WasherHome } />
        <Route path="/api/washers/forgotPassword" component={ WasherForgotPassword } />
        <Route path="/api/bookings/carwashBooking" component={ CarWashBooking } />
        <Route path="/api/bookings/payment" component={ Payment } />
        <Route path="/api/receipt/receiptGenerator" component={ Receipt } />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
