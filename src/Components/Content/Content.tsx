import React from 'react';
import {Route, Routes} from 'react-router-dom'

import cn from './Content.module.scss'
import {News} from '../News/News';
import {DialogsContainer} from '../Dialogs/DialogsContainer';
import UsersContainer from '../Users/UsersContainer';
import ProfileContainer from '../Profile/ProfileContainer';
import {Login} from '../Login/Login';

type ContentPropsType = {}


export const Content: React.FC<ContentPropsType> = (props) => {
    return (
        <div className={cn.content}>
            ----------CONTENT---------- <br/>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium architecto, consequatur cumque
            delectus doloremque eligendi error eveniet excepturi expedita hic itaque molestiae nam nesciunt nisi,
            nostrum provident quis quod rem, soluta ullam. Ab adipisci at aut distinctio dolore libero nihil, nulla
            optio, porro quas rerum sapiente, sint ullam? Autem, obcaecati!
            <Routes>
                <Route path={'/profile'} element={<ProfileContainer/>}/>
                <Route path={'/profile/:userId'} element={<ProfileContainer/>}/>
                <Route path={'/dialogs/*'} element={<DialogsContainer/>}/>
                <Route path={'/users'} element={<UsersContainer/>}/>
                <Route path={'/news'} element={<News/>}/>
                <Route path={'/'}
                       element={<div style={{border: '1px solid red', margin: 15}}>settings: home-url '/'</div>}/>
                <Route path={'/login'} element={<Login/>}/>
            </Routes>
        </div>
    );
}

//TODO FIND HOW TO BE WITH URL; CHILD IN DIALOGITEM ---

//TODO MyPotsContainer - определение типа dispatch (из redux)
//TODO 71 DONE ... MOVE TO NEXT VIDEO - 72 ...
