import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleRedirectToSecretaries = () => {
        navigate('/get-secretaries-list');
    };

    const handleRedirectToDashboard = () => {
        navigate('/dashboard');
    };

    const handleRedirectToStudents = () => {
        navigate('/get-students-list');
    };

    const handleRedirectToFaculties = () => {
        navigate('/get-faculties-list');
    };

    const handleRedirectToReset = () => {
        navigate('/reset-application');
    }


    const buttonStyle = {
        width: '100%', 
        height: '53px',
        marginBottom: '15px', 
        fontSize: '20px', 
    };

    const flexContainerStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    };

    const flexItemStyle = {
        width: '45%', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    };

    return (
        <div className='container mt-5'>
            <div className='text-center mb-5'>
                <h2>UNIVERSITATEA „ȘTEFAN CEL MARE” DIN SUCEAVA</h2>
                <h3>FACULTATEA DE INGINERIE ELECTRICĂ ȘI ȘTIINȚA CALCULATOARELOR</h3>
            </div>
            <h1 style={{ textAlign: 'left' }}>Pagina Administratorului</h1>
            <div style={flexContainerStyle}>
                <div style={flexItemStyle}>
                    <button className='btn btn-secondary' style={buttonStyle} onClick={handleRedirectToDashboard}>
                        Editează Profilul
                    </button>
                    <button className='btn btn-primary' style={buttonStyle} onClick={handleRedirectToSecretaries}>
                        Vizualizează Lista Secretarelor
                    </button>
                </div>
                <div style={flexItemStyle}>
                    <button className='btn btn-info' style={buttonStyle} onClick={handleRedirectToStudents}>
                        Vizualizează Lista Studenților
                    </button>
                    <button className='btn btn-success' style={buttonStyle} onClick={handleRedirectToFaculties}>
                        Vizualizează Lista Facultăților
                    </button>
                </div>
                <div style={flexItemStyle}>
                    <button className='btn btn-danger' style={buttonStyle} onClick={handleRedirectToReset}>
                        Resetează Aplicația
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
