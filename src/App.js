import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

// Importing components
import Layout from './Layout';
import NoMatch from './components/NoMatch';
import Home from './components/Home';

import './App.css';

const App = () => {
  const [totalBalance, setTotalBalance] = useState(0);

  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout totalBalance={totalBalance} />}>
          <Route index element={<Home setTotalBalance={setTotalBalance} />} />
          <Route path='/home' element={<Home />} />
          <Route path='*' element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
