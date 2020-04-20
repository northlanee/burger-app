import React, { Component } from "react";
import Order from "../../components/Order/Order";

import axios from "./../../api/orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import { setOrders } from "../../store/orders-reducer/orders-reducer";

class Orders extends Component {
    state = {
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
                this.props.setOrders(fetchedOrders);
                this.setState({ loading: false });
            })
            .catch(() => {
                this.setState({ loading: false });
            });
    }

    render() {
        let orders;
        if (!this.props.orders.length) orders = <h2>You have no orders yet</h2>;
        else
            orders = this.props.orders.map((order) => {
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

const mapStateToProps = (state) => {
    return {
        orders: state.ordersReducer.orders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setOrders: (orders) => dispatch(setOrders({ orders })),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
