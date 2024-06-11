import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Layout from './hocs/Layout';

import Home from './containers/Home';
import SecretaryPage from './containers/secretary/SecretaryDashboard';

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

const App = () => (
    <Provider store={store}>
        <Router>
            <Layout>
                <Routes>
                    <Route exact path='/' element={<Home/>}/>
                    <Route exact path='/student' element={<Student/>}/>
                    <Route exact path='/secretary' element={
                        <PrivateRoute bannedRoles={['username']}>
                            <Secretary/>
                        </PrivateRoute>
                    }/>
                    <Route exact path='/secretary-page' element={
                        <SecretaryPage/>
                    }/>
                    <Route exact path='/login-admin' element={<LoginAdmin/>}/>
                    <Route exact path='/admin' element={
                        <PrivateRoute allowedRoles={['username']}>
                            <AdminDashboard/>
                        </PrivateRoute>
                    }/>
                    <Route exact path='/update-students-list' element={
                        <PrivateRoute allowedRoles={['username']}>
                            <UpdateStudents/>
                        </PrivateRoute>
                    }/>
                    <Route exact path='/get-students-list' element={<StudentsList/>}/>
                    <Route exact path='/create-student' element={<CreateStudent/>}/>
                    <Route exact path='/edit-student/:student_id' element={<EditStudent/>}/>

                    <Route exact path='/update-secretaries-list' element={
                        <PrivateRoute allowedRoles={['username']}>
                            <UpdateSecretaries/>
                        </PrivateRoute>
                    }/>
                    <Route exact path='/get-secretaries-list' element={
                        <PrivateRoute allowedRoles={['username']}>
                            <SecretariesList/>
                        </PrivateRoute>
                    }/>
                    <Route exact path='/edit-secretary/:secretary_id' element={
                        <PrivateRoute allowedRoles={['username']}>
                            <EditSecretary/>
                        </PrivateRoute>
                    }/>
                    <Route exact path='/update-faculties-list' element={
                        <PrivateRoute allowedRoles={['username']}>
                            <UpdateFaculties/>
                        </PrivateRoute>
                    }/>
                    <Route exact path='/get-faculties-list' element={<FacultiesList/>}/>
                    <Route exact path='/get-certificates-list' element={<CertificatesList/>}/>
                    <Route path='/dashboard' element={
                        <PrivateRoute allowedRoles={['username']}>
                               <AdminProfile/>
                        </PrivateRoute>
                    }/>
                </Routes>
            </Layout>
        </Router>
    </Provider>
);

export default App;
