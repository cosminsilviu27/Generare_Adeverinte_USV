import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { fetchSecretariesList } from '../../actions/secretaries';

const SecretaryDashboard = ({ fetchSecretariesList, secretaries, error }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isSecretary, setIsSecretary] = useState(null); // Use null to indicate loading state

    const config = {
        headers: {
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    useEffect(() => {
        const fetchEmailAndCheckSecretary = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/profiles/update-profile/`);
                const userEmail = res.data.email;

                if (userEmail) {
                    const secretariesRes = await axios.get(`${process.env.REACT_APP_API_URL}/secretaries/getSecretariesList`, config);
                    const secretariesEmails = secretariesRes.data.data.map(secretary => secretary.email);

                    setEmail(userEmail);

                    if (secretariesEmails.includes(userEmail)) {
                        setIsSecretary(true);
                    } else {
                        navigate('/secretary'); // Redirect if email is not found in secretaries list
                    }
                } else {
                    navigate('/secretary'); // Redirect to login if email is not found
                }
            } catch (err) {
                console.error('Error fetching email or secretaries:', err);
                navigate('/secretary'); // Redirect to login if there's an error
            }
        };

        fetchEmailAndCheckSecretary();
    }, [navigate]);

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

    if (isSecretary === null) {
        return <div>Loading...</div>; // Show a loading state until the check is done
    }

    if (!isSecretary) {
        return null; // Don't render anything if the user is not a secretary
    }

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
                    <button className='btn btn-info' style={buttonStyle} onClick={handleRedirectToStudents}>
                        Vizualizează Lista Studenților
                    </button>
                </div>
                <div style={flexItemStyle}>
                    <button className='btn btn-success' style={buttonStyle} onClick={handleRedirectToFaculties}>
                        Vizualizează Lista Facultăților
                    </button>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    secretaries: state.secretary.secretaries,
    error: state.secretary.error,
});

export default connect(mapStateToProps, { fetchSecretariesList })(SecretaryDashboard);
