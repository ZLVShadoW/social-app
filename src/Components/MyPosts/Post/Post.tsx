import React from 'react';
import avatar from './../../../assets/img/user.png';
import {PostType} from '../../../redux/reducers/profile-reducer';

import cn from './Post.module.scss';


export const Post: React.FC<PostType> = ({message, likesCount}) => {
    return (
        <div className={cn.post}>
            <div className={cn.post__image}><img src={avatar} alt={'avatar'}/></div>
            <div className={cn.post__text}>
                <div className={cn.post__message}>{message}</div>
                <div className={cn.post__likesCount}>Likes: {likesCount}</div>
            </div>
        </div>
    );
}