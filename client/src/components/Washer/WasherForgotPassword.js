import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

const forgotPassword = (e) => {
    e.preventDefault();
    let request = {
        email: document.getElementById('email').value
    }
    axios.post('http://localhost:8080/api/washers/forgotPassword', request)
    .then(res => {
        console.log('Forgot Password', res.data);
    }).catch(err => {
        console.log('err', err)
    })
}

const WasherForgotPassword = () => {
    return(
        <Form className="carwash-form" onSubmit={(e) => forgotPassword(e)}>
            <h1 className="text-center">Forgot Password?</h1>
            <Label>Enter your washer account's verified email address and we will send you a password reset link.</Label>
            <FormGroup>
                <Label>Email</Label>
                <Input type="email" id="email" placeholder="Enter your email" />
            </FormGroup>
            <Button color="success" className="btn-lg btn-block">Send Password Reset Email</Button>
        </Form>
    );
};

export default WasherForgotPassword;