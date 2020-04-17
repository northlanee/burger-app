import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";

import s from './ContactData.module.css';
import axios from './../../api/orders';
import Spinner from "../../components/UI/Spinner/Spinner";

class ContactData extends Component {
    state = {
        name: 'Vasya',
        email: 'pupkin@gmail.com',
        address: {
            city: 'Kyiv',
            street: 'Pushkina, 69',
            flat: 69
        },
        loading: false
    };

    orderHandler = (e) => {
        e.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price.toFixed(2),
            customer: {
                name: this.state.name,
                email: this.state.email,
                address: {
                    city: this.state.address.city,
                    street: this.state.address.street,
                    flat: this.state.address.flat
                }
            }
        };
        axios.post('/orders.json', order)
            .then(response => {
                this.props.history.push('/orders');
                this.setState({loading: false});

            })
            .catch(error => {
                this.setState({loading: false});
            });
    };

    render() {
        let form = (
            <form>
                <input type="text" name='name' placeholder='Your name'/>
                <input type="email" name='email' placeholder='Your email'/>
                <Button type='Success' clicked={this.orderHandler}>Order</Button>
            </form>
        );
        if (this.state.loading) form = <Spinner/>;

        return (
            <div className={s.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;