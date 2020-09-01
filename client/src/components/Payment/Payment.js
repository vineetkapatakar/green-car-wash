import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

const pay = (e) => {
    e.preventDefault();
    let request = {
        cardNumber: document.getElementById('cardNumber').value,
        expireDate: document.getElementById('expireDate').value,
        cvvNumber: document.getElementById('cvv').value,
        nameOnCard: document.getElementById('name').value,
        amount: document.getElementById('amount').value
    }
    axios.post('http://localhost:8080/api/bookings/payment', request)
    .then(res => {
        console.log('payment', res.data);
    }).catch(err => {
        console.log('err', err)
    })
}

const Payment = () => {
    return (
        <Form className="carwash-form">
        <h1 className="text-center">Payment Page</h1>
        <FormGroup>
            <Label>Card Number</Label>
            <Input type="number" id = "cardNumber" placeholder="Enter your card number" />
        </FormGroup>
        <FormGroup>
            <Label>Expiry Date</Label>
            <Input type="text" id="expireDate" placeholder="Enter Expire Date" />
        </FormGroup>
        <FormGroup>
            <Label>CVV</Label>
            <Input type="number" id="cvv" placeholder="Enter CVV Number" />
        </FormGroup>
        <FormGroup>
            <Label>Name on card</Label>
            <Input type="text" id="name" placeholder="Name on the card" />
        </FormGroup>
        <FormGroup>
            <Label>Amount</Label>
            <Input type="number" id="amount"/>
        </FormGroup>
        <Button color="primary" className="btn-lg btn-block" onClick={(e) => pay(e)}>Pay</Button>
    </Form>
    )
}

export default Payment;