import React, {Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {fetchStudentsList} from '../../actions/students';
import CSRFToken from '../../components/CSRFToken';
import {Link} from "react-router-dom";
import {TailSpin} from "react-loader-spinner";

const StudentsList = ({fetchStudentsList, students, error, isAuthenticated, loginMethod}) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true); 
        fetchStudentsList().then(() => {
            setIsLoading(false); 
        });
    }, [fetchStudentsList]);

    const adminBtns = (<Fragment>
        <Link to={'/update-students-list'} className='btn btn-primary'>Modifică lista de studenți</Link>
    </Fragment>)

    const secretaryBtns = (<Fragment>
        <Link to={'/create-student'} className='btn btn-primary'>Adaugă student</Link>
    </Fragment>)

    return (
        <div className="container">
            <div className='mt-3'>
                {loginMethod == 'username' ? adminBtns : secretaryBtns}
            </div>
            <h1 className="mt-3">Lista de studenți înmatriculați:</h1>

            {error && <p>{error}</p>}

            {isLoading ? (
                <div className="justify-content-center d-flex mt-5">
                    <TailSpin height="80" width="80" color="#4fa94d" ariaLabel="tail-spin-loading" radius="1"
                              wrapperStyle={{}} wrapperClass="" visible={true}/>
                </div>
            ) : students && students.length > 0 ?
                (<>
                    <div className="mt-3">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Email</th>
                                <th>Program de studiu</th>
                                <th>Ciclu de studii</th>
                                <th>Anul de studiu</th>
                                <th>Domeniu de studiu</th>
                                <th>Forma de studii</th>
                                <th>Finanțare</th>
                                <th>Nume complet</th>
                                <th>Sex</th>
                                <th>Acțiuni</th>
                            </tr>
                            </thead>
                            <tbody>
                            {students.map((student, index) => (<tr key={index}>
                                <td>{student.email}</td>
                                <td>{student.study_program_name}</td>
                                <td>{student.study_cycle}</td>
                                <td>{student.study_year}</td>
                                <td>{student.study_domain}</td>
                                <td>{student.study_form}</td>
                                <td>{student.funding}</td>
                                <td>{student.full_name}</td>
                                <td>{student.sex}</td>
                                <td>
                                    <Link to={`/edit-student/${student.id}`}
                                          className="btn btn-primary mb-3">Modifică</Link>
                                    <Link to={`/delete-student/${student.id}`} className="btn btn-danger">Șterge</Link>
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
    students: state.student.students,
    error: state.student.error,
    isAuthenticated: state.auth.isAuthenticated,
    loginMethod: state.auth.loginMethod,
});

export default connect(mapStateToProps, {fetchStudentsList})(StudentsList);
