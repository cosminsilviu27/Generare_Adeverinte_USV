import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {connect} from "react-redux";
import {addSecretary} from "../../actions/secretaries";

const AddSecretary = ({addSecretary, error}) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        title: ''
    });

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        addSecretary(formData, navigate);
    };

    return (
        <div className="container">
            <h1 className="mt-3">Adaugă Secretară:</h1>

            {error && <p>{error}</p>}
            <div className="mt-3">

                <form onSubmit={onSubmit}>
                    <div className={"form-group"}>
                        <label>Prenume</label>
                        <input
                            type="text"
                            className="form-control custom-input"
                            placeholder="Introduceți prenumele"
                            name="first_name"
                            onChange={onChange}
                        />
                    </div>
                    <div className={"form-group"}>
                        <label>Nume</label>
                        <input
                            type="text"
                            className="form-control custom-input"
                            placeholder="Introduceți numele"
                            name="last_name"
                            onChange={onChange}
                        />
                    </div>
                    <div className={"form-group"}>
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control custom-input"
                            placeholder="Introduceți adresa de email"
                            name="email"
                            onChange={onChange}
                        />
                    </div>
                    <div className={"form-group"}>
                        <label>Titlu</label>
                        <input
                            type="text"
                            className="form-control custom-input"
                            placeholder="Introduceți titlul"
                            name="title"
                            onChange={onChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary custom-button">Adaugă secretară</button>
                </form>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    error: state.secretary.error
});

export default connect(mapStateToProps, {addSecretary})(AddSecretary);