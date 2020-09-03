import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

const booking = (e) => {
    e.preventDefault();
    let request = {
        serviceName: document.getElementById('service').value,
        carNumber: document.getElementById('carNum').value,
        carModel: document.getElementById('carModel').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        address: document.getElementById('address').value
    }
    axios.post('http://localhost:8080/api/bookings/carwashBooking', request)
    .then(res => {
        console.log('Booking Data', res.data);
    }).catch(err => {
        console.log('err', err)
    })
}
const CarWashBooking = () => {
    
    return(
        <Form className="carwash-form" onSubmit={(e) => booking(e)}>
            <h1 className="text-center">Car Wash Booking</h1>
            <FormGroup>
                <Label>Services</Label>
                <Input type="select" name="select" id="service">
                    <option>Car Wash</option>
                    <option>Car Polishing</option>
                    <option>Car Painting</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label>Car Number</Label>
                <Input type="text" id="carNum" placeholder="Enter your car number" />
            </FormGroup>
            <FormGroup>
                <Label>Car Model</Label>
                <Input type="select" name="select" id="carModel">
                    <option>Audi Q7</option>
                    <option>Audi A5</option>
                    <option>BMW 530d</option>
                    <option>BMW X2</option>
                    <option>Jaguar XF</option>
                    <option>Jaguar XJ</option>
                    <option>Other</option>

                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="exampleDate">Date</Label>
                <Input
                type="date"
                name="date"
                id="date"
                placeholder="date placeholder"
                />
            </FormGroup>
            <FormGroup>
                <Label for="exampleTime">Time</Label>
                <Input
                type="time"
                name="time"
                id="time"
                placeholder="time placeholder"
                />
            </FormGroup>
            <FormGroup>
                <Label>Address</Label>
                <Input type="text" id="address" placeholder="Enter your address" />
            </FormGroup>
            <Button color="primary" className="btn-lg btn-block">Book Car Wash</Button>
        </Form>
    );
}

export default CarWashBooking;