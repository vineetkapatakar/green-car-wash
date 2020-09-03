import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

const updatePassword = (e) => {
    e.preventDefault();
    let request = {
        passwordCurrent: document.getElementById('passwordCurrent').value,
        password: document.getElementById('password').value,
        passwordConfirm: document.getElementById('passwordConfirm').value
    }
    axios.post('http://localhost:8080/api/washers/updateWasherPassword', request)
    .then(res => {
        console.log('Washer Update password', res.data);
    }).catch(err => {
        console.log('err', err)
    })
}
const WasherUpdatePassword = () => {
    return(
        <Form className="carwash-form" onSubmit={(e) => updatePassword(e)}>
            <h1 className="text-center">Washer Update Password</h1>
            <FormGroup>
                <Label>Current Password</Label>
                <Input type="password" id="passwordCurrent" placeholder="Enter your current password" />
            </FormGroup>
            <FormGroup>
                <Label>Password</Label>
                <Input type="password" id="password" placeholder="Enter your password" />
            </FormGroup>
            <FormGroup>
                <Label>Password Confirm</Label>
                <Input type="password" id="passwordConfirm" placeholder="Please confrm your password" />
            </FormGroup>
            <Button className="btn-lg btn-dark btn-block">Update Password</Button>
        </Form>
    );
}

export default WasherUpdatePassword;