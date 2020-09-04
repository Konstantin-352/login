import React from 'react';
import s from './Login.module.css';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {connect} from "react-redux";
import {setTokenAC} from "../../redux/authorizationReducer";

const Login = ({setToken, errorToken}) => {

    return (
        <div className={s.login}>
            <Formik
                initialValues={{email: '', password: ''}}
                validate={values => {
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
                }}
                onSubmit={(values, actions) => {
                    setToken({...values, clientId: 1});
                    actions.setSubmitting(false);
                }}
            >
                {({isSubmitting}) => (

                    <Form className={s.loginForm}>
                        <div>{isSubmitting}</div>
                        <div className={s.loginText}>Логин</div>
                        <div>
                            <Field type="email" name="email" className={s.loginInput}/>
                        </div>
                        <ErrorMessage name="email" component="div" className={s.loginText}/>
                        <div>
                            <div className={s.loginText}>Пароль</div>
                            <Field type="password" name="password" className={s.loginInput}/>
                        </div>
                        <ErrorMessage name="password" component="div" className={s.loginText}/>
                        {errorToken ? <div className={s.loginText}>{errorToken}</div> : ''}
                        <button type='submit'>
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
    setToken: data => dispatch(setTokenAC(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);