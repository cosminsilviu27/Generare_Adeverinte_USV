import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchFacultiesList} from '../../actions/faculties';
import CSRFToken from '../../components/CSRFToken';
import {Link} from "react-router-dom";

const FacultiesList = ({fetchFacultiesList, faculties, error}) => {
    useEffect(() => {
        fetchFacultiesList();
    }, [fetchFacultiesList]);

    return (
        <div className="container">
             <div className='mt-3'>
                <Fragment>
                    <Link to={'/update-faculties-list'} className='btn btn-primary'>Modifică lista de facultăți</Link>
                </Fragment>
            </div>
            <h1 className="mt-3">Lista de facultăți:</h1>

            {error && <p>{error}</p>}

            <div className="mt-3">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Nume Complet</th>
                        <th>Nume scurt</th>
                        <th>An universitar curent</th>
                        <th>Nume decan</th>
                        <th>Nume secretară șefă</th>
                        <th>Acțiuni</th>
                    </tr>
                    </thead>
                    <tbody>
                    {faculties.map((faculty, index) => (
                        <tr key={index}>
                            <td>{faculty.full_name}</td>
                            <td>{faculty.short_name}</td>
                            <td>{faculty.current_academic_year}</td>
                            <td>{faculty.dean_name}</td>
                            <td>{faculty.chief_secretary.first_name} {faculty.chief_secretary.last_name}</td>
                            <td>
                                <Link to={`/edit-faculty/${faculty.id}`}
                                          className="btn btn-primary">Modifică</Link>
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
    faculties: state.faculty.faculties,
    error: state.faculty.error
});

export default connect(mapStateToProps, {fetchFacultiesList})(FacultiesList);
