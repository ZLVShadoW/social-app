import React from 'react';
import {Field, Form, Formik, FormikHelpers} from 'formik';

type DialogFormTextareaPropsType = {
    addMessage: (text: string) => void
}

type InitialValues = {
    message: string
}

export const DialogFormTextarea: React.FC<DialogFormTextareaPropsType> = (props) => {
    // const formik = useFormik({
    //     initialValues: {
    //         message: ''
    //     },
    //     onSubmit: (values, {resetForm}) => {
    //         props.addMessage(values.message)
    //         resetForm({})
    //     }
    // })

    const initialValues: InitialValues = {
        message: ''
    }

    const onSubmit = (values: InitialValues, {resetForm}: FormikHelpers<InitialValues>) => {
        props.addMessage(values.message)
        // resetForm({})
        resetForm({values: {message: ''}})
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form>
                <label htmlFor={'message'}>
                    <Field name={'message'} id={'message'} placeholder={'Add your message'} as={'textarea'}/>
                </label>
                <button type={'submit'}>Send</button>
            </Form>
        </Formik>
    )
}