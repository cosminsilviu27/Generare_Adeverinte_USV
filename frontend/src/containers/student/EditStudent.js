import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom'; // Import useParams hook
import {connect} from 'react-redux';
import {fetchStudent, updateStudent} from '../../actions/students';
import CSRFToken from "../../components/CSRFToken";

const EditStudent = ({fetchStudent, updateStudent, student, error}) => {
    const navigate = useNavigate();

    const {student_id} = useParams(); // Access route parameter using useParams

     useEffect(() => {
        fetchStudent(student_id);
    }, [fetchStudent, student_id]);

    const [formData, setFormData] = useState({
        email: '',
        study_program_name: '',
        study_cycle: '',
        study_year: '',
        study_domain: '',
        study_form: '',
        funding: '',
        full_name: '',
        sex: '',
        id: student_id
    });

    useEffect(() => {
        if (student) {
            setFormData({
                email: student.email,
                study_program_name: student.study_program_name,
                study_cycle: student.study_cycle,
                study_year: student.study_year,
                study_domain: student.study_domain,
                study_form: student.study_form,
                funding: student.funding,
                full_name: student.full_name,
                sex: student.sex,
                id: student_id
            });
        }
    }, [student, student_id]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        updateStudent(student_id, formData, navigate);
    };

    return (
        <div className="container">
            <h1 className="mt-3">Modifică Student:</h1>

            {error && <p>{error}</p>}
            <div className="mt-3">
                <form onSubmit={onSubmit}>
                    {student && (
                        <>
                              <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control custom-input"
                                    placeholder="Introduceți adresa de email"
                                    name="email"
                                    value={formData.email}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Numele Programului de Studiu</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    placeholder="Introduceți numele programului de studiu"
                                    name="study_program_name"
                                    value={formData.study_program_name}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Ciclu de Studii</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    placeholder="Introduceți ciclul de studii"
                                    name="study_cycle"
                                    value={formData.study_cycle}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Anul de Studiu</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    placeholder="Introduceți anul de studiu"
                                    name="study_year"
                                    value={formData.study_year}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Domeniul de Studiu</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    placeholder="Introduceți domeniul de studiu"
                                    name="study_domain"
                                    value={formData.study_domain}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Forma de Studiu</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    placeholder="Introduceți forma de studiu"
                                    name="study_form"
                                    value={formData.study_form}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Finanțare</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    placeholder="Introduceți finanțarea"
                                    name="funding"
                                    value={formData.funding}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Numele complet</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    placeholder="Introduceți numele complet"
                                    name="full_name"
                                    value={formData.full_name}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Sex</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    placeholder="Introduceți sexul"
                                    name="sex"
                                    value={formData.sex}
                                    onChange={onChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary custom-button">Modifică student</button>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    student: state.student.student,
    error: state.student.error
});

export default connect(mapStateToProps, {fetchStudent, updateStudent})(EditStudent);