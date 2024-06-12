import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {fetchRejectedCertificatesList} from '../../actions/certificates';
import {Link} from "react-router-dom";
import {TailSpin} from "react-loader-spinner";

const RejectedCertificatesList = ({fetchRejectedCertificatesList, rejectedCertificates, error}) => {

    useEffect(() => {
        fetchRejectedCertificatesList();
    }, [fetchRejectedCertificatesList]);

    return (
        <div className="container">
            <h1 className="mt-3">Lista de adeverințe refuzate:</h1>

            {error && <p>{error}</p>}

            {rejectedCertificates && rejectedCertificates.length > 0 ?
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
                            {rejectedCertificates.map((certificate, index) => (
                                <tr key={index}>
                                    <td>{certificate.student?.full_name ?? "-"}</td>
                                    <td>{certificate.student?.email ?? "-"}</td>
                                    <td>{certificate.purpose}</td>
                                    <td>{certificate.registration_date}</td>
                                    <td>
                                        <Link to={`/edit-certificate/${certificate.id}`}
                                              className="btn btn-primary mr-2">Modifică</Link>
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
    rejectedCertificates: state.certificate.rejectedCertificates,
    error: state.certificate.error
});

export default connect(mapStateToProps, {fetchRejectedCertificatesList})(RejectedCertificatesList);
