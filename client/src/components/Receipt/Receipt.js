import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';

const generate = (e) => {
    e.preventDefault();
    let request = {
        receiptNum: document.getElementById('receiptNum').value,
        services: document.getElementById('service').value,
        washerId: document.getElementById('washerId').value,
        amount: document.getElementById('amount').value,
        userName: document.getElementById('username').value,
        contactNumber: document.getElementById('contactNum').value,
        date: document.getElementById('date').value,
        image: document.getElementById('image').value
    }
    axios.post('http://localhost:8080/api/receipt/receiptGenerator', request)
    .then(res => {
        console.log('receipt', res.data);
    }).catch(err => {
        console.log('err', err)
    })
}

const Receipt = () => {
    return (
        <Form className="carwash-form">
        <h1 className="text-center">Receipt Generator</h1>
        <FormGroup>
            <Label>Receipt Number</Label>
            <Input type="number" id = "receiptNum" placeholder="Enter receipt number" />
        </FormGroup>
        <FormGroup>
            <Label>Services</Label>
            <Input type="select" name="select" id="service">
                <option>Car Wash</option>
                <option>Car Polishing</option>
                <option>Car Painting</option>
            </Input>
        </FormGroup>
        <FormGroup>
            <Label>Washer Id</Label>
            <Input type="number" id="washerId" placeholder="Enter washer id" />
        </FormGroup>
        <FormGroup>
            <Label>Amount</Label>
            <Input type="number" id="amount" placeholder="Enter amount" />
        </FormGroup>
        <FormGroup>
            <Label>User Name</Label>
            <Input type="text" id="username" placeholder="Enter user name" />
        </FormGroup>
        <FormGroup>
            <Label>Contact Number</Label>
            <Input type="number" id="contactNum" placeholder="Enter user contact number"/>
        </FormGroup>
        <FormGroup>
            <Label>Date</Label>
            <Input type="date" id="date"/>
        </FormGroup>
        <FormGroup>
            <Label>Image</Label>
            <Input type="file" id="image"/>
            <FormText color="muted">
             Upload User's car image.
          </FormText>
        </FormGroup>
        <Button color="primary" className="btn-lg btn-block" onClick={(e) => generate(e)}>Generate Receipt</Button>
    </Form>
    )
}

export default Receipt;