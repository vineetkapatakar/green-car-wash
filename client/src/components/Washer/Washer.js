import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';

const washer = () => {
    return(
        <Form className="carwash-form">
            <h1 className="text-center">Washer Log In</h1>
            <FormGroup>
                <Label>Email</Label>
                <Input type="email" placeholder="Enter your email" />
            </FormGroup>
            <FormGroup>
                <Label>Password</Label>
                <Input type="password" placeholder="Enter your password" />
            </FormGroup>
            <Button color="primary" className="btn-lg btn-block">Log In</Button>
            <div className="text-center pt-3">Or continue with your social account</div>
            <FacebookLoginButton className="mt-3 mb-3" />
            <GoogleLoginButton className="mt-3 mb-3" />
            <div className="text-center">
                <a href="/api/washers/signup">Sign Up</a>
                <span className="p-2">|</span>
                <a href="/api/washers/forgotPassword">Forgot Password?</a>
            </div>
        </Form>
    );
}

export default washer;