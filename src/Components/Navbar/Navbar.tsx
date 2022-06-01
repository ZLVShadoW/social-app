import React from 'react';
import {NavLink} from 'react-router-dom';

import cn from './Navbar.module.scss'

export const Navbar = () => {
    const cln = ({isActive}: { isActive: boolean }) => isActive ? `${cn.default} ${cn.active}` : `${cn.default}`

    return (
        <nav className={cn.navbar}>
            <ul>
                <li><NavLink to={'/profile'}
                             className={cln}>Profile</NavLink></li>
                <li><NavLink to={'/dialogs'}
                             className={cln}>Message</NavLink></li>
                <li><NavLink to={'/users'}
                             className={cln}>Users</NavLink></li>
                <li><NavLink to={'/news'}
                             className={cln}>News</NavLink></li>
                <li><NavLink to={'/'}
                             className={({isActive}) => isActive ? `${cn.default} ${cn.active}` : `${cn.default}`}>Settings/Main</NavLink></li>
            </ul>
            <div style={{background: '#fff', marginTop: 25, padding: 15, boxShadow: '#dce1e6'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Accusantium
                dolores illum nam nobis nostrum qui quos saepe velit vitae voluptatibus. Accusantium amet ducimus enim
                repudiandae?


            </div>
        </nav>
    );
}