import React from 'react';
import {Form, Formik, FormikHelpers, Field, ErrorMessage, useFormik} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {AuthType, login} from '../../redux/reducers/auth-reducer';
import {AppStateType} from '../../redux/reducers';
import { Navigate } from 'react-router-dom';

type InitialValues = {
    email: string
    password: string
    rememberMe: boolean
}

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required').typeError('Incorrect password')
})

export const Login = () => {
    const dispatch = useDispatch()
    const {isAuth} = useSelector<AppStateType, AuthType>(state => state.auth)

    const initialValues: InitialValues = {
        email: '',
        password: '',
        rememberMe: false,
    }

    const onSubmit = (values: InitialValues, {resetForm}: FormikHelpers<InitialValues>) => {
        dispatch(login(values))
        // resetForm({}) // необязательно думаю, redirect будет
    }

    if (isAuth) return <Navigate to={'/profile'} />



    return (
        <div>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={SignupSchema}>
                <Form>
                    <div>
                        <label htmlFor={'email'}>Email: </label>
                        <Field type={'text'} name={'email'} id={'email'}/>
                        <ErrorMessage name={'email'} render={msg => (<span>{msg}</span>)}/>
                    </div>
                    <div>
                        <label>Password:
                            <Field type={'password'} name={'password'} id={'password'}/>
                            <ErrorMessage name={'password'} render={msg => (<div>{msg}</div>)}/>
                        </label>
                    </div>
                    <div>
                        <label htmlFor={'rememberMe'}>Remember:
                            <Field type={'checkbox'} name={'rememberMe'} id={'rememberMe'}/>
                        </label>
                    </div>
                    <button type={'submit'}>Login</button>
                </Form>
            </Formik>
        </div>
    )
}