// import React from 'react';

import {addMessage, DialogType, MessageType} from '../../redux/reducers/dialogs-reducer';
import {Dialogs} from './Dialogs';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/reducers';
import {withAuthRedirect} from '../../HOCS/withAuthRedirect';
import React from 'react';

type MapStatePropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
}

type MapDispatchPropsType = {
    addMessage: (messageText: string) => void
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages
    }
}

export const DialogsContainer = compose<React.ComponentType>(
    withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {addMessage})
)
(Dialogs)

