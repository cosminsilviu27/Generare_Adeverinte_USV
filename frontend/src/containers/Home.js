import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {googleAuth} from '../actions/auth';
import axios from "axios";

const Home = () => {
    const continueWithGoogle = () => {
        googleAuth();
    };

    return (
        <div className='container' style={{maxWidth: '1300px', margin: '50px auto 0'}}>
            <div className='jumbotron mt-5' style={{padding: '2rem 2rem'}}>
                <h1 className='display-4'>Generare Adeverințe</h1>
                <p className='lead'>Sistem digital pentru generarea de adeverinte</p>
                <hr className='my-4'/>
                <div className="text-center mb-4">
                    <h1>UNIVERSITATEA „ȘTEFAN CEL MARE” DIN SUCEAVA</h1>
                    <h2>FACULTATEA DE INGINERIE ELECTRICĂ ȘI ȘTIINȚA CALCULATOARELOR</h2>
                </div>
                <p>Alegeți tipul de utilizator pentru înregistrare:</p>
                <div className='d-flex justify-content-around mt-4'>
                    <Link className='btn btn-primary btn-lg' to='/student' role='button'>Înregistrează-te ca și
                        Student</Link>
                    <button className='btn btn-secondary btn-lg' onClick={continueWithGoogle}>Înregistrează-te ca și
                        Secretară
                    </button>
                    <Link className='btn btn-success btn-lg' to='/login-admin' role='button'>Înregistrează-te ca și
                        Administrator</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
