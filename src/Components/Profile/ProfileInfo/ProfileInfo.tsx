import React from 'react';
import avatar from '../../../assets/img/user.png';
import {ProfileUserType} from '../../../redux/reducers/profile-reducer';
import {Preloader} from '../../Preloader/Preloader';
import {ProfileStatus} from './ProfileStatus';

type ProfileInfoPropsType = {
    profile: ProfileUserType | null
    status: string | null
    updateStatus: (statusText: string | null) => void
}

export const ProfileInfo: React.FC<ProfileInfoPropsType> = (props) => {

    const cnsize = {
        width: '100px',
    }

    if (!props.profile) return (
        <Preloader/>
    )

    return (
        <div>
            <img src={props.profile?.photos.small ? props.profile.photos.small : avatar} alt={'avatar'} style={cnsize}/>
            <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
            <br/>
        </div>
    );

}