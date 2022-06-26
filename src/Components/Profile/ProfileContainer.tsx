import React from 'react';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/reducers';
import {Profile} from './Profile';
import {
    getUserProfile,
    getStatus,
    updateStatus,
    savePhoto,
    saveProfileInfo
} from '../../redux/reducers/profile-reducer';
import {withCustomWithRouter} from '../../HOCS/withCustomWithRouter';
import {compose} from 'redux';
import { ProfileUserType } from '../../types';


type ProfileContainerPropsType = MapStatePropsType & MapDispatchPropsType

class ProfileContainer extends React.Component<ProfileContainerPropsType & { params: { userId: string } }, {}> {
    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<ProfileContainerPropsType & { params: { userId: string } }>, prevState: Readonly<{}>, snapshot?: any) {
        if (prevProps.params.userId !== this.props.params.userId) {
            this.refreshProfile()
        }
    }

    refreshProfile() {
        let userId = Number(this.props.params.userId)
        userId = userId ? userId : 23354

        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    render() {
        return <Profile {...this.props}
                        isOwner={!this.props.params.userId}
                        savePhoto={this.props.savePhoto}
                        saveProfileInfo={this.props.saveProfileInfo}/>
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
    savePhoto: (photo: File) => void
    saveProfileInfo: (profileInfo: ProfileUserType, setStatus: (status?: any) => void) => void
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
        updateStatus,
        savePhoto,
        saveProfileInfo
    }),
    withCustomWithRouter
)
(ProfileContainer)
