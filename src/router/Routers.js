
import React from 'react';
import Home from '../pages/Home';
import AddTodoForm from '../component/Form/TaskForm/TodoForm';
import LoginForm from '../component/Form/AuthForm/LoginForm';
import RegisterForm from '../component/Form/AuthForm/registerForm';

let Routers = [
    {
        path: "/",
        element: <Home />
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
