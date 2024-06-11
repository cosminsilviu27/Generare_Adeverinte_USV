import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchCertificatesList} from '../../actions/certificates';
import CSRFToken from '../../components/CSRFToken';

const CertificatesList = ({fetchCertificatesList, certificates, error}) => {
    useEffect(() => {
        fetchCertificatesList();
    }, [fetchCertificatesList]);

    return (
        <div className="container">
            <CSRFToken/>
            <h1 className="mt-3">Lista de solicitări:</h1>

            {error && <p>{error}</p>}

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
                            <td></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    certificates: state.certificate.certificates,
    error: state.certificate.error
});

export default connect(mapStateToProps, {fetchCertificatesList})(CertificatesList);
