import React from 'react';
import {useFormik} from 'formik';
import {SButton} from '../SButton/SButton';

type PostFormTextareaPropsType = {
    addPost: (text: string) => void
}

export const PostFormTextarea: React.FC<PostFormTextareaPropsType> = (props) => {
    const formik = useFormik({
        initialValues: {
            post: ''
        },
        onSubmit: (values, {resetForm, setErrors}) => {
            props.addPost(values.post)
            // formik.resetForm({}) без принятия resetForm параметром после value
            // resetForm({})
            resetForm({values: {post: ''}})
            // setErrors("values")
        }
    })
    console.log(formik)
    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor={'post'}>
            <textarea name={'post'} id={'post'} placeholder={'your post'}
                      onChange={formik.handleChange} value={formik.values.post}

            />
            </label>
            <SButton>click</SButton>
        </form>
    )
}
