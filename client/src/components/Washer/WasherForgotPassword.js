import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const WasherForgotPassword = () => {
    return(
        <Form className="carwash-form">
            <h1 className="text-center">Forgot Password?</h1>
            <Label>Enter your washer account's verified email address and we will send you a password reset link.</Label>
            <FormGroup>
                <Label>Email</Label>
                <Input type="email" placeholder="Enter your email" />
            </FormGroup>
            <Button color="success" className="btn-lg btn-block">Send Password Reset Email</Button>
        </Form>
    );
};

export default WasherForgotPassword;