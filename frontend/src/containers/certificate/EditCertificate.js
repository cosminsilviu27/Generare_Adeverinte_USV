import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom'; // Import useParams hook
import {connect} from 'react-redux';
import {fetchCertificate1, editCertificate} from '../../actions/certificates';

function validateCertificate(formData) {
    if (formData.status == 'approved' && (!formData.def_number || formData.def_number.trim().length == 0)) {
        return "Introduceți numărul de înregistrare pentru ziua curentă";
    } else if (formData.status == 'rejected' && (!formData.rejection_motive || formData.rejection_motive.trim().length == 0)) {
        return "Introduceți un motiv pentru refuz";
    }

    return "";
}

const EditCertificate = ({fetchCertificate1, editCertificate, certificate, error}) => {
    const navigate = useNavigate();
    const {certificate_id} = useParams(); // Access route parameter using useParams

    useEffect(() => {
        fetchCertificate1(certificate_id);
    }, [fetchCertificate1, certificate_id]);

    const [formData, setFormData] = useState({
        student_email: '',
        student_full_name: '',
        registration_date: '',
        purpose: '',
        id: certificate_id,
        status: '',
        processing_position: '',
        registration_number: '',
        processing_date: '',
        def_number: '',
        rejection_motive: ''
    });

    useEffect(() => {
        if (certificate) {
            setFormData({
                student_email: certificate.student?.email,
                student_full_name: certificate.student?.full_name,
                registration_date: certificate.registration_date,
                purpose: certificate.purpose,
                id: certificate_id,
                status: certificate.status,
                processing_position: certificate.processing_position,
                registration_number: certificate.registration_number,
                processing_date: certificate.processing_date,
                def_number: certificate.def_number,
                rejection_motive: certificate.rejection_motive
            });
        }
    }, [certificate, certificate_id]);

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        const res = validateCertificate(formData);

        if (res == "") {
            editCertificate(certificate_id, formData, navigate);
        } else {
            alert(res);
        }
    };

    return (
        <div className="container">
            <h1 className="mt-3">Modifică Adeverință:</h1>

            {error && <p>{error}</p>}
            <div className="mt-3">
                <form onSubmit={onSubmit}>
                    {certificate && (
                        <>
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
                                <label htmlFor="statusAdeverinta">Status adeverință</label>
                                <select
                                    id="statusAdeverinta"
                                    className="form-control custom-input"
                                    name="status"
                                    value={formData.status}
                                    onChange={onChange}
                                >
                                    <option value="approved">Aprobată</option>
                                    <option value="rejected">Respinsă</option>
                                </select>
                            </div>
                            {formData.status == 'approved' ?
                                (<div className="form-group">
                                    <label>Număr înregistrare adeverință</label>
                                    <input
                                        type="text"
                                        className="form-control custom-input"
                                        placeholder="Introduceți numărul de înregistrare pentru ziua curentă"
                                        name="def_number"
                                        value={formData.def_number}
                                        onChange={onChange}
                                    />
                                </div>)
                                :
                                (<div className="form-group">
                                        <label>Motiv refuz adeverință</label>
                                        <input
                                            type="text"
                                            className="form-control custom-input"
                                            placeholder="Introduceți un motiv pentru refuz"
                                            name="rejection_motive"
                                            value={formData.rejection_motive}
                                            onChange={onChange}
                                        />
                                    </div>
                                )
                            }
                            <button type="submit" className="btn btn-primary custom-button">Modifică adeverința</button>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    certificate: state.certificate.certificate,
    error: state.certificate.error
});

export default connect(mapStateToProps, {fetchCertificate1, editCertificate})(EditCertificate);
