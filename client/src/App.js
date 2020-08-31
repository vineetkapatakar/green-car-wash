import React, { Component } from 'react';

import './App.css';
import { BrowserRouter, Route} from 'react-router-dom';

import Home from './components/Home/Home';
import User from './components/User/User';
import UserSignup from './components/User/UserSignup';
import UserForgotPassword from './components/User/UserForgotPassword';
import Washer from './components/Washer/Washer';
import WasherSignup from './components/Washer/WasherSignup';
import WasherForgotPassword from './components/Washer/WasherForgotPassword';
import Navbar from './components/Navbar/Navbar';

class App extends Component {

  render() {
   const styles = {
       
      minHeight: "100%",
      minWidth: "100%", 
      position: "fixed",
      backgroundSize: "cover",
      backgroundPosition: "center"
    }
    return (
      <BrowserRouter>
       <div style={styles}>
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route path="/api/users/login" component={User} />
        <Route path="/api/users/signup" component={UserSignup} />
        <Route path="/api/users/forgotPassword" component={UserForgotPassword} />
        <Route path="/api/washers/login" component={Washer} />
        <Route path="/api/washers/signup" component={WasherSignup} />
        <Route path="/api/washers/forgotPassword" component={WasherForgotPassword} />
       </div>
      </BrowserRouter>
    );
  }
}

export default App;
