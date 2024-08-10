import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { GoogleGenerativeAI } from '@google/generative-ai';

import Layout from './Layout';
import NoMatch from './components/NoMatch';
import Home from './components/Home';
import Chat from './components/Chat';
import './App.css';

const App = () => {
  const [authed, setAuthed] = useState(false);
  const [bankTitle, setBankTitle] = useState('');
  const [func2, setFunc2] = useState(() => () => {});

  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_KEY);
  const geminiModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

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
      {authed && <Chat geminiModel={geminiModel} />}
    </div>
  );
};

export default App;
