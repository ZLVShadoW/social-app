import React from 'react';
import {Link} from 'react-router-dom';

import {UserType} from '../../api/api';

import styles from './User.module.scss'

import imgSrc from '../../assets/img/user.png';

type UserPropsType = {
    user: UserType
    followingProgress: Array<number | undefined>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

export const User: React.FC<UserPropsType> = ({user, follow, unfollow, followingProgress}) => {
    return (
        <div className={styles.user}>
            <div className={styles.user__img}>
                <Link to={`/profile/${user.id}`}>
                    <img src={user.photos.small ? user.photos.small : imgSrc} alt={'logo'}
                         style={{width: 150}}/>
                </Link>
            </div>

            <div>
                <div>Name: <span>{user.name}</span></div>
                {user.status && <div className={styles.status}>{user.status}</div>}
            </div>

            <div className={styles.user__followUnfollow}>
                <div>
                    {user.followed
                        ? <button disabled={followingProgress.some(el => el === user.id)}
                                  onClick={() => unfollow(user.id)}>unfollow</button>
                        : <button disabled={followingProgress.some(el => el === user.id)}
                                  onClick={() => follow(user.id)}>follow</button>
                    }
                </div>
                <div>id: {user.id}</div>
            </div>
        </div>
    )
}