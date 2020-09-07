import React from 'react';
import styles from './Login.module.css';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {connect} from "react-redux";
import {setTokenThunk} from "../../redux/authorizationReducer";

const Login = ({setToken, errorToken}) => {
    const initialValues = {email: '', password: ''};
    const validate = values => {
        const errors = {};

        if (!values.email) {
            errors.email = 'Поле обязательно для заполнения!';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
            errors.email = 'Неверный адрес электронной почты!';
        }

        if (!values.password) {
            errors.password = 'Поле обязательно для заполнения!';
        } else if (values.password.length < 4) {
            errors.password = 'Пароль слишком короткий!';
        }
        return errors;
    };
    const onSubmit = (values, actions) => {
        setToken({...values, clientId: 1});
        actions.setSubmitting(false);
    };

    return (
        <div className={styles.login}>
            <Formik
                initialValues={initialValues}
                validate={validate}
                onSubmit={onSubmit}
            >
                {({isSubmitting}) => (

                    <Form className={styles.loginForm}>
                        <div>{isSubmitting}</div>
                        <div className={styles.loginText}>Логин</div>
                        <div>
                            <Field type="email" name="email" className={styles.loginInput}/>
                        </div>
                        <ErrorMessage name="email" component="div" className={styles.loginText}/>
                        <div>
                            <div className={styles.loginText}>Пароль</div>
                            <Field type="password" name="password" className={styles.loginInput}/>
                        </div>
                        <ErrorMessage name="password" component="div" className={styles.loginText}/>
                        {errorToken ? <div className={styles.loginText}>{errorToken}</div> : ''}
                        <button type="submit">
                            Войти
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
};

const mapStateToProps = state => ({
    errorToken: state.authorization.token.error,
});

const mapDispatchToProps = dispatch => ({
    setToken: data => dispatch(setTokenThunk(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);