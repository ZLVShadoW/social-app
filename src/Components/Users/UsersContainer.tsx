import {connect} from 'react-redux';
import {Users} from './Users';
import {AppStateType} from '../../redux/reducers';
import {
    follow,
    requestUsers,
    unfollow
} from '../../redux/reducers/users-reducer';
import React from 'react';
import {Preloader} from '../Preloader/Preloader';
import {compose} from 'redux';
import {
    getCurrentPage, getFollowingProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from '../../redux/selectors/users-selectors';
import { UserType } from '../../types';


type UsersContainerPropsType = MapStatePropsType & MapDispatchPropsType

class UsersContainer extends React.Component<UsersContainerPropsType, {}> {
    // constructor(props: UsersContainerPropsType) {
    //     super(props)
    // }

    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.getUsers(currentPage, pageSize)
    }

    componentDidUpdate(prevProps: Readonly<UsersContainerPropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (prevProps.currentPage !== this.props.currentPage) {
            const {currentPage, pageSize} = this.props
            this.props.getUsers(currentPage, pageSize)
        }
    }

    openCurrentPage = (page: number) => {
        const {pageSize} = this.props
        this.props.getUsers(page, pageSize)
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
    users: Array<UserType>
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
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        totalUsersCount: getTotalUsersCount(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingProgress: getFollowingProgress(state)
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
        getUsers: requestUsers
    })
)
(UsersContainer)

