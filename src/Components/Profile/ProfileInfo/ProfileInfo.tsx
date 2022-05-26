import React from 'react';
import avatar from '../../../assets/img/user.png';
import {Preloader} from '../../Preloader/Preloader';
import {ProfileStatus} from './ProfileStatus';
import {ProfileUserType} from '../../../api/api';

type ProfileInfoPropsType = {
    isOwner: boolean
    profile: ProfileUserType | null
    status: string | null
    updateStatus: (statusText: string) => void
    savePhoto: (photo: any) => void
}

export const ProfileInfo: React.FC<ProfileInfoPropsType> =
    ({isOwner, profile, status, updateStatus, savePhoto}) => {

        const onProfilePhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
                savePhoto(e.target.files[0])
            }
        }

        const cnsize = {
            width: '100px',
        }

        if (!profile) return (
            <Preloader/>
        )

        return (
            <div>
                <img src={profile.photos.large ? profile.photos.large : avatar} alt={'avatar'} style={cnsize}/>
                <div>
                    {isOwner && <input type="file" onChange={onProfilePhotoSelected}/>}
                </div>
                <ProfileStatus status={status} updateStatus={updateStatus}/>
                <br/>
            </div>
        );

    }