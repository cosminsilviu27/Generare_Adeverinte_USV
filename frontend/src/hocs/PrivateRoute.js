import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ children, isAuthenticated, loginMethod, allowedRoles = [], bannedRoles = [] }) => {
    const location = useLocation();

    if (bannedRoles.includes(loginMethod)) {
        return <Navigate to='/unauthorized' state={{ from: location }} replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(loginMethod)) {
        return <Navigate to='/unauthorized' state={{ from: location }} replace />;
    }

    return children;
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    loginMethod: state.auth.loginMethod
});

export default connect(mapStateToProps)(PrivateRoute);
