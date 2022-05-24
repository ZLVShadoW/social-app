import React from 'react';
import cn from './Header.module.scss';
import {Link} from 'react-router-dom';
import {SButton} from '../SButton/SButton';

type HeaderType = {
    login: string | null
    isAuth: boolean
    logout: () => void
}

export const Header: React.FC<HeaderType> = ({isAuth, login, logout}) => {

    const logoutHandle = () => {
        logout()
    }

    return (
        <header className={cn.header}>
            <div className={'container'}>
                <div>header</div>
                <div>
                    {
                        isAuth
                            ? <>hi, {` ${login} `}
                                <SButton onClick={logoutHandle}>выйти</SButton>
                            </>
                            : <Link to={'/login'}>Login</Link>
                    }
                </div>
            </div>
        </header>
    )
}