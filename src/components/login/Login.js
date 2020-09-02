import React, {useState} from 'react';
import s from './Login.module.css';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import ServerRequest from "../serverRequest/ServerRequest";

const Login = ({setLogged, setToken}) => {
    const [isAuth, setAuth] = useState(true);

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
                onSubmit={(values) => {
                    (new ServerRequest('https://tager.dev.ozitag.com/api/auth/user'))
                        .addMethod('POST')
                        .addBody({...values, clientId: 1})
                        .request()
                        .then((result) => {
                            if (result.data && result.data.accessToken) {
                                setToken(result.data.accessToken);
                                setLogged(true);
                                setAuth(true);
                            }

                            if(result.errors) {
                                setAuth(false);
                            }
                        });
                }}
            >
                {({isSubmitting}) => (
                    <Form className={s.loginForm}>
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
                        {!isAuth ? <div>Введены не верные данные</div> : ''}
                        <button>
                            Войти
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
};

export default Login;