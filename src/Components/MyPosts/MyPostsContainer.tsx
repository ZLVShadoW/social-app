// import React from 'react';

import {MyPosts} from './MyPosts';
import {addPostAC, PostType} from '../../redux/reducers/profile-reducer';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/reducers';


type MapStatePropsType = {
    posts: Array<PostType>
}
type MapDispatchPropsType = {
    addPost: (newPost: string) => void
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        posts: state.profilePage.posts
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        addPost: (newPost) => {
            dispatch(addPostAC(newPost))
        }
    }
}

export const MyPostsContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(MyPosts)