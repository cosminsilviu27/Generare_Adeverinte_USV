import React, {useState, useEffect, Fragment} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom'; // Import useParams hook
import {connect} from 'react-redux';
import {fetchCertificate, approveCertificate} from '../../actions/certificates';
import CSRFToken from "../../components/CSRFToken";

function validateCertificate(formData) {
    if (!formData.def_number || formData.def_number.trim().length == 0) {
        return "Introduceți numărul de înregistrare pentru ziua curentă";
    } else if (!formData.student_full_name || formData.student_full_name.trim().length == 0) {
        return "Studentul nu există în baza de date";
    }

    return "";
}

const ApproveCertificate = ({fetchCertificate, approveCertificate, certificate, error}) => {
    const navigate = useNavigate();

    const {processing_position} = useParams(); // Access route parameter using useParams

    useEffect(() => {
        fetchCertificate(processing_position);
    }, [fetchCertificate, processing_position]);

    const [formData, setFormData] = useState({
        def_number: '',
        student_email: '',
        student_full_name: '',
        registration_date: '',
        purpose: '',
        processing_position: processing_position
    });

    useEffect(() => {
        if (certificate) {
            setFormData({
                def_number: certificate.def_number,
                student_email: certificate.email,
                student_full_name: certificate.student_data?.full_name,
                registration_date: certificate.registration_date,
                purpose: certificate.purpose,
                processing_position: processing_position
            });
        }
    }, [certificate, processing_position]);

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        const res = validateCertificate(formData);

        if (res == "") {
            approveCertificate(processing_position, formData, navigate);
        } else {
            alert(res);
        }
    };

    return (
        <div className="container">
            <h1 className="mt-3">Aprobă Cerere Adeverință:</h1>

            {error && <p>{error}</p>}
            {certificate && (
                <>
                    {!formData.student_full_name || formData.student_full_name == '' ?
                        (<div className="mt-3">
                            <Fragment>
                                <Link to={'/create-student'} className='btn btn-primary'>Adaugă student</Link>
                            </Fragment>
                        </div>) :
                        (<></>)}
                    <div className="mt-3">
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <label>Email Student</label>
                                <input
                                    type="email"
                                    className="form-control custom-input"
                                    name="student_email"
                                    value={formData.student_email}
                                    disabled={true}
                                />
                            </div>
                            <div className="form-group">
                                <label>Numele Student</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    name="student_full_name"
                                    value={formData.student_full_name}
                                    disabled={true}
                                />
                            </div>
                            <div className="form-group">
                                <label>Motiv cerere</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    placeholder="Introduceți motiv cerere adeverință"
                                    name="purpose"
                                    value={formData.purpose}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Număr înregistrare adeverință</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    placeholder="Introduceți numărul de înregistrare pentru ziua curentă"
                                    name="def_number"
                                    value={formData.def_number}
                                    onChange={onChange}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary custom-button">Aprobă adeverința</button>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
};

const mapStateToProps = (state) => ({
    certificate: state.certificate.certificate,
    error: state.certificate.error
});

export default connect(mapStateToProps, {fetchCertificate, approveCertificate})(ApproveCertificate);
