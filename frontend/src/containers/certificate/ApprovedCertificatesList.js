import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchApprovedCertificatesList, downloadCertificates} from '../../actions/certificates';
import {Link} from "react-router-dom";
import {TailSpin} from "react-loader-spinner";

const ApprovedCertificatesList = ({fetchApprovedCertificatesList, downloadCertificates, approvedCertificates, error}) => {

    useEffect(() => {
        fetchApprovedCertificatesList();
    }, [fetchApprovedCertificatesList]);

    const handleDownload = () => {
        downloadCertificates();
    };

    return (
        <div className="container">
            <div className='mt-3'>
                <Fragment>
                    <Link to={'/print-certificates'} className='btn btn-primary'>Printează adeverințe aprobate</Link>
                </Fragment>
                <Fragment>
                    <button className="btn btn-primary ml-3" onClick={handleDownload}>Descarcă raport adeverințe aprobate</button>
                </Fragment>
            </div>

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
                                <th>Printată</th>
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
                                    <td>{certificate.was_printed ? 'Da' : 'Nu'}</td>
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
    approvedCertificates: state.certificate.approvedCertificates,
    error: state.certificate.error
});

export default connect(mapStateToProps, {fetchApprovedCertificatesList, downloadCertificates})(ApprovedCertificatesList);
