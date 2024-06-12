import React, {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom'; // Import useParams hook
import {connect} from 'react-redux';
import {fetchStudent, deleteStudent} from '../../actions/students';

const DeleteStudent = ({fetchStudent, deleteStudent, student, error}) => {
    const navigate = useNavigate();

    const {student_id} = useParams(); // Access route parameter using useParams

     useEffect(() => {
        fetchStudent(student_id);
    }, [fetchStudent, student_id]);

    const onSubmit = e => {
        e.preventDefault();
        deleteStudent(student_id, navigate);
    };

    return (
        <div className="container">
            <h1 className="mt-3">Șterge Student:</h1>

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
                                    value={student.email}
                                    disabled={true}
                                />
                            </div>
                            <div className="form-group">
                                <label>Numele Programului de Studiu</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    placeholder="Introduceți numele programului de studiu"
                                    name="study_program_name"
                                    value={student.study_program_name}
                                    disabled={true}
                                />
                            </div>
                            <div className="form-group">
                                <label>Ciclu de Studii</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    placeholder="Introduceți ciclul de studii"
                                    name="study_cycle"
                                    value={student.study_cycle}
                                    disabled={true}
                                />
                            </div>
                            <div className="form-group">
                                <label>Anul de Studiu</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    placeholder="Introduceți anul de studiu"
                                    name="study_year"
                                    value={student.study_year}
                                    disabled={true}
                                />
                            </div>
                            <div className="form-group">
                                <label>Domeniul de Studiu</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    placeholder="Introduceți domeniul de studiu"
                                    name="study_domain"
                                    value={student.study_domain}
                                    disabled={true}
                                />
                            </div>
                            <div className="form-group">
                                <label>Forma de Studiu</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    placeholder="Introduceți forma de studiu"
                                    name="study_form"
                                    value={student.study_form}
                                    disabled={true}
                                />
                            </div>
                            <div className="form-group">
                                <label>Finanțare</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    placeholder="Introduceți finanțarea"
                                    name="funding"
                                    value={student.funding}
                                    disabled={true}
                                />
                            </div>
                            <div className="form-group">
                                <label>Numele complet</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    placeholder="Introduceți numele complet"
                                    name="full_name"
                                    value={student.full_name}
                                    disabled={true}
                                />
                            </div>
                            <div className="form-group">
                                <label>Sex</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    placeholder="Introduceți sexul"
                                    name="sex"
                                    value={student.sex}
                                    disabled={true}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary custom-button">Șterge student</button>
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

export default connect(mapStateToProps, {fetchStudent, deleteStudent})(DeleteStudent);