import React, {useState} from 'react';
import {connect} from 'react-redux';
import {createStudent} from '../../actions/students';
import CSRFToken from "../../components/CSRFToken";

const CreateStudent = ({createStudent, error}) => {

    const [formData, setFormData] = useState({
        email: '',
        study_program_name: '',
        study_cycle: '',
        study_year: '',
        study_domain: '',
        study_form: '',
        funding: '',
        full_name: '',
        sex: ''
    });

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        createStudent(formData);
    };

    return (
        <div className="container">
            <CSRFToken/>
            <h1 className="mt-3">Adaugă Student:</h1>

            {error && <p>{error}</p>}
            <div className="mt-3">

                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control custom-input"
                            placeholder="Introduceți adresa de email"
                            name="email"
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
                            onChange={onChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary custom-button">Adaugă student</button>
                </form>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    error: state.student.error
});

export default connect(mapStateToProps, {createStudent})(CreateStudent);