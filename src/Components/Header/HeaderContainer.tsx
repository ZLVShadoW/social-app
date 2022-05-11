import React from 'react';
import {connect} from 'react-redux';
import {Header} from './Header';
import {AppStateType} from '../../redux/reducers';
import {getAuthUserData, logout} from '../../redux/reducers/auth-reducer';

type HeaderContainerType = MapStatePropsType & MapDispatchPropsType

class HeaderContainer extends React.Component<HeaderContainerType, {}> {

    componentDidMount() {
        this.props.getAuthUserData()
    }

    render() {
        return (
            <Header {...this.props} login={this.props.login} isAuth={this.props.isAuth}/>
        )
    }
}

type MapStatePropsType = {
    login: string | null
    isAuth: boolean
}

type MapDispatchPropsType = {
    getAuthUserData: () => void
    logout: () => void
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        login: state.auth.login,
        isAuth: state.auth.isAuth
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {getAuthUserData, logout})(HeaderContainer)