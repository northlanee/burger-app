import React from "react";
import Yup, {
    emailValidator,
    passwordValidator,
} from "../../../helpers/validators";
import { Form, Formik } from "formik";
import fieldCreator from "../../../helpers/formFieldCreator";
import Button from "../../UI/Button/Button";
import s from "./../Auth.module.css";
import Spinner from "../../UI/Spinner/Spinner";

const SignIn = ({ signInHandler, switchMode, loading, error }) => {
    const signInSchema = Yup.object().shape({
        email: emailValidator,
        password: passwordValidator,
    });

    const initialValues = {
        email: "",
        password: "",
    };

    const btnGroup = (
        <>
            <Button type="submit" btnType="Success">
                Sign In
            </Button>
            <p>Don`t have account?</p>
            <Button type="button" btnType="Danger" clicked={switchMode}>
                Sign Up
            </Button>
        </>
    );

    const signIn = (
        <Formik
            initialValues={initialValues}
            onSubmit={(values) => signInHandler(values)}
            validationSchema={signInSchema}
        >
            {({ errors, touched }) => (
                <Form>
                    {fieldCreator(
                        "email",
                        "Your email",
                        "email",
                        errors,
                        touched
                    )}
                    {fieldCreator(
                        "password",
                        "Your password",
                        "password",
                        errors,
                        touched
                    )}
                    {loading ? <Spinner /> : btnGroup}
                </Form>
            )}
        </Formik>
    );
    return (
        <div className={s.Auth}>
            <h2>Sign In</h2>
            {error ? <p className={s.Error}>{error}</p> : null}
            {signIn}
        </div>
    );
};

export default SignIn;
