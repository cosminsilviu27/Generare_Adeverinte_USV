import React, {useState} from 'react';
import {downloadAllCertificates, resetApplication} from "../../actions/admin";
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";

const ResetApplication = ({resetApplication, downloadAllCertificates}) => {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const onSubmit = e => {
        e.preventDefault();

        downloadAllCertificates().then(() => {
            resetApplication(navigate);
        });
    };

    return (
        <div className='container'>
            <h1 className='mt-3'>Resetează aplicația:</h1>

            {error && <p>{error}</p>}

            <p className='mt-3 mb-3'>Sunteți sigur că vreți să resetați aplicația?</p>
            <button className='btn btn-danger mt-3' onClick={onSubmit}>Resetează</button>
        </div>
    );
};

const mapStateToProps = (state) => ({
    error: state.admin.error
});

export default connect(mapStateToProps, {resetApplication, downloadAllCertificates})(ResetApplication);
