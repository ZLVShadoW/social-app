import React from 'react';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/reducers';
import {Profile} from './Profile';
import {getUserProfile, getStatus, updateStatus} from '../../redux/reducers/profile-reducer';
import {withCustomWithRouter} from '../../HOCS/withCustomWithRouter';
import {compose} from 'redux';
import {ProfileUserType} from '../../api/api';

type ProfileContainerPropsType = MapStatePropsType & MapDispatchPropsType

class ProfileContainer extends React.Component<ProfileContainerPropsType & { params: { userId: string } }, {}> {
    componentDidMount() {
        let userId = Number(this.props.params.userId)
        userId = userId ? userId : 23354

        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    render() {

        //TODO прокидывание пропсов спредом, принятие пропсов детьми, что с типом null

        // return <Profile {...this.props} profile={this.props.profile}/>
        return <Profile {...this.props} />
    }
}

type MapStatePropsType = {
    profile: ProfileUserType | null
    status: string | null
}

type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (statusText: string) => void
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status
    }
}

export default compose<React.ComponentType>(
    // withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
        getUserProfile,
        getStatus,
        updateStatus
    }),
    withCustomWithRouter
)
(ProfileContainer)
