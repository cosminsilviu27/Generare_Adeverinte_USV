import React from 'react';
import { googleAuth } from '../../actions/auth';

const Secretary = () => {
    const continueWithGoogle = () => {
        googleAuth();
        // window.location.href = `${process.env.REACT_APP_API_URL}/accounts/google/login/`;
    };

    return (
        <div className='container mt-5'>
            <h1>Conectare</h1>
            <h2>Conectați-vă la contul de Secretara</h2>
            <button className='btn btn-danger mt-3' onClick={continueWithGoogle}>
                Continue With Google
            </button>
            <br />
        </div>
    );
};



export default Secretary;