import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

// Importing components
import Layout from "./Layout";
import NoMatch from "./components/NoMatch";
import Landing from "./components/Landing";

import "./App.css";

const App = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState({ coins: 0 });

  const invest = () => {};

  const pullUserData = () => {
    setUserData({ coins: 0 });
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="/home" element={<Landing />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
