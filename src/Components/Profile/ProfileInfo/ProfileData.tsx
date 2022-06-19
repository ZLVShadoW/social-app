import {ProfileUserType} from '../../../api/api';
import React from 'react';
import {Contact} from './Contact';

type ProfileDataPropsType = {
    profile: ProfileUserType
}

export const ProfileData: React.FC<ProfileDataPropsType> = ({profile}) => {

    return (
        <>
            <div>
                Full name: {profile.fullName}
            </div>
            <div>
                About me: {profile.aboutMe}
            </div>
            <div>
                Looking for a job: <strong>{profile.lookingForAJob ? 'yes' : 'no'}</strong>
            </div>
            <div>
                Description: {profile.lookingForAJobDescription}
            </div>
            <div>
                Contacts:
                <div style={{paddingLeft: 15}}>
                    {
                        Object.keys(profile.contacts).map(key => {
                            return (
                                <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}