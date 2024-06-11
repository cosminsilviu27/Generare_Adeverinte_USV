import React from 'react';
import { Link } from 'react-router-dom';
import { googleAuth } from '../actions/auth';

const Home = () => {
    const continueWithGoogle = () => {
        googleAuth(); 
    };

    return (
        <div className='container'>
            <div className='jumbotron mt-5'>
                <h1 className='display-4'>Generare Adeverințe</h1>
                <p className='lead'>Sistem digital pentru generarea de adeverinte</p>
                <hr className='my-4' />
                <div className="text-center mb-4">
                    <h3>UNIVERSITATEA „ȘTEFAN CEL MARE” DIN SUCEAVA</h3>
                    <h4>FACULTATEA DE INGINERIE ELECTRICĂ ȘI ȘTIINȚA CALCULATOARELOR</h4>
                </div>
                <p>Alegeți tipul de utilizator pentru înregistrare:</p>
                <div className='btn-group' role='group' aria-label='Basic example'>
                    <Link className='btn btn-primary' to='/student' role='button'>Înregistrează-te ca și Student</Link>
                    <button className='btn btn-secondary' onClick={continueWithGoogle}>Înregistrează-te ca și Secretară</button>
                    <Link className='btn btn-success' to='/login-admin' role='button'>Înregistrează-te ca și Administrator</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
