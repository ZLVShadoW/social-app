import React from 'react';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {MyPostsContainer} from '../MyPosts/MyPostsContainer';
import { ProfileUserType } from '../../types';


type ProfilePropsType = {
    isOwner: boolean
    profile: ProfileUserType | null
    status: string | null
    updateStatus: (statusText: string) => void
    savePhoto: (photo: File) => void
    saveProfileInfo: (profileInfo: ProfileUserType, setStatus: (status?: any) => void) => void
}

export const Profile: React.FC<ProfilePropsType> = (props) => {



    return (
        <>
            <br/>
            -----------------------------PROFILE-------------------------------------------------

            <ProfileInfo isOwner={props.isOwner} profile={props.profile} status={props.status}
                         updateStatus={props.updateStatus}
                         savePhoto={props.savePhoto}
                         saveProfileInfo={props.saveProfileInfo}
            />
            <MyPostsContainer/>
        </>
    );
}