import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Routers from './Routers';

function AllRouter() {
    return (
        <Routes>
            {Routers.map((val => <Route path={val.path} element={val.element} />))}
        </Routes>
    )
}

export default AllRouter
