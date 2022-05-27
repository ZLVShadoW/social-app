import React from 'react';
import avatar from '../../../assets/img/user.png';
import {Preloader} from '../../Preloader/Preloader';
import {ProfileStatus} from './ProfileStatus';
import {Nullable, ProfileUserType} from '../../../api/api';
import {ProfileData} from './ProfileData';
import {ProfileDataForm} from './ProfileDataForm';

type ProfileInfoPropsType = {
    isOwner: boolean
    profile: Nullable<ProfileUserType>
    status: Nullable<string>
    updateStatus: (statusText: string) => void
    savePhoto: (photo: File) => void
}

export const ProfileInfo: React.FC<ProfileInfoPropsType> =
    ({isOwner, profile, status, updateStatus, savePhoto}) => {

        const [editMode, setEditMode] = React.useState(false)

        const onProfilePhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
                savePhoto(e.target.files[0])
            }
        }

        if (!profile) return (
            <Preloader/>
        )

        return (
            <div>
                <img src={profile.photos.large ? profile.photos.large : avatar} alt={'avatar'}/>
                <div>
                    {isOwner && <input type="file" onChange={onProfilePhotoSelected}/>}
                </div>
                <ProfileStatus status={status} updateStatus={updateStatus}/>

                ----------------------

                {editMode
                    ? <ProfileDataForm profile={profile}/>
                    : <ProfileData profile={profile}/>
                }

                <br/>
            </div>
        );
    }


