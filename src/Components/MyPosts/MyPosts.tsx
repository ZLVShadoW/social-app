import React from 'react';
import {Post} from './Post/Post';

import cn from './MyPosts.module.scss';
import {PostType} from '../../redux/reducers/profile-reducer';



type MyPostsPropsType = {
    posts: Array<PostType>;
    addPost: (newPost: string) => void
}

export const MyPosts: React.FC<MyPostsPropsType> = (props) => {

    // let newPostEl = React.useRef<HTMLTextAreaElement | null>(null)

    let newPostEl: React.RefObject<HTMLTextAreaElement> = React.createRef()

    const addNewPost = () => {
        // const newPost = newPostEl.current?.value
        // if (typeof newPost === 'string') {
        //     props.addPost(newPost)
        // }
        // if (newPostEl.current !== null) {
        //     newPostEl.current.value = ''
        // }
        //-------------------------------------------------------------
        // if (newPostEl.current) {
        //     const newPost = newPostEl.current.value
        //     newPost && props.dispatch(addPostAC(newPost))
        //     newPostEl.current.value = ''
        // }

        if (newPostEl.current) {
            const newPost = newPostEl.current.value
            newPost && props.addPost(newPost)
            newPostEl.current.value = ''
        }
    }

    const postsEl = props.posts.map(post => <Post key={post.id} {...post} />)

    return (
        <div className={cn.wrapper}>
            <textarea ref={newPostEl} placeholder={'your post'}/>
            <button onClick={addNewPost}>click</button>
            <div>
                My posts
            </div>
            {postsEl}
        </div>
    );
}