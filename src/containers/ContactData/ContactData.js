import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";

import s from "./ContactData.module.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { orderHandler } from "../../store/orders-reducer/orders-reducer";

import { Formik, Form, Field } from "formik";
import Yup, {
    nameValidator,
    emailValidator,
    flatValidator,
} from "./../../helpers/validators";
import Input from "../../components/UI/Input/Input";

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

    orderHandler = (values) => {
        this.props.orderHandler(this.createOrder(values), this.props.history);
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
            email: "",
            city: "",
            street: "",
            flat: "",
        };

        const fieldCreator = (name, placeholder, type, errors, touched) => {
            return (
                <>
                    {errors[name] && touched[name] ? (
                        <div className={s.Error}>{errors[name]}</div>
                    ) : null}
                    <Field
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        component={Input}
                    />
                </>
            );
        };

        const form = (
            <div>
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values) => this.orderHandler(values)}
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

                            <Button type="Success">Submit</Button>
                        </Form>
                    )}
                </Formik>
            </div>
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
    };
};

export default compose(
    withRouter,
    connect(mapStateToProps, { orderHandler })
)(ContactData);
