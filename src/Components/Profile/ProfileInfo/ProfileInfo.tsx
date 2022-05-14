import React from 'react';
import avatar from '../../../assets/img/user.png';
import {Preloader} from '../../Preloader/Preloader';
import {ProfileStatus} from './ProfileStatus';
import {ProfileUserType} from '../../../api/api';

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