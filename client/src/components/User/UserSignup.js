import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const UserSignup = () => {
    return(
        <Form className="carwash-form">
            <h1 className="text-center">User Sign Up</h1>
            <FormGroup>
                <Label>Name</Label>
                <Input type="text" placeholder="Enter your name" />
            </FormGroup>
            <FormGroup>
                <Label>Email</Label>
                <Input type="email" placeholder="Enter your email" />
            </FormGroup>
            <FormGroup>
                <Label>Mobile Number</Label>
                <Input type="number" placeholder="Enter your mobile number" />
            </FormGroup>
            <FormGroup>
                <Label>Password</Label>
                <Input type="password" placeholder="Enter your password" />
            </FormGroup>
            <FormGroup>
                <Label>Confirm Password</Label>
                <Input type="password" placeholder="Please confirm your password" />
            </FormGroup>
            <Button className="btn-lg btn-dark btn-block">Sign Up</Button>
        </Form>
    );
}

export default UserSignup;