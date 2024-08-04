'use client';

import ClipLoader from 'react-spinners/Cliploader';

const override = {
    display: 'block',
    margin: '100px auto',
};


const LoadingPage = () => {
    return ( <ClipLoader color="#3B82F6" size={150} cssOverride={override} /> );
}
 
export default LoadingPage;