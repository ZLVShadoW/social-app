import React from 'react';
import avatar from '../../../assets/img/user.png';
import {Preloader} from '../../Preloader/Preloader';
import {ProfileStatus} from './ProfileStatus';
import {ProfileData} from './ProfileData';
import {ProfileDataForm} from './ProfileDataForm';
import {SButton} from '../../SButton/SButton';
import {Nullable, ProfileUserType} from '../../../types';


type ProfileInfoPropsType = {
    isOwner: boolean
    profile: Nullable<ProfileUserType>
    status: Nullable<string>
    updateStatus: (statusText: string) => void
    savePhoto: (photo: File) => void
    saveProfileInfo: (profileInfo: ProfileUserType, setStatus: (status?: any) => void) => void
}

export const ProfileInfo: React.FC<ProfileInfoPropsType> =
    ({isOwner, profile, status, updateStatus, savePhoto, saveProfileInfo}) => {

        const [editMode, setEditMode] = React.useState(false)

        const onProfilePhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
                savePhoto(e.target.files[0])
            }
        }

        const toggleEditMode = (value: boolean) => {
          setEditMode(value)
        }

        if (!profile) return (
            <Preloader/>
        )

        return (
            <div>
                <img src={profile.photos.large ? profile.photos.large : avatar}
                     alt={'avatar'}/>
                <div>
                    {isOwner && <input type="file" onChange={onProfilePhotoSelected}/>}
                </div>
                <ProfileStatus status={status} updateStatus={updateStatus}/>

                ----------------------

                {!editMode && <SButton onClick={() => toggleEditMode(true)}>Edit
                info</SButton> }

                ------------------

                {editMode
                    ? <ProfileDataForm profile={profile}
                                       saveProfileInfo={saveProfileInfo}
                    toggleEditMode={toggleEditMode}/>
                    : <ProfileData profile={profile}/>
                }

                <br/>
            </div>
        );
    }


