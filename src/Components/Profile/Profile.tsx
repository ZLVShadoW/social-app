import React from 'react';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';


import {MyPostsContainer} from '../MyPosts/MyPostsContainer';
import {ProfileUserType} from '../../redux/reducers/profile-reducer';

type ProfilePropsType = {
    profile: ProfileUserType | null
}

export const Profile: React.FC<ProfilePropsType> = (props) => {
    return (
        <>
            <br/>
            -----------------------------PROFILE-------------------------------------------------

            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer/>
        </>
    );
}