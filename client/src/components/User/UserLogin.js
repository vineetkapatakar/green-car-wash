import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import axios from 'axios';

const logIn = (e) => {
    e.preventDefault();
    let request = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    }
    axios.post('http://localhost:8080/api/users/login', request)
    .then(res => {
        const token = res.data.token;
        console.log('user', token);
        localStorage.setItem('jwtToken', token);
        if(token) {
          <Redirect push to='http://localhost:3000/api/users/home' />
        }
    }).catch(err => {
        console.log('err', err)
    })
}

const UserLogin = () => {
    return (
        <Form className="carwash-form">
            <h1 className="text-center">User Log In</h1>
            <FormGroup>
                <Label>Email</Label>
                <Input type="email" id = "email" placeholder="Enter your email" />
            </FormGroup>
            <FormGroup>
                <Label>Password</Label>
                <Input type="password" id="password" placeholder="Enter your password" />
            </FormGroup>
            <Button color="primary" className="btn-lg btn-block" onClick={(e) => logIn(e)}>
            Log In</Button>

            <div className="text-center pt-3">Or continue with your social account</div>
            <FacebookLoginButton className="mt-3 mb-3"/>
            <GoogleLoginButton className="mt-3 mb-3" />
            <div className="text-center">
                <a href="/api/users/signup">Sign Up</a>
                <span className="p-2">|</span>
                <a href="/api/users/forgotPassword">Forgot Password?</a>
            </div>
        </Form>
    );
}

export default UserLogin;