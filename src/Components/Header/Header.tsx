import React from 'react';
import cn from './Header.module.scss';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';

type HeaderType = {
    login: string | null
    isAuth: boolean
    logout: () => void
}

export const Header: React.FC<HeaderType> = ({isAuth, login, logout}) => {
    const dispatch = useDispatch()

    return (
        <header className={cn.header}>
            <div className={'container'}>
                <div>header</div>
                <div>
                    {
                        isAuth
                            ? <>hi, {` ${login} `}
                                <button onClick={() => dispatch(logout())}>выйти</button>
                            </>
                            : <Link to={'/login'}>Login</Link>
                    }
                </div>
            </div>
        </header>
    )
}