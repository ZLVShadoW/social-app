import React from 'react';
import {useFormik} from 'formik';

type PostFormTextareaPropsType = {
    addPost: (text: string) => void
}

export const PostFormTextarea: React.FC<PostFormTextareaPropsType> = (props) => {
    const formik = useFormik({
        initialValues: {
            post: ''
        },
        onSubmit: (values, {resetForm}) => {
            props.addPost(values.post)
            // formik.resetForm({}) без принятия resetForm параметром после value
            // resetForm({})
            resetForm({values: {post: ''}})
        }
    })
    console.log(formik.getFieldProps('post'))
    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor={'post'}>
            <textarea name={'post'} id={'post'} placeholder={'your post'}
                      onChange={formik.handleChange} value={formik.values.post}
            />
            </label>
            <button type={'submit'}>click</button>
        </form>
    )
}
