import React from 'react';
import {Preloader} from '../Components/Preloader/Preloader';

export function withSuspense <WCP>(Comp: React.ComponentType<WCP>) {

    return (props: WCP) => {
        return (
            <React.Suspense fallback={<Preloader />}>
                <Comp {...props} />
            </React.Suspense>
        )
    }
}