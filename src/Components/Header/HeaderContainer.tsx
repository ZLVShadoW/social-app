import React from 'react';
import { connect } from 'react-redux';
import {Header} from './Header';
import {AppStateType} from '../../redux/reducers';
import { setAuthUserData } from '../../redux/reducers/auth-reducer';
import axios from 'axios';

type HeaderContainerType = MapStatePropsType & MapDispatchPropsType

class HeaderContainer extends React.Component<HeaderContainerType, {}> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true})
            .then(res => {
                if (res.data.resultCode === 0) {
                    const {id, login, email} = res.data.data
                    this.props.setAuthUserData(id, login, email)
                }
            })
    }

    render() {
        return (
            <Header {...this.props} login={this.props.login} isAuth={this.props.isAuth} />
        )
    }
}

type MapStatePropsType = {
    login: string | null
    isAuth: boolean
}

type MapDispatchPropsType = {
    setAuthUserData: (userId: number, login: string, email: string) => void
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        login: state.auth.login,
        isAuth: state.auth.isAuth
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {setAuthUserData})(HeaderContainer)