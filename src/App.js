import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './Layout';
import NoMatch from './components/NoMatch';
import Home from './components/Home';
import './App.css';

const App = () => {
  const [authed, setAuthed] = useState(false);
  const [bankTitle, setBankTitle] = useState('');
  const [func2, setFunc2] = useState(() => () => {});

  return (
    <div>
      <Routes>
        <Route
          path='/'
          element={
            <Layout authed={authed} bankTitle={bankTitle} func2={func2} />
          }
        >
          <Route
            index
            element={
              <Home
                authed={authed}
                setAuthed={setAuthed}
                setBankTitle={setBankTitle}
                setFunc2={setFunc2}
              />
            }
          />
          <Route path='*' element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
