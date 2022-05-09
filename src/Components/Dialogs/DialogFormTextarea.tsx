import React from 'react';
import {useFormik} from 'formik';

type DialogFormTextareaPropsType = {
    addMessage: (text: string) => void
}

export const DialogFormTextarea: React.FC<DialogFormTextareaPropsType> = (props) => {
    const formik = useFormik({
        initialValues: {
            message: ''
        },
        onSubmit: (values, {resetForm}) => {
            props.addMessage(values.message)
            resetForm({})
        }
    })
    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor={'message'}>
            <textarea name={'message'} id={'message'} placeholder={'Add your message'}
                      onChange={formik.handleChange} value={formik.values.message}/>
            </label>
            <button type={'submit'}>Send</button>
        </form>
    )
}