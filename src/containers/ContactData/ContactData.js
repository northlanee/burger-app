import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";

import s from "./ContactData.module.css";
import axios from "./../../api/orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";
import { withRouter } from "react-router-dom";

class ContactData extends Component {
    state = {
        orderForm: [
            {
                name: "name",
                placeholder: "Your name",
                value: "",
            },
            {
                name: "email",
                type: "email",
                placeholder: "Your email",
                value: "",
            },
            {
                name: "city",
                placeholder: "Your city",
                value: "",
            },
            {
                name: "street",
                placeholder: "Your street",
                value: "",
            },
            {
                name: "flat",
                placeholder: "Your flat",
                value: "",
            },
        ],

        loading: false,
    };

    orderHandler = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        const formData = this.state.orderForm;
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price.toFixed(2),
            customer: {
                name: formData[0].value,
                email: formData[1].value,
                address: {
                    city: formData[2].value,
                    street: formData[3].value,
                    flat: formData[4].value,
                },
            },
        };
        axios
            .post("/orders.json", order)
            .then(() => {
                this.setState({ loading: false });
                this.props.history.push("/orders");
            })
            .catch((error) => {
                this.setState({ loading: false });
            });
    };

    inputChangeHandler = (e, index) => {
        const newState = [...this.state.orderForm];
        newState[index] = {
            ...newState[index],
            value: e.target.value,
        };
        this.setState({ orderForm: newState });
    };

    render() {
        const inputs = this.state.orderForm.map((input, index) => {
            return (
                <Input
                    key={input.name}
                    changed={(e) => this.inputChangeHandler(e, index)}
                    data={input}
                />
            );
        });

        let form = (
            <form onSubmit={this.orderHandler}>
                {inputs}
                <Button type="Success">Order</Button>
            </form>
        );
        if (this.state.loading) form = <Spinner />;

        return (
            <div className={s.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

export default withRouter(ContactData);
