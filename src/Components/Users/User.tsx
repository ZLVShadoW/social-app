import React from 'react';
import {Link} from 'react-router-dom';
import imgSrc from '../../assets/img/user.png';
import {UserType} from '../../api/api';


type UserPropsType = {
    user: UserType
    followingProgress: Array<number | undefined>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

export const User: React.FC<UserPropsType> = ({user, follow, unfollow, followingProgress}) => {
    return (
        <div key={user.id}>
            <Link to={`/profile/${user.id}`}>
                <img src={user.photos.small ? user.photos.small : imgSrc} alt={'logo'}
                     style={{width: 150}}/>
            </Link>

            <div>
                {user.followed
                    ? <button disabled={followingProgress.some(el => el === user.id)}
                              onClick={() => unfollow(user.id)}>unfollow</button>
                    : <button disabled={followingProgress.some(el => el === user.id)}
                              onClick={() => follow(user.id)}>follow</button>
                }
            </div>

            <div>Name: {user.name} </div>
            <div>Status: {user.status}</div>
            <div>id: {user.id}</div>
        </div>
    )
}