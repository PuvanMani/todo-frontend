import React, { useEffect } from 'react';
import { Route, Routes, Redirect, Navigate } from 'react-router-dom';
import Routers from './Routers';
import LoginForm from '../component/Form/AuthForm/LoginForm';
import RegisterForm from '../component/Form/AuthForm/registerForm';

function AllRouter() {
    const NotFoundWithRedirect = () => {
        // Use the Navigate component to perform the redirection
        if (localStorage.getItem("token")) {
            return <Navigate to="/" />;
        } else {
            return <Navigate to="/login" />;
        }
    };
    return (
        <React.Fragment>
            {localStorage.getItem("token") ? <Routes>
                {Routers.map((val => <Route path={val.path} element={val.element} />))}
                <Route path="*" element={<NotFoundWithRedirect />} />
            </Routes> : (
                <Routes>
                    <Route path='/login' element={<LoginForm />} />
                    <Route path='/register' element={<RegisterForm />} />

                    <Route path="*" element={<NotFoundWithRedirect />} />
                </Routes>
            )}
        </React.Fragment>
    )
}

export default AllRouter
