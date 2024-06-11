import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom'; // Import useParams hook
import {connect} from 'react-redux';
import {fetchSecretary, updateSecretary} from '../../actions/secretaries';
import CSRFToken from "../../components/CSRFToken";

const EditSecretary = ({fetchSecretary, updateSecretary, secretary, error}) => {
    const {secretary_id} = useParams(); // Access route parameter using useParams
    const navigate = useNavigate();

     useEffect(() => {
        fetchSecretary(secretary_id);
    }, [fetchSecretary, secretary_id]);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        title: '',
        id: secretary_id
    });

    useEffect(() => {
        if (secretary) {
            setFormData({
                first_name: secretary.first_name,
                last_name: secretary.last_name,
                email: secretary.email,
                title: secretary.title,
                id: secretary_id
            });
        }
    }, [secretary, secretary_id]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        updateSecretary(secretary_id, formData, navigate);
    };

    return (
        <div className="container">
            <h1 className="mt-3">Modifică Secretară:</h1>

            {error && <p>{error}</p>}
            <div className="mt-3">
                <form onSubmit={onSubmit}>
                    {secretary && (
                        <>
                            <div className="form-group">
                                <label>Prenume</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    placeholder="Introduceți prenumele"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Nume</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    placeholder="Introduceți numele de familie"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={onChange}
                                />
                            </div>
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
                                <label>Titlu</label>
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    placeholder="Introduceți titlul"
                                    name="title"
                                    value={formData.title}
                                    onChange={onChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary custom-button">Modifică secretară</button>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    secretary: state.secretary.secretary,
    error: state.secretary.error
});

export default connect(mapStateToProps, {fetchSecretary, updateSecretary})(EditSecretary);
