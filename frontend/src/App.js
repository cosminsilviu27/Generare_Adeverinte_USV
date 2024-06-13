import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Layout from './hocs/Layout';

import Home from './containers/Home';
import SecretaryDashboard from './containers/secretary/SecretaryDashboard';

import Secretary from './containers/secretary/Secretary';
import Student from './containers/student/Student';

import LoginAdmin from './containers/admin/LoginAdmin';
import AdminDashboard from './containers/admin/AdminDashboard';
import AdminProfile from './containers/admin/AdminProfile';

import PrivateRoute from './hocs/PrivateRoute';

import {Provider} from 'react-redux';
import store from './store';
import UpdateStudents from './containers/student/UpdateStudents';
import StudentsList from './containers/student/StudentsList';
import SecretariesList from './containers/secretary/SecretariesList';
import UpdateSecretaries from './containers/secretary/UpdateSecretaries';
import EditSecretary from './containers/secretary/EditSecretary';
import UpdateFaculties from "./containers/faculty/UpdateFaculties";
import FacultiesList from "./containers/faculty/FacultiesList";
import CreateStudent from "./containers/student/CreateStudent";
import EditStudent from "./containers/student/EditStudent";
import CertificatesList from "./containers/certificate/CertificatesList";
import ApproveCertificate from "./containers/certificate/ApproveCertificate";
import RejectCertificate from "./containers/certificate/RejectCertificate";
import ApprovedCertificatesList from "./containers/certificate/ApprovedCertificatesList";
import RejectedCertificatesList from "./containers/certificate/RejectedCertificatesList";
import EditCertificate from "./containers/certificate/EditCertificate";
import PrintCertificates from "./containers/certificate/PrintCertificates";
import DeleteStudent from "./containers/student/DeleteStudent";
import AddSecretary from "./containers/secretary/AddSecretary";
import EditFaculty from "./containers/faculty/EditFaculty";
import ResetApplication from "./containers/admin/ResetApplication";

const App = () => (
    <Provider store={store}>
        <Router>
            <Layout>
                <Routes>
                    <Route exact path='/' element={<Home/>}/>
                    <Route exact path='/student' element={<Student/>}/>
                    <Route exact path='/secretary' element={<Secretary/>}/>
                    <Route exact path='/login-admin' element={<LoginAdmin/>}/>
                    <Route exact path='/secretary-page' element={<SecretaryDashboard/>}/>

                    <Route exact path='/get-students-list' element={
                        <PrivateRoute allowedRoles={['google', 'username']}>
                            <StudentsList/>
                        </PrivateRoute>
                    }/>
                    <Route exact path='/edit-student/:student_id' element={
                        <PrivateRoute allowedRoles={['google', 'username']}>
                            <EditStudent/>
                        </PrivateRoute>
                    }/>
                    <Route exact path='/delete-student/:student_id' element={
                        <PrivateRoute allowedRoles={['google', 'username']}>
                            <DeleteStudent/>
                        </PrivateRoute>
                    }/>
                    <Route exact path='/get-faculties-list' element={
                        <PrivateRoute allowedRoles={['google', 'username']}>
                            <FacultiesList/>
                        </PrivateRoute>
                    }/>

                    {/* Admin Routes */}
                    <Route exact path='/admin' element={
                        <PrivateRoute allowedRoles={['username']}>
                            <AdminProfile/>
                        </PrivateRoute>
                    }/>
                    <Route exact path='/update-students-list' element={
                        <PrivateRoute allowedRoles={['username']}>
                            <UpdateStudents/>
                        </PrivateRoute>
                    }/>
                    <Route exact path='/get-secretaries-list' element={
                        <PrivateRoute allowedRoles={['username']}>
                            <SecretariesList/>
                        </PrivateRoute>
                    }/>
                    <Route exact path='/update-secretaries-list' element={
                        <PrivateRoute allowedRoles={['username']}>
                            <UpdateSecretaries/>
                        </PrivateRoute>
                    }/>
                    <Route path='/dashboard' element={
                        <PrivateRoute allowedRoles={['username']}>
                            <AdminDashboard/>
                        </PrivateRoute>
                    }/>
                    <Route exact path='/edit-secretary/:secretary_id' element={
                        <PrivateRoute allowedRoles={['username']}>
                            <EditSecretary/>
                        </PrivateRoute>
                    }/>
                    <Route exact path='/add-secretary' element={
                        <PrivateRoute allowedRoles={['username']}>
                            <AddSecretary/>
                        </PrivateRoute>
                    }/>
                    <Route exact path='/update-faculties-list' element={
                        <PrivateRoute allowedRoles={['username']}>
                            <UpdateFaculties/>
                        </PrivateRoute>
                    }/>
                    <Route exact path='/edit-faculty/:faculty_id' element={
                        <PrivateRoute allowedRoles={['username']}>
                            <EditFaculty/>
                        </PrivateRoute>
                    }/>
                    <Route exact path='/reset-application' element={
                        <PrivateRoute allowedRoles={['username']}>
                            <ResetApplication/>
                        </PrivateRoute>
                    }/>

                    {/* Secretary Routes */}
                    <Route exact path='/approve-certificate/:processing_position' element={
                        <PrivateRoute allowedRoles={['google']}>
                            <ApproveCertificate/>
                        </PrivateRoute>
                    }/>
                    <Route exact path='/reject-certificate/:processing_position' element={
                        <PrivateRoute allowedRoles={['google']}>
                            <RejectCertificate/>
                        </PrivateRoute>
                    }/>
                    <Route exact path='/edit-certificate/:certificate_id' element={
                        <PrivateRoute allowedRoles={['google']}>
                            <EditCertificate/>
                        </PrivateRoute>
                    }/>
                    <Route exact path='/create-student' element={
                        <PrivateRoute allowedRoles={['google']}>
                            <CreateStudent/>
                        </PrivateRoute>
                    }/>
                    <Route exact path='/get-certificates-list' element={
                        <PrivateRoute allowedRoles={['google']}>
                            <CertificatesList/>
                        </PrivateRoute>
                    }/>
                    <Route exact path='/print-certificates' element={
                        <PrivateRoute allowedRoles={['google']}>
                            <PrintCertificates/>
                        </PrivateRoute>
                    }/>
                    <Route exact path='/get-approved-certificates-list' element={
                        <PrivateRoute allowedRoles={['google']}>
                            <ApprovedCertificatesList/>
                        </PrivateRoute>
                    }/>
                    <Route exact path='/get-rejected-certificates-list' element={
                        <PrivateRoute allowedRoles={['google']}>
                            <RejectedCertificatesList/>
                        </PrivateRoute>
                    }/>
                </Routes>
            </Layout>
        </Router>
    </Provider>
);

export default App;
