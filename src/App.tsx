import React from 'react';
import {Navbar} from './Components/Navbar/Navbar';
import {Content} from './Components/Content/Content';
import {BrowserRouter} from 'react-router-dom';
import HeaderContainer from './Components/Header/HeaderContainer';
import {useDispatch, useSelector} from 'react-redux';
import {initializeApp} from './redux/reducers/app-reducer';
import {AppStateType} from './redux/reducers';
import {Preloader} from './Components/Preloader/Preloader';


type AppPropsType = {

}

export const App: React.FC<AppPropsType> = () => {

    const isInitialized = useSelector<AppStateType, boolean>(state => state.app.isInitialized)
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(initializeApp())
    }, [])

    if (!isInitialized) return <Preloader />

    return (
        <BrowserRouter>
            <div className="App">
                <HeaderContainer/>
                <div className={'container'}>
                    <Navbar/>
                    <Content />
                </div>
            </div>
        </BrowserRouter>
    );
}
