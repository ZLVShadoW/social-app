import React from 'react';
import avatar from "../../../assets/img/user.png";
import {ProfileUserType} from '../../../redux/reducers/profile-reducer';
import {Preloader} from '../../Preloader/Preloader';

type ProfileInfoPropsType = {
 profile: ProfileUserType | null
}

export const ProfileInfo:React.FC<ProfileInfoPropsType> = (props) => {

    const cnsize = {
        width: '100px',
    }

    if (!props.profile) return (
        <Preloader />
    )

    return (
        <div>
            <img src={props.profile?.photos.small ? props.profile.photos.small : avatar} alt={'avatar'} style={cnsize}/>
            description
        </div>
    );

}