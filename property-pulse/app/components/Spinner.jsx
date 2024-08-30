import ClipLoader from 'react-spinners/ClipLoader';

const override = {
    display: 'block',
    margin: '100px auto',
};


const Spinner = () => {
    return ( <ClipLoader color="#3B82F6" size={150} cssOverride={override} /> );
}
 
export default Spinner;