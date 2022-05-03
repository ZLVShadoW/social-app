import React from 'react';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/reducers';
import {Profile} from './Profile';
import {ProfileUserType, getUserProfile} from '../../redux/reducers/profile-reducer';
import {withCustomWithRouter} from '../../HOCS/withCustomWithRouter';
import { Navigate } from 'react-router-dom';

type ProfileContainerPropsType = MapStatePropsType & MapDispatchPropsType

class ProfileContainer extends React.Component<ProfileContainerPropsType & { params: { userId: string } }, {}> {
    componentDidMount() {
        const {userId} = this.props.params
        this.props.getUserProfile(Number(userId))
    }

    render() {

        if(!this.props.isAuth) return <Navigate to={'/login'} />

        //TODO прокидывание пропсов спредом, принятие пропсов детьми, что с типом null

        // return <Profile {...this.props} />
        return <Profile {...this.props} profile={this.props.profile}/>
    }
}

type MapStatePropsType = {
    profile: ProfileUserType | null
    isAuth: boolean
}

type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {getUserProfile})
(withCustomWithRouter(ProfileContainer))