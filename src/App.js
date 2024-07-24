import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

// Importing components
import Layout from "./Layout";
import NoMatch from "./components/NoMatch";
import Landing from "./components/Landing";

import "./App.css";

const App = () => {
  // const invest = () => {};

  // const pullUserData = () => {
  //   setUserData({ coins: 0 });
  // };

  const [totalBalance, setTotalBalance] = useState(0);

  console.log(totalBalance);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout totalBalance={totalBalance} />}>
          <Route index element={<Landing setTotalBalance={setTotalBalance} />} />
          <Route path="/home" element={<Landing />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
