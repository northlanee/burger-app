import React, { Component } from "react";
import Order from "../../components/Order/Order";

import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import { getOrders } from "../../store/orders-reducer/ordersReducer";

class Orders extends Component {
    componentDidMount() {
        this.props.getOrders(this.props.token);
    }

    render() {
        let orders;
        if (!this.props.loading) {
            if (this.props.orders.length > 0) {
                orders = this.props.orders.map((order) => {
                    return (
                        <Order
                            key={order.id}
                            ingredients={order.ingredients}
                            price={order.price}
                        />
                    );
                });
            } else orders = <h1>No orders yet</h1>;
        } else orders = <Spinner />;

        return orders;
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.ordersReducer.orders,
        loading: state.ordersReducer.loading,
        token: state.authReducer.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getOrders: (token) => dispatch(getOrders(token)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
