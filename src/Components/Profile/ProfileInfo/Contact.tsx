import React from 'react';
import {Nullable} from '../../../api/api';

type ContactPropsType = {
    contactTitle: string
    contactValue: Nullable<string>
}

export const Contact: React.FC<ContactPropsType> = ({contactTitle, contactValue}) => {
    return (
        <div>
            {contactTitle} : {contactValue}
        </div>
    )
}
