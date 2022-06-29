import React from 'react';
import {Route, Routes} from 'react-router-dom'

import cn from './Content.module.scss'
import {News} from '../News/News';
import UsersContainer from '../Users/UsersContainer';
import ProfileContainer from '../Profile/ProfileContainer';
import {Login} from '../Login/Login';
import {withSuspense} from '../../HOCS/withSuspense';

const DialogsContainer = React.lazy(() => import('../Dialogs/DialogsContainer')
    .then(({DialogsContainer}) => ({default: DialogsContainer})));

const SuspendedDialogsContainer = withSuspense(DialogsContainer)

type ContentPropsType = {}


export const Content: React.FC<ContentPropsType> = () => {
    return (
        <div className={cn.content}>
            ----------CONTENT---------- <br/>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium
            architecto, consequatur cumque
            delectus doloremque eligendi error eveniet excepturi expedita hic itaque
            molestiae nam nesciunt nisi,
            nostrum provident quis quod rem, soluta ullam. Ab adipisci at aut distinctio
            dolore libero nihil, nulla
            optio, porro quas rerum sapiente, sint ullam? Autem, obcaecati!
            <Routes>
                <Route path={'/profile'} element={<ProfileContainer/>}/>
                <Route path={'/profile/:userId'} element={<ProfileContainer/>}/>
                <Route path={'/dialogs/*'} element={<SuspendedDialogsContainer/>}/>
                <Route path={'/users'} element={<UsersContainer/>}/>
                <Route path={'/news'} element={<News/>}/>
                <Route path={'/'}
                       element={<div
                           style={{border: '1px solid red', margin: 15}}>settings:
                           home-url '/'</div>}/>
                <Route path={'/login'} element={<Login/>}/>
            </Routes>
        </div>
    );
}
