import React from 'react';
import {Form, Formik, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {AuthType, login} from '../../redux/reducers/auth-reducer';
import {AppStateType} from '../../redux/reducers';
import {Navigate} from 'react-router-dom';
import {SButton} from '../SButton/SButton';

type InitialValues = {
    email: string
    password: string
    rememberMe: boolean
}

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'min symbols is 6').required('Required').typeError('Incorrect password')
})

export const Login = () => {
    const dispatch = useDispatch()

    const {isAuth} = useSelector<AppStateType, AuthType>(state => state.auth)
    const authError = useSelector<AppStateType, string | null>(state => state.auth.authError)

    const initialValues: InitialValues = {
        email: '',
        password: '',
        rememberMe: false,
    }

    const onSubmit = (values: InitialValues) => {
        dispatch(login(values))
    }

    if (isAuth) return <Navigate to={'/profile'}/>

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
                    {authError && <div style={{color: 'red', border: '1px solid red'}}>{authError}</div>}
                    <SButton type={'submit'}>Login</SButton>
                </Form>
            </Formik>
        </div>
    )
}