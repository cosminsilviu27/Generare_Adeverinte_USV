import React, {useState} from 'react';
import CSRFToken from '../../components/CSRFToken';
import {updateSecretariesList} from "../../actions/secretaries";
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";

const UploadSecretariesForm = ({updateSecretariesList}) => {
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleFileChange = e => setFile(e.target.files[0]);

    const onSubmit = e => {
        e.preventDefault();

        if (!file) {
            setErrorMessage('Niciun fișier selectat! Vă rugăm selectați un fișier');
            return;
        }

        const fileName = file.name;
        const fileExtension = fileName.split('.').pop(); // Get the last part after splitting by '.'

        if (fileExtension !== 'csv' && fileExtension !== 'xlsx') {
            setErrorMessage('Formatul fișierului este greșit! Vă rugăm selectați un fișier cu extensia .xlsx sau .csv.')
            return;
        }

        updateSecretariesList(file, navigate);
    };

    return (
        <div className='container'>
            <h1 className='mt-3'>Actualizați lista de secretare:</h1>
            <p className='mt-3 mb-3'>Încărcați un fișier ce conține noua listă de secretare:</p>

            <form onSubmit={e => onSubmit(e)}>
                <input
                    className='form-control'
                    type='file'
                    name='file'
                    onChange={e => handleFileChange(e)}
                    required
                    accept='.xlsx,.csv'
                />
                {errorMessage && <p>{errorMessage}</p>}
                <button className='btn btn-primary mt-3' type='submit'>Upload</button>
            </form>
        </div>
    );
};

export default connect(null, {updateSecretariesList})(UploadSecretariesForm);
