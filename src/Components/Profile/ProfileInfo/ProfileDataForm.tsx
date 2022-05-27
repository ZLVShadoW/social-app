import React from 'react';
import {ProfileUserType} from '../../../api/api';


type ProfileDataFormPropsType = {
    profile: ProfileUserType
}

export const ProfileDataForm: React.FC<ProfileDataFormPropsType> = ({profile}) => {
    return (
        <div>
            FORM
        </div>
    )
}
