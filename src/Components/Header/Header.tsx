import React from 'react';
import style from './Header.module.scss';
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
        <header className={style.header}>
            <div className={'container'}>
                <div className={style.logo}>Logo</div>
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