import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {fetchCertificatesList} from '../../actions/certificates';
import {Link} from "react-router-dom";
import {TailSpin} from "react-loader-spinner";
import axios from 'axios';
import Cookies from 'js-cookie';

const CertificatesList = ({fetchCertificatesList, certificates, error}) => {

    useEffect(() => {
        fetchCertificatesList();
    }, [fetchCertificatesList]);

    const downloadCertificates = async () => {
        try {
            const config = {
                headers: {
                    'X-CSRFToken': Cookies.get('csrftoken'),
                    'Content-Type': 'text/csv'
                },
                responseType: 'blob'
            };
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/certificates/download`, config);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'certificates.csv');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error("Error downloading the certificates: ", error);
        }
    };

    return (
        <div className="container">
            <h1 className="mt-3">Lista de solicitări:</h1>

            {error && <p>{error}</p>}

            {certificates && certificates.length > 0 ?
                (<>
                    <div className="mt-3">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Nume și prenume student</th>
                                <th>Email student</th>
                                <th>Motiv solicitare</th>
                                <th>Data solicitării</th>
                                <th>Acțiuni</th>
                            </tr>
                            </thead>
                            <tbody>
                            {certificates.map((certificate, index) => (
                                <tr key={index}>
                                    <td>{certificate.student_data?.full_name ?? "-"}</td>
                                    <td>{certificate.student_data?.email ?? "-"}</td>
                                    <td>{certificate.purpose}</td>
                                    <td>{certificate.registration_date}</td>
                                    <td>
                                        <Link to={`/approve-certificate/${certificate.processing_position}`}
                                              className="btn btn-primary mr-2">Aprobă cerere</Link>
                                        <Link to={`/reject-certificate/${certificate.processing_position}`}
                                              className="btn btn-primary ml-2">Refuză cerere</Link>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <button className="btn btn-primary mt-3" onClick={downloadCertificates}>Descarca Adeverintele</button>
                </>) :
                (<div className="justify-content-center d-flex mt-5">
                    <TailSpin height="80" width="80" color="#4fa94d" ariaLabel="tail-spin-loading" radius="1"
                              wrapperStyle={{}} wrapperClass="" visible={true}/>
                </div>)
            }
        </div>
    );
}
const mapStateToProps = (state) => ({
    certificates: state.certificate.certificates,
    error: state.certificate.error
});

export default connect(mapStateToProps, {fetchCertificatesList})(CertificatesList);