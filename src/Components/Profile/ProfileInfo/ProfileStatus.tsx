import React from 'react';

type ProfileStatusType = {
    status: string
    updateStatus: (statusText: string) => void
}

export const ProfileStatus: React.FC<ProfileStatusType> = (props) => {
    const [isEditMode, setIsEditMode] = React.useState(false)
    const [statusText, setStatusText] = React.useState(props.status)

    const onDoubleClickHandler = () => {
        setIsEditMode(true)
        setStatusText(props.status)
    }

    const onBlurHandler = () => {
        setIsEditMode(false)
        if (props.status === statusText) return
        props.updateStatus(statusText.trim())
    }

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatusText(e.currentTarget.value)
    }

    return (
        <div>
            {!isEditMode
                ? <span onDoubleClick={onDoubleClickHandler}>
                    {props.status ? props.status : <span style={{color: '#999'}}>change status</span>}
                  </span>
                : <input value={statusText}
                         onBlur={onBlurHandler}
                         onChange={onChangeHandler}
                         autoFocus={true}/>
            }
        </div>
    )
}

