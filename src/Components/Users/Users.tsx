import React from 'react';
import { UserType } from '../../types';
import {Pagination} from './Pagination';
import {User} from './User';

type UsersPropsType = {
    users: Array<UserType>
    totalUsersCount: number
    pageSize: number
    currentPage: number,
    followingProgress: Array<number | undefined>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    openCurrentPage: (page: number) => void
}

export const Users: React.FC<UsersPropsType> =
    ({
         users, totalUsersCount, pageSize, currentPage,
         followingProgress, follow, unfollow, openCurrentPage
     }) => {

        return (
            <div>
                <Pagination currentPage={currentPage} pageSize={pageSize}
                            totalUsersCount={totalUsersCount} openCurrentPage={openCurrentPage}/>
                {
                    users.map((user) => <User key={user.id} user={user}
                                              followingProgress={followingProgress}
                                              follow={follow} unfollow={unfollow}/>)
                }
            </div>
        )
    }