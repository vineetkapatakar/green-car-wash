import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

const signUp = (e) => {
    e.preventDefault();
    let request = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        contactNumber: document.getElementById('mobileNum').value,
        password: document.getElementById('password').value,
        passwordConfirm: document.getElementById('passwordConfirm').value
    }
    console.log('request', request)
    axios.post('http://localhost:8080/api/washers/signup', request)
    .then(res => {
        console.log('washerSignup', res.data);
    }).catch(err => {
        console.log('err', err)
    })
}

const WasherSignup = () => {
    return(
        <Form className="carwash-form" onSubmit={(e) => signUp(e)}>
            <h1 className="text-center">Washer Sign Up</h1>
            <FormGroup>
                <Label>Name</Label>
                <Input type="text" id="name" placeholder="Enter your name" />
            </FormGroup>
            <FormGroup>
                <Label>Email</Label>
                <Input type="email" id="email" placeholder="Enter your email" />
            </FormGroup>
            <FormGroup>
                <Label>Mobile Number</Label>
                <Input type="number" id="mobileNum" placeholder="Enter your mobile number" />
            </FormGroup>
            <FormGroup>
                <Label>Password</Label>
                <Input type="password" id="password" placeholder="Enter your password" />
            </FormGroup>
            <FormGroup>
                <Label>Confirm Password</Label>
                <Input type="password" id="passwordConfirm" placeholder="Please confirm your password" />
            </FormGroup>
            <Button className="btn-lg btn-dark btn-block">Sign Up</Button>
        </Form>
    );
}

export default WasherSignup;