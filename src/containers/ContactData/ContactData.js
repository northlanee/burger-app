import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";

import s from "./ContactData.module.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";

import { Formik, Form } from "formik";
import Yup, {
    nameValidator,
    emailValidator,
    flatValidator,
} from "./../../helpers/validators";
import fieldCreator from "../../helpers/formFieldCreator";
import { orderHandler } from "../../store/orders-reducer/ordersReducer";

class ContactData extends Component {
    createOrder = (values) => {
        return {
            ingredients: this.props.ingredients,
            price: this.props.price.toFixed(2),
            customer: {
                name: values.name,
                email: values.email,
                address: {
                    city: values.city,
                    street: values.street,
                    flat: values.flat,
                },
            },
        };
    };

    orderSubmit = (values) => {
        this.props.orderHandler(
            this.createOrder(values),
            this.props.token,
            this.props.history
        );
    };

    render() {
        const signupSchema = Yup.object().shape({
            name: nameValidator,
            email: emailValidator,
            city: nameValidator,
            street: nameValidator,
            flat: flatValidator,
        });

        const initialValues = {
            name: "",
            email: this.props.email || "",
            city: "",
            street: "",
            flat: "",
        };

        const form = (
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => this.orderSubmit(values)}
                validationSchema={signupSchema}
            >
                {({ errors, touched }) => (
                    <Form>
                        {fieldCreator(
                            "name",
                            "Your name",
                            "text",
                            errors,
                            touched
                        )}

                        {fieldCreator(
                            "email",
                            "Your email",
                            "email",
                            errors,
                            touched
                        )}

                        {fieldCreator(
                            "city",
                            "Your city",
                            "text",
                            errors,
                            touched
                        )}

                        {fieldCreator(
                            "street",
                            "Your street",
                            "text",
                            errors,
                            touched
                        )}

                        {fieldCreator(
                            "flat",
                            "Your flat",
                            "text",
                            errors,
                            touched
                        )}

                        <Button btnType="Success" type="submit">
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        );

        return (
            <div className={s.ContactData}>
                <h4>Enter your contact data</h4>
                {this.props.loading ? <Spinner /> : form}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.ordersReducer.loading,
        email: state.authReducer.email,
        token: state.authReducer.token,
    };
};

const mapDispatchToProps = (dispatch) => ({
    orderHandler: (values, token, history) =>
        dispatch(orderHandler(values, token, history)),
});

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(ContactData);
