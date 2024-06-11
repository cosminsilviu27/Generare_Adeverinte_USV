import React from 'react';
import { Link } from 'react-router-dom';

const Student = () => {

    const continueWithGoogle = () => {
        window.location.href = `${process.env.REACT_APP_GOOGLE_FORM_LINK}`;
    };

    return (
        <div className='container mt-5'>
            <h1>Înregistrează-te ca și student</h1>
            <p>STUDENT</p>
            <button className='btn btn-danger mt-3' onClick={continueWithGoogle}>
                COMPLETEAZA FORMULARUL
            </button>
            <br />
        </div>
    );
};



export default Student;