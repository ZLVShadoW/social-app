import React from 'react';
import {connect} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {AppStateType} from '../redux/reducers';

type MapStatePropsType = {
    isAuth: boolean
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({isAuth: state.auth.isAuth})

export const withAuthRedirect = <P extends object>(Component: React.ComponentType<P>): React.FC<P> => {

    const WithRedirect: React.FC<MapStatePropsType> = ({isAuth, ...props}) => {

        if (!isAuth) return <Navigate to={'/login'}/>
        return (
            <Component {...props as P} />
        )
    }
    return connect(mapStateToProps)(WithRedirect)
}