import React, { useState } from 'react';

import MainLayout from './pages/Layout';
import { BrowserRouter } from 'react-router-dom';

const App = () => {

  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
};
export default App;