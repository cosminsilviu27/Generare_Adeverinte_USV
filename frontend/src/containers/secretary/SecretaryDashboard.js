import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {TailSpin} from "react-loader-spinner";
import Cookies from 'js-cookie';
import {GOOGLE_AUTH_SUCCESS} from "../../actions/types";
import {useDispatch} from "react-redux";

const SecretaryDashboard = () => {
        const navigate = useNavigate();
        const [isSecretary, setIsSecretary] = useState(null); // Use null to indicate loading state
        const dispatch = useDispatch();

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

                        if (secretariesEmails.includes(userEmail)) {
                            setIsSecretary(true);

                            dispatch({
                                type: GOOGLE_AUTH_SUCCESS
                            })

                        } else {
                            navigate('/secretary');
                        }
                    } else {
                        navigate('/secretary');
                    }
                } catch (err) {
                    console.error('Error fetching email or secretaries:', err);
                    navigate('/secretary');
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
            return (
                <div className='container mt-5'>
                    <div className="justify-content-center d-flex mt-5">
                        <TailSpin height="80" width="80" color="#4fa94d" ariaLabel="tail-spin-loading" radius="1"
                                  wrapperStyle={{}} wrapperClass="" visible={true}/>
                    </div>
                </div>
            );
        }

        if (!isSecretary) {
            return null; // Don't render anything if the user is not a secretary
        }

        return (
            <div className='container mt-5'>
                <div className='text-center mb-5'>
                    <h2>UNIVERSITATEA „ȘTEFAN CEL MARE” DIN SUCEAVA</h2>
                </div>
                <h1 style={{textAlign: 'left'}}>Pagina Secretarei</h1>
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
                        <button className='btn btn-success' style={buttonStyle}
                                onClick={handleRedirectToRejectedCertificates}>
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
                        <button className='btn btn-warning text-white' style={buttonStyle}
                                onClick={handleRedirectToFaculties}>
                            Vizualizează Lista Facultăților
                        </button>
                    </div>
                </div>
            </div>
        );
    }
;

export default SecretaryDashboard;
