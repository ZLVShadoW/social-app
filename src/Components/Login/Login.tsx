import React from 'react';
import {useFormik} from 'formik';

export const Login = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
        }
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor={'email'}>
                        <input type={'text'} name={'email'} id={'email'}
                               onChange={formik.handleChange} value={formik.values.email}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor={'password'}>
                        <input type={'text'} name={'password'} id={'password'}
                               onChange={formik.handleChange} value={formik.values.password}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor={'rememberMe'}>
                        <input type={'checkbox'} name={'rememberMe'} id={'rememberMe'}
                               onChange={formik.handleChange} checked={formik.values.rememberMe}
                        />
                    </label>
                </div>
                <button type={'submit'}>Login</button>
            </form>
        </div>
    )
}