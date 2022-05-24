import React from 'react';
import avatar from '../../../assets/img/user.png';
import {Preloader} from '../../Preloader/Preloader';
import {ProfileStatus} from './ProfileStatus';
import {ProfileUserType} from '../../../api/api';

type ProfileInfoPropsType = {
    profile: ProfileUserType | null
    status: string | null
    updateStatus: (statusText: string) => void
}

export const ProfileInfo: React.FC<ProfileInfoPropsType> = ({profile, status, updateStatus}) => {

    const cnsize = {
        width: '100px',
    }

    if (!profile) return (
        <Preloader/>
    )

    return (
        <div>
            <img src={profile?.photos.small ? profile.photos.small : avatar} alt={'avatar'} style={cnsize}/>
            <ProfileStatus status={status} updateStatus={updateStatus}/>
            <br/>
        </div>
    );

}