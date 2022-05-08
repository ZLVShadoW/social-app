// import React from 'react';

import {addMessageAC, DialogType, MessageType, updateNewMessageTextAC} from '../../redux/reducers/dialogs-reducer';
import {Dialogs} from './Dialogs';
import {compose, Dispatch} from 'redux';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/reducers';
import {withAuthRedirect} from '../../HOCS/withAuthRedirect';
import React from 'react';

type MapStatePropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageText: string
    isAuth: boolean
}

type MapDispatchPropsType = {
    updateNewMessageText: (value: string) => void
    addMessage: () => void
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        newMessageText: state.dialogsPage.newMessageText,
        isAuth: state.auth.isAuth
    }
}

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        updateNewMessageText: (value: string) => {
            dispatch(updateNewMessageTextAC(value))
        },
        addMessage: () => {
            dispatch(addMessageAC())
        }
    }
}

export const DialogsContainer = compose<React.ComponentType>(
    withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)
)
(Dialogs)

