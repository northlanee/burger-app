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

const SignUp = ({ signUpHandler, switchMode, loading, error }) => {
    const signUpSchema = Yup.object().shape({
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
                Sign Up
            </Button>
            <p>Already have account?</p>
            <Button type="button" btnType="Danger" clicked={switchMode}>
                Sign In
            </Button>
        </>
    );

    const signUp = (
        <Formik
            initialValues={initialValues}
            onSubmit={(values) => signUpHandler(values)}
            validationSchema={signUpSchema}
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
            <h2>Sign Up</h2>
            {error ? <p className={s.Error}>{error}</p> : null}
            {signUp}
        </div>
    );
};

export default SignUp;
