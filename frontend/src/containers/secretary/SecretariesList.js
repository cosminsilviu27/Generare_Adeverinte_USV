import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchSecretariesList} from '../../actions/secretaries';
import CSRFToken from '../../components/CSRFToken';
import {Link} from 'react-router-dom'; 

const SecretariesList = ({fetchSecretariesList, secretaries, error}) => {
    useEffect(() => {
        fetchSecretariesList();
    }, [fetchSecretariesList]);

    return (
        <div className="container">
            <CSRFToken/>
            <h1 className="mt-3">Lista de secretare:</h1>

            {error && <p>{error}</p>}

            <div className="mt-3">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Nume</th>
                        <th>Prenume</th>
                        <th>Titlu</th>
                        <th>Email</th>
                        <th>Acțiuni</th>
                    </tr>
                    </thead>
                    <tbody>
                    {secretaries.map((secretary, index) => (
                        <tr key={index}>
                            <td>{secretary.last_name}</td>
                            <td>{secretary.first_name}</td>
                            <td>{secretary.title}</td>
                            <td>{secretary.email}</td>
                            <td>
                                <Link to={`/edit-secretary/${secretary.id}`} className="btn btn-primary">Edit</Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    secretaries: state.secretary.secretaries,
    error: state.secretary.error
});

export default connect(mapStateToProps, {fetchSecretariesList})(SecretariesList);
