import React, {Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {fetchSecretariesList} from '../../actions/secretaries';
import CSRFToken from '../../components/CSRFToken';
import {Link} from 'react-router-dom';
import {TailSpin} from "react-loader-spinner";

const SecretariesList = ({fetchSecretariesList, secretaries, error}) => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetchSecretariesList().then(() => {
            setIsLoading(false);
        });
    }, [fetchSecretariesList]);

    return (
        <div className="container">
            <div className='mt-3'>
                <Fragment>
                    <Link to={'/update-secretaries-list'} className='btn btn-primary mr-3'>Modifică lista de
                        secretare</Link>
                </Fragment>
                <Fragment>
                    <Link to={'/add-secretary'} className='btn btn-primary'>Adaugă secretară</Link>
                </Fragment>
            </div>
            <h1 className="mt-3">Lista de secretare:</h1>

            {error && <p>{error}</p>}

            {isLoading ? (
                <div className="justify-content-center d-flex mt-5">
                    <TailSpin height="80" width="80" color="#4fa94d" ariaLabel="tail-spin-loading" radius="1"
                              wrapperStyle={{}} wrapperClass="" visible={true}/>
                </div>
            ) : secretaries && secretaries.length > 0 ?
                (<>
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
                            {secretaries.map((secretary, index) => (<tr key={index}>
                                <td>{secretary.last_name}</td>
                                <td>{secretary.first_name}</td>
                                <td>{secretary.title}</td>
                                <td>{secretary.email}</td>
                                <td>
                                    <Link to={`/edit-secretary/${secretary.id}`}
                                          className="btn btn-primary">Modifică</Link>
                                </td>
                            </tr>))}
                            </tbody>
                        </table>
                    </div>
                </>) :
                (<p>Niciun rezultat</p>)
            }

        </div>
    );
};

const mapStateToProps = (state) => ({
    secretaries: state.secretary.secretaries, error: state.secretary.error
});

export default connect(mapStateToProps, {fetchSecretariesList})(SecretariesList);
