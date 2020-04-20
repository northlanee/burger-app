import React, { Component } from "react";
import Order from "../../components/Order/Order";

import axios from "./../../api/orders";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
    state = {
        orders: [],
        loading: true,
    };

    componentDidMount() {
        axios
            .get("/orders.json")
            .then((res) => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key,
                    });
                }
                this.setState({ loading: false, orders: fetchedOrders });
            })
            .catch(() => {
                this.setState({ loading: false });
            });
    }

    render() {
        let orders;
        if (!this.state.orders.length) orders = <h2>You have no orders yet</h2>;
        else
            orders = this.state.orders.map((order) => {
                return (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                    />
                );
            });

        return <div>{this.state.loading ? <Spinner /> : orders}</div>;
    }
}

export default Orders;
