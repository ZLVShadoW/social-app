import React from 'react';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/reducers';
import axios from 'axios';
import {Profile} from './Profile';
import {setUserProfile, ProfileUserType} from '../../redux/reducers/profile-reducer';
import {withCustomWithRouter} from '../../HOCS/withCustomWithRouter';

type ProfileContainerPropsType = MapStatePropsType & MapDispatchPropsType

class ProfileContainer extends React.Component<ProfileContainerPropsType & {params: {userId: string}}, {}>{
    componentDidMount() {
    const { userId } = this.props.params
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId ? userId : '2'}`)
            .then(response => this.props.setUserProfile(response.data))
    }

    render() {

        //TODO прокидывание пропсов спредом, принятие пропсов детьми, что с типом null

        // return <Profile {...this.props} />
        return <Profile {...this.props} profile={this.props.profile} />
    }
}

type MapStatePropsType = {
    profile: ProfileUserType | null
}

type MapDispatchPropsType = {
    setUserProfile: (profile: ProfileUserType) => void
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        profile: state.profilePage.profile
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {setUserProfile})
(withCustomWithRouter(ProfileContainer))