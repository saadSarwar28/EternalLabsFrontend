import React from 'react';
import {ScaleLoader} from 'react-spinners';

export const Loader = () => {

    const loaderColor = '#2AB6A0'

    return (
        <ScaleLoader color={loaderColor} width={10} height={25}/>
    )
}

export default Loader
