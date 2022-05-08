import React from 'react';
import {UserType} from '../../redux/reducers/users-reducer';
import imgSrc from '../../assets/img/user.png';

import cn from './Users.module.scss'
import {Link} from 'react-router-dom';

type UsersPropsType = {
    users: Array<UserType>
    totalUsersCount: number
    pageSize: number
    currentPage: number,
    followingProgress: Array<number | undefined>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    openCurrentPage: (page: number) => void
    // toggleIsFollowingProgress: (userId: number, isFetching: boolean) => void
}


export const Users: React.FC<UsersPropsType> = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages: number[] = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>
            <div style={{
                margin: '10px 0',
                background: '#ddd',
                display: 'flex',
                gap: 5,
                height: 24,
                overflow: 'hidden'
            }}>
                {
                    pages.map(p =>
                        <button key={p}
                                className={props.currentPage === p ? cn.current : ''}
                                onClick={() => props.openCurrentPage(p)}>
                            {p}
                        </button>)
                }
            </div>
            {
                props.users.map((user, idx) => (
                    <div key={user.id}>
                        <Link to={`/profile/${user.id}`}>
                            <img src={user.photos.small ? user.photos.small : imgSrc} alt={'logo'}
                                 style={{width: 150}}/>
                        </Link>
                        <div>
                            {user.followed
                                ? <button disabled={props.followingProgress.some(el => el === user.id)}
                                          onClick={() => {
                                              props.unfollow(user.id)
                                    // props.toggleIsFollowingProgress(user.id, true)
                                    // usersAPI.unfollow(user.id).then(data => {
                                    //     if (data.resultCode === 0) {
                                    //         props.unfollow(user.id)
                                    //     }
                                    //     props.toggleIsFollowingProgress(user.id, false)
                                    // })

                                }}>
                                    unfollow</button>


                                : <button disabled={props.followingProgress.some(el => el === user.id)}
                                          onClick={() => {
                                              props.follow(user.id)
                                    // props.toggleIsFollowingProgress(user.id, true)
                                    // usersAPI.follow(user.id).then(data => {
                                    //     if (data.resultCode === 0) {
                                    //         props.follow(user.id)
                                    //     }
                                    //     props.toggleIsFollowingProgress(user.id, false)
                                    // })

                                }}>follow</button>
                            } : {idx + 1}

                        </div>
                        <div>Name: {user.name} </div>
                        <div>Status: {user.status}</div>
                        <div>id: {user.id}</div>
                        {/*//@ts-ignore*/}
                        <div>smth: {user.something}</div>
                        {/*//@ts-ignore*/}
                        <div>smth2: {user.something2}</div>
                    </div>
                ))
            }
        </div>
    )
}