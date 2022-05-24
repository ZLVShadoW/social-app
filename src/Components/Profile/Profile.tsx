import React from 'react';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {MyPostsContainer} from '../MyPosts/MyPostsContainer';
import {ProfileUserType} from '../../api/api';

type ProfilePropsType = {
    profile: ProfileUserType | null
    status: string | null
    updateStatus: (statusText: string) => void
}

export const Profile: React.FC<ProfilePropsType> = (props) => {



    return (
        <>
            <br/>
            -----------------------------PROFILE-------------------------------------------------

            <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus} />
            <MyPostsContainer/>
        </>
    );
}