import React from 'react';
import {Form, Formik, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {AuthType, login} from '../../redux/reducers/auth-reducer';
import {AppStateType} from '../../redux/reducers';
import {Navigate} from 'react-router-dom';
import {SButton} from '../SButton/SButton';
import { Nullable } from '../../types';


type InitialValues = {
    email: string
    password: string
    rememberMe: boolean
    captcha: Nullable<string>
}

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'min symbols is 6').required('Required').typeError('Incorrect password'),
    // captcha: Yup.string().required('Required')
    //TODO не пускает без капчи (а её нет)
    // captcha: Yup.string().optional()
})

export const Login = () => {
    const dispatch = useDispatch()

    const {isAuth} = useSelector<AppStateType, AuthType>(state => state.auth)
    const authError = useSelector<AppStateType, Nullable<string>>(state => state.auth.authError)
    const captchaUrl = useSelector<AppStateType, Nullable<string> | undefined>(state => state.auth.captchaUrl)

    const initialValues: InitialValues = {
        email: '',
        password: '',
        rememberMe: false,
        captcha: ''
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
                        <label htmlFor={'email'}>Email:
                            <Field type={'text'} name={'email'} id={'email'}/>
                            <ErrorMessage name={'email'} render={msg => (<span>{msg}</span>)}/>
                        </label>
                    </div>
                    <div>
                        <label>Password:
                            <Field type={'password'} name={'password'} id={'password'}/>
                            <ErrorMessage name={'password'} render={msg => (<span>{msg}</span>)}/>
                        </label>
                    </div>
                    <div>
                        <label htmlFor={'rememberMe'}>Remember:
                            <Field type={'checkbox'} name={'rememberMe'} id={'rememberMe'}/>
                        </label>
                    </div>
                    {captchaUrl &&
                        <>
                            <div>
                                <label htmlFor={'captcha'}>Captcha:
                                    <Field type={'text'} name={'captcha'} id={'captcha'}/>
                                    <ErrorMessage name={'captcha'} render={msg => (<span>{msg}</span>)}/>
                                </label>
                            </div>
                            <div><img src={captchaUrl!} alt={'captcha'}/></div>
                        </>
                    }

                    {authError && <div style={{color: 'red', border: '1px solid red'}}>{authError}</div>}
                    <SButton type={'submit'}>Login</SButton>
                </Form>
            </Formik>
        </div>
    )
}