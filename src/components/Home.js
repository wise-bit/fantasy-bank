import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { db } from '../firebase';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import bcrypt from 'bcryptjs';
import PropTypes from 'prop-types';

import WorldSelect from './mainpages/WorldSelect';
import Login from './mainpages/Login';
import Profile from './mainpages/Profile';

const Home = ({ setAuthed, setBankTitle, setFunc2 }) => {
  const [worlds, setWorlds] = useState([]);
  const [selectedWorld, setSelectedWorld] = useState('');
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [passcode, setPasscode] = useState('');
  const [balance, setBalance] = useState(null);
  const [totalFunds, setTotalFunds] = useState(0);

  const strToInt = (str) => {
    const parsedInt = parseInt(str, 10);
    if (isNaN(parsedInt)) {
      return 0;
    }
    return parsedInt;
  };

  const handleSetSelectedWorld = (world) => {
    setSelectedWorld(world);
    setBankTitle(world);
  };

  const handleLogin = async () => {
    const userDoc = await getDocs(collection(db, 'users'));
    const npcDoc = await getDocs(collection(db, 'npcs'));

    const userData = userDoc.docs.find(
      (doc) => doc.data().username === username
    );

    if (userData) {
      const isPasswordValid = await bcrypt.compare(
        passcode,
        userData.data().password
      );
      if (isPasswordValid) {
        setAuthed(true);
        setUserId(userData.id);
        setBalance(userData.data().balance);
        setStep(3);

        const userSum = userDoc.docs.reduce((acc, entity) => {
          const entityData = entity.data();
          return entityData.real ? acc + strToInt(entityData.balance) : acc;
        }, 0);

        const npcSum = npcDoc.docs.reduce((acc, entity) => {
          const entityData = entity.data();
          return acc + strToInt(entityData.balance);
        }, 0);

        const totalPool = userSum + npcSum;
        setTotalFunds(totalPool);

        return true;
      }
      return false;
    }
    return false;
  };

  const updateBalance = async (increment, amount) => {
    if (amount === '' || isNaN(amount)) return false;
    if (parseFloat(amount) <= 0) return false;

    const newBalance = increment
      ? parseFloat(balance) + parseFloat(amount)
      : parseFloat(balance);

    try {
      const docRef = doc(db, 'users', userId);
      await updateDoc(docRef, { balance: newBalance });

      setBalance(newBalance);
      setTotalFunds(totalFunds + parseFloat(amount));
      return true;
    } catch (error) {
      console.error('Error updating balance: ', error);
      return false;
    }
  };

  const handleNext = () => {
    setStep(2);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      if (step === 2) {
        handleSetSelectedWorld('');
      }
    }
  };

  useEffect(() => {
    const handleLogout = () => {
      setUsername('');
      setStep(1);
      setBankTitle('');
      setAuthed(false);
    };

    const fetchWorlds = async () => {
      const querySnapshot = await getDocs(collection(db, 'dndWorlds'));
      const worldsData = querySnapshot.docs.map((doc) => doc.data().name);
      setWorlds(worldsData);
    };

    setFunc2(() => () => handleLogout());
    fetchWorlds();
  }, [setFunc2, setAuthed, setBankTitle]);

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
            handleSetSelectedWorld={handleSetSelectedWorld}
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
            totalFunds={totalFunds}
            updateBalance={updateBalance}
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
