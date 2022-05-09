// import React from 'react';

import {addMessageAC, DialogType, MessageType} from '../../redux/reducers/dialogs-reducer';
import {Dialogs} from './Dialogs';
import {compose, Dispatch} from 'redux';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/reducers';
import {withAuthRedirect} from '../../HOCS/withAuthRedirect';
import React from 'react';

type MapStatePropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    isAuth: boolean
}

type MapDispatchPropsType = {
    addMessage: (messageText: string) => void
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        isAuth: state.auth.isAuth
    }
}

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        addMessage: (messageText: string) => {
            dispatch(addMessageAC(messageText))
        }
    }
}

export const DialogsContainer = compose<React.ComponentType>(
    withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)
)
(Dialogs)

