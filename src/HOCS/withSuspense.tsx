import React from 'react';
import {Preloader} from '../Components/Preloader/Preloader';

export const withSuspense = (Comp: JSX.Element) => {

    const SuspendedComponent = (props: any) => {
        return (
            <React.Suspense fallback={<Preloader />}>
                {/*@ts-ignore*/}
                <Comp {...props} />
            </React.Suspense>
        ) 
    }

    return SuspendedComponent
}