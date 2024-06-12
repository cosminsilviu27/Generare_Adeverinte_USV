import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchFaculty, updateFaculty} from '../../actions/faculties';

const EditFaculty = ({fetchFaculty, updateFaculty, faculty, error}) => {
    const navigate = useNavigate();

    const {faculty_id} = useParams();

    useEffect(() => {
        fetchFaculty(faculty_id);
    }, [fetchFaculty, faculty_id]);

    const [formData, setFormData] = useState({
        full_name: '',
        short_name: '',
        current_academic_year: '',
        dean_name: '',
        chief_secretary_first_name: '',
        chief_secretary_last_name: '',
        id: faculty_id
    });

    useEffect(() => {
        if (faculty) {
            setFormData({
                full_name: faculty.full_name,
                short_name: faculty.short_name,
                current_academic_year: faculty.current_academic_year,
                dean_name: faculty.dean_name,
                chief_secretary_first_name: faculty.chief_secretary.first_name,
                chief_secretary_last_name: faculty.chief_secretary.last_name,
                id: faculty_id
            });
        }
    }, [faculty, faculty_id]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        updateFaculty(faculty_id, formData, navigate);
    };

    return (
        <div className="container">
            <h1 className="mt-3">Modifică Faculty:</h1>

            {error && <p>{error}</p>}
            <div className="mt-3">
                <form onSubmit={onSubmit}>
                    {faculty && (
                        <>
                            <div className="form-group">
                                <label>Nume complet</label>
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
                                <label>Nume scurt</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    placeholder="Introduceți numele scurt"
                                    name="short_name"
                                    value={formData.short_name}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>An universitar curent</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    placeholder="Introduceți anul academic curent"
                                    name="current_academic_year"
                                    value={formData.current_academic_year}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Nume Decan</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    placeholder="Introduceți numele decanului"
                                    name="dean_name"
                                    value={formData.dean_name}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Numele Secretarei șefe</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    placeholder="Introduceți numele secretarei șefe"
                                    name="chief_secretary"
                                    value={formData.chief_secretary_last_name}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Prenumele Secretarei șefe</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    placeholder="Introduceți prenumele secretarei șefe"
                                    name="chief_secretary"
                                    value={formData.chief_secretary_first_name}
                                    onChange={onChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary custom-button">Modifică facultate</button>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    faculty: state.faculty.faculty,
    error: state.faculty.error
});

export default connect(mapStateToProps, {fetchFaculty, updateFaculty})(EditFaculty);