import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginAdmin } from '../../actions/auth';
import CSRFToken from '../../components/CSRFToken';

const LoginAdmin = ({ loginAdmin, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    let navigate = useNavigate();
    const { username, password } = formData;

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/admin');
        }
    }, [isAuthenticated, navigate]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        loginAdmin(username, password);
    };

    return (
        <div className='container mt-5'>
            <div className='text-center mb-5'>
                <h2>UNIVERSITATEA „ȘTEFAN CEL MARE” DIN SUCEAVA</h2>
                <h3>FACULTATEA DE INGINERIE ELECTRICĂ ȘI ȘTIINȚA CALCULATOARELOR</h3>
            </div>
            <h1>Conectare</h1>
            <h2>Conectați-vă la contul de Administrator</h2>
            <form onSubmit={e => onSubmit(e)}>
                <CSRFToken />
                <div className='form-group'>
                    <label className='form-label'>Nume utilizator: </label>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Username*'
                        name='username'
                        onChange={e => onChange(e)}
                        value={username}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label className='form-label mt-3'>Parola: </label>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Password*'
                        name='password'
                        onChange={e => onChange(e)}
                        value={password}
                        minLength='6'
                        required
                    />
                </div>
                <button className='btn btn-primary mt-3' type='submit'>Înregistrează-te</button>
            </form>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { loginAdmin })(LoginAdmin);
