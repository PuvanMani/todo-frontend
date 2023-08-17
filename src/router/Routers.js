
import React from 'react';
import Home from '../pages/Home';
import AddTodoForm from '../component/Form/AddTodoForm';
import LoginForm from '../component/Form/LoginForm';

let Routers = [
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/auth/login",
        element: <LoginForm />
    },
    {
        path: "/add",
        element: <AddTodoForm />
    },
    {
        path: "/:action/:id",
        element: <AddTodoForm />
    },
]

export default Routers
