import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {fetchApprovedCertificatesList} from '../../actions/certificates';
import {Link} from "react-router-dom";
import {TailSpin} from "react-loader-spinner";

const ApprovedCertificatesList = ({fetchApprovedCertificatesList, approvedCertificates, error}) => {

    useEffect(() => {
        fetchApprovedCertificatesList();
    }, [fetchApprovedCertificatesList]);

    return (
        <div className="container">
            <h1 className="mt-3">Lista de adeverințe aprobate:</h1>

            {error && <p>{error}</p>}

            {approvedCertificates && approvedCertificates.length > 0 ?
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
                            {approvedCertificates.map((certificate, index) => (
                                <tr key={index}>
                                    <td>{certificate.student?.full_name ?? "-"}</td>
                                    <td>{certificate.student?.email ?? "-"}</td>
                                    <td>{certificate.purpose}</td>
                                    <td>{certificate.registration_date}</td>
                                    <td>
                                        <Link to={`/edit-certificate/${certificate.id}`}
                                              className="btn btn-primary mr-2">Modifică cerere</Link>
                                        <Link to={`/print-certificate/${certificate.id}`}
                                              className="btn btn-primary ml-2">Listează cerere</Link>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
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
    approvedCertificates: state.certificate.approvedCertificates,
    error: state.certificate.error
});

export default connect(mapStateToProps, {fetchApprovedCertificatesList})(ApprovedCertificatesList);
