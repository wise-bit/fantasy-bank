import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import bcrypt from 'bcryptjs';
import PropTypes from 'prop-types';

import WorldSelect from './mainpages/WorldSelect';
import Login from './mainpages/Login';
import Profile from './mainpages/Profile';

const Home = ({ setTotalBalance }) => {
  const [worlds, setWorlds] = useState([]);
  const [selectedWorld, setSelectedWorld] = useState('');
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [passcode, setPasscode] = useState('');
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchWorlds = async () => {
      const querySnapshot = await getDocs(collection(db, 'dndWorlds'));
      const worldsData = querySnapshot.docs.map((doc) => doc.data().name);
      setWorlds(worldsData);
    };

    fetchWorlds();
  }, []);

  const handleLogin = async () => {
    const userDoc = await getDocs(collection(db, 'users'));
    const userData = userDoc.docs.find(
      (doc) => doc.data().username === username
    );

    if (userData) {
      const isPasswordValid = await bcrypt.compare(
        passcode,
        userData.data().password
      );
      if (isPasswordValid) {
        setBalance(userData.data().balance);
        setTotalBalance(79); // TODO make dynamic
        setStep(3);
        return true;
      }
      return false;
    }
    return false;
  };

  const handleLogout = () => {
    setStep(1);
    setTotalBalance(0);
  };

  const handleNext = () => {
    setStep(2);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // User Pages

  return (
    <>
      <Box
        height='100%'
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
      >
        {step === 1 && (
          <WorldSelect
            worlds={worlds}
            selectedWorld={selectedWorld}
            setSelectedWorld={setSelectedWorld}
            handleNext={handleNext}
          />
        )}
        {step === 2 && (
          <Login
            user={username}
            setUser={setUsername}
            passcode={passcode}
            setPasscode={setPasscode}
            selectedWorld={selectedWorld}
            handleLogin={handleLogin}
            handleBack={handleBack}
          />
        )}
        {step === 3 && balance !== null && (
          <Profile
            username={username}
            balance={balance}
            handleLogout={handleLogout}
          />
        )}
      </Box>
    </>
  );
};

Home.propTypes = {
  setTotalBalance: PropTypes.func,
};

export default Home;
