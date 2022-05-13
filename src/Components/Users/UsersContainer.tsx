import {connect} from 'react-redux';
import {Users} from './Users';
import {AppStateType} from '../../redux/reducers';
import {
    follow,
    getUsers,
    setCurrentPage,
    unfollow
} from '../../redux/reducers/users-reducer';
import React from 'react';
import {Preloader} from '../Preloader/Preloader';
import {compose} from 'redux';
import {UserResponseType} from '../../api/api';


type UsersContainerPropsType = MapStatePropsType & MapDispatchPropsType

// type UsersContainerPropsType = {
//     users: Array<UserType>
//     totalUsersCount: number
//     pageSize: number
//     currentPage: number
//     isFetching: boolean
//     followingProgress: Array<number | undefined>
//     follow: (userId: number) => void
//     unfollow: (userId: number) => void
//     setUsers: (users: Array<UserType>) => void
//     setTotalUsersCount: (totalCount: number) => void
//     setCurrentPage: (page: number) => void
//     toggleIsFetching: (isFetching: boolean) => void
//     toggleIsFollowingProgress: (userId: number, isFetching: boolean) => void
// }

class UsersContainer extends React.Component<UsersContainerPropsType, {}> {
    // constructor(props: UsersContainerPropsType) {
    //     super(props)
    //
    //
    // }


    componentDidMount() {

        this.props.getUsers(this.props.currentPage, this.props.pageSize)

        // this.props.toggleIsFetching(true)
        // usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
        //     .then(data => {
        //         this.props.setUsers(data.items)
        //         this.props.setTotalUsersCount(data.totalCount)
        //         this.props.toggleIsFetching(false)
        //     })
    }

    openCurrentPage = (page: number) => {
        this.props.setCurrentPage(page)
        this.props.getUsers(page, this.props.pageSize)

        // this.props.toggleIsFetching(true)
        // usersAPI.getUsers(page, this.props.pageSize)
        //     .then(data => {
        //         this.props.setUsers(data.items)
        //         this.props.toggleIsFetching(false)
        //     })
    }

    render() {
        return (
            <>
                {this.props.isFetching && <Preloader/>}
                <Users users={this.props.users}
                       totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       followingProgress={this.props.followingProgress}
                       follow={this.props.follow}
                       unfollow={this.props.unfollow}
                       openCurrentPage={this.openCurrentPage}/>
            </>
        );
    }
}

type MapStatePropsType = {
    users: Array<UserResponseType>
    totalUsersCount: number
    pageSize: number
    currentPage: number
    isFetching: boolean
    followingProgress: Array<number | undefined>
}

type MapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
    setCurrentPage: (page: number) => void
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: state.usersPage.users,
        totalUsersCount: state.usersPage.totalUsersCount,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingProgress: state.usersPage.followingProgress
    }
}

// const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
//     return {
//         setUsers: (users) => {
//             dispatch(setUsersAC(users))
//         },
//         follow: (userId) => {
//             dispatch(followAC(userId))
//         },
//         unfollow: (userId) => {
//             dispatch(unfollowAC(userId))
//         },
//         setTotalUsersCount: (totalCount) => {
//             dispatch(setTotalUsersCountAC(totalCount))
//         },
//         setCurrentPage: (page) => {
//             dispatch(setCurrentPageAC(page))
//         },
//         toggleIsFetching: (isFetching) => dispatch(toggleIsFetching(isFetching))
//     }
// }

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
        follow,
        unfollow,
        setCurrentPage,
        getUsers
    })
)
(UsersContainer)

