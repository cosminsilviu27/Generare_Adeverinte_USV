import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import axios from 'axios';

const SecretaryDashboard = ({ isAuthenticated }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchEmail = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/profiles/update-profile/`);
                setEmail(res.data.email);
            } catch (err) {
                console.error('Error fetching email:', err);
            }
        };

        fetchEmail();
    }, [dispatch]);

    const handleRedirectToStudents = () => {
        navigate('/get-students-list');
    };

    const handleRedirectToFaculties = () => {
        navigate('/get-faculties-list');
    };

    const handleRedirectToCertificates = () => {
        navigate('/get-certificates-list');
    };

    const handleRedirectToApprovedCertificates = () => {
        navigate('/get-approved-certificates-list');
    };

    const handleRedirectToRejectedCertificates = () => {
        navigate('/get-rejected-certificates-list');
    };

    const buttonStyle = {
        width: '100%', height: '53px', marginBottom: '15px', fontSize: '20px',
    };

    const flexContainerStyle = {
        display: 'flex', justifyContent: 'space-around',
    };

    const flexItemStyle = {
        width: '45%', display: 'flex', flexDirection: 'column', alignItems: 'center'
    };

    return (
        <div className='container mt-5'>
            <div className='text-center mb-5'>
                <h2>UNIVERSITATEA „ȘTEFAN CEL MARE” DIN SUCEAVA</h2>
            </div>
            <h1 style={{ textAlign: 'left' }}>Pagina Secretarei</h1>
            {email && <p>Emailul tău: {email}</p>}
            <div style={flexContainerStyle}>
                <div style={flexItemStyle}>
                    <button className='btn btn-secondary' style={buttonStyle} onClick={handleRedirectToCertificates}>
                        Vizualizează Lista Cererilor de Adeverințe
                    </button>
                </div>
            </div>
            <div style={flexContainerStyle}>
                <div style={flexItemStyle}>
                    <button className='btn btn-info' style={buttonStyle} onClick={handleRedirectToApprovedCertificates}>
                        Vizualizează Lista Adeverințelor Aprobate
                    </button>
                </div>
                <div style={flexItemStyle}>
                    <button className='btn btn-success' style={buttonStyle} onClick={handleRedirectToRejectedCertificates}>
                        Vizualizează Lista Adeverințelor Refuzate
                    </button>
                </div>
            </div>
            <div style={flexContainerStyle}>
                <div style={flexItemStyle}>
                    <button className='btn btn-primary' style={buttonStyle} onClick={handleRedirectToStudents}>
                        Vizualizează Lista Studenților
                    </button>
                </div>
                <div style={flexItemStyle}>
                    <button className='btn btn-warning' style={buttonStyle} onClick={handleRedirectToFaculties}>
                        Vizualizează Lista Facultăților
                    </button>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, null)(SecretaryDashboard);
