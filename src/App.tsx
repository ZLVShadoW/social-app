import React from 'react';
import {Navbar} from './Components/Navbar/Navbar';
import {Content} from './Components/Content/Content';
import {BrowserRouter} from 'react-router-dom';
import HeaderContainer from './Components/Header/HeaderContainer';


type AppPropsType = {

}

export const App: React.FC<AppPropsType> = () => {
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
