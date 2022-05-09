import React from 'react';
import {Post} from './Post/Post';

import cn from './MyPosts.module.scss';
import {PostType} from '../../redux/reducers/profile-reducer';
import {PostFormTextarea} from './PostFormTextarea';



type MyPostsPropsType = {
    posts: Array<PostType>;
    addPost: (newPost: string) => void
}

export const MyPosts: React.FC<MyPostsPropsType> = (props) => {

    // let newPostEl = React.useRef<HTMLTextAreaElement | null>(null)
    let newPostEl: React.RefObject<HTMLTextAreaElement> = React.createRef()

    // const addNewPost = () => {
    //     // ------------------------------------------------- вариант 1 native
    //     // const newPost = newPostEl.current?.value
    //     // if (typeof newPost === 'string') {
    //     //     props.addPost(newPost)
    //     // }
    //     // if (newPostEl.current !== null) {
    //     //     newPostEl.current.value = ''
    //     // }
    //     //--------------------------------------------------- свой "store"
    //     // if (newPostEl.current) {
    //     //     const newPost = newPostEl.current.value
    //     //     newPost && props.dispatch(addPostAC(newPost))
    //     //     newPostEl.current.value = ''
    //     // }
    //     //--------------------------------------------------- вариант 2 native
    //     // if (newPostEl.current) {
    //     //     const newPost = newPostEl.current.value
    //     //     newPost && props.addPost(newPost)
    //     //     newPostEl.current.value = ''
    //     // }
    //     //--------------------------------------------------- formik
    // }

    const postsEl = props.posts.map(post => <Post key={post.id} {...post} />)

    return (
        <div className={cn.wrapper}>
            <PostFormTextarea addPost={props.addPost} />
            <div>
                My posts
            </div>
            {postsEl}
        </div>
    );
}