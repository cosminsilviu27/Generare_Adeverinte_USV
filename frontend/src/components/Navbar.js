import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutAdmin, logoutSecretary } from '../actions/auth';

const Navbar = ({ isAuthenticated, loginMethod, user, logoutAdmin, logoutSecretary }) => {

    
    const adminLinks = (
        <Fragment>
            <li className='nav-item'>
                <NavLink className='nav-link' to='/dashboard'>Admin Dashboard</NavLink>
            </li>
            <li className='nav-item'>
                <NavLink className='nav-link' to='/admin'>Admin Profile</NavLink>
            </li>
            <li className='nav-item'>
                <span className='navbar-text'>{user && user.username}</span>
            </li>
            <li className='nav-item'>
                <a className='nav-link' onClick={logoutAdmin} href='#!'>Logout</a>
            </li>
        </Fragment>
    );

    const secretaryLinks = (
        <Fragment>
            <li className='nav-item'>
                <NavLink className='nav-link' to='/secretary-page'>Secretary Page</NavLink>
            </li>
            <li className='nav-item'>
                <a className='nav-link' onClick={logoutSecretary} href='#!'>Logout</a>
            </li>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li className='nav-item'>
                <Link className='nav-link' to='/'>Acasa</Link>
            </li>
        </Fragment>
    );

    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
            <div className='container-fluid'>
                <Link className='navbar-brand' to='/'>USV - adeverinte</Link>
                <button 
                    className='navbar-toggler' 
                    type='button' 
                    data-bs-toggle='collapse' 
                    data-bs-target='#navbarNav' 
                    aria-controls='navbarNav' 
                    aria-expanded='false' 
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNav'>
                    <ul className='navbar-nav'>
                        {!isAuthenticated && guestLinks}
                        {isAuthenticated && loginMethod === 'username' && adminLinks}
                        {loginMethod === 'google' && secretaryLinks}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    loginMethod: state.auth.loginMethod,
    user: state.auth.user
});

export default connect(mapStateToProps, { logoutAdmin, logoutSecretary })(Navbar);
