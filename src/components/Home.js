import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { db } from '../firebase';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import bcrypt from 'bcryptjs';
import PropTypes from 'prop-types';

import WorldSelect from './mainpages/WorldSelect';
import Login from './mainpages/Login';
import Profile from './mainpages/Profile';
import EquipmentList from './mainpages/EquipmentList';

const Home = ({ authed, setAuthed, setBankTitle, setFunc2 }) => {
  // Prepare all function params and fetched data
  useEffect(() => {
    const handleLogout = () => {
      setUsername('');
      setStep(1);
      setAuthed(false);
      setSelectedWorld('');
      setBankTitle('');

      resetCache();
    };

    const fetchWorlds = async () => {
      const querySnapshot = await getDocs(collection(db, 'dndWorlds'));
      const worldsData = querySnapshot.docs.map((doc) => doc.data().name);
      setWorlds(worldsData);
    };

    setFunc2(() => () => handleLogout());
    fetchWorlds();
  }, [setFunc2, setAuthed, setBankTitle]);

  const storedUserId = localStorage.getItem('Rh8bzfYSBg-fbank-userId');
  const storedUsername = localStorage.getItem('Rh8bzfYSBg-fbank-username');
  const storedBalance = localStorage.getItem('Rh8bzfYSBg-fbank-balance');
  const storedLoan = localStorage.getItem('Rh8bzfYSBg-fbank-loan');
  const storedTotalFunds = localStorage.getItem('Rh8bzfYSBg-fbank-totalFunds');
  const storedBankTitle = localStorage.getItem('Rh8bzfYSBg-fbank-bankTitle');

  const [worlds, setWorlds] = useState([]);
  const [selectedWorld, setSelectedWorld] = useState('');
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState();
  const [username, setUsername] = useState();
  const [passcode, setPasscode] = useState('');
  const [balance, setBalance] = useState(0);
  const [loan, setLoan] = useState(0);
  const [totalFunds, setTotalFunds] = useState(0);

  const resetCache = () => {
    localStorage.removeItem('Rh8bzfYSBg-fbank-userId');
    localStorage.removeItem('Rh8bzfYSBg-fbank-username');
    localStorage.removeItem('Rh8bzfYSBg-fbank-balance');
    localStorage.removeItem('Rh8bzfYSBg-fbank-totalFunds');
    localStorage.removeItem('Rh8bzfYSBg-fbank-bankTitle');
  };

  useEffect(() => {
    if (
      !!(
        storedUserId &&
        storedUsername &&
        storedBalance &&
        storedTotalFunds &&
        storedBankTitle
      )
    ) {
      setAuthed(true);
      setBankTitle(storedBankTitle);
    } else {
      setAuthed(false);
      resetCache();
    }
  });

  useEffect(() => {
    setStep(authed ? 3 : 1);
    setSelectedWorld(storedBankTitle || '');
    setUserId(storedUserId || '');
    setUsername(storedUsername || '');
    setBalance(strToInt(storedBalance) || 0);
    setLoan(strToInt(storedLoan) || 0);
    setTotalFunds(strToInt(storedTotalFunds) || 0);
  }, [
    authed,
    storedBankTitle,
    storedUserId,
    storedUsername,
    storedBalance,
    storedLoan,
    storedTotalFunds,
  ]);

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

    localStorage.setItem('Rh8bzfYSBg-fbank-bankTitle', world);
  };

  const goToShop = () => {
    setStep(4);
  };

  const handleLogin = async () => {
    /**
     * Login function, also used to refresh user data from database
     */
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
      if (isPasswordValid || authed) {
        setAuthed(false);

        const userSum = userDoc.docs.reduce((acc, entity) => {
          const entityData = entity.data();
          return entityData.real
            ? acc + strToInt(entityData.balance) - strToInt(entityData.loan)
            : acc;
        }, 0);

        const npcSum = npcDoc.docs.reduce((acc, entity) => {
          const entityData = entity.data();
          return acc + strToInt(entityData.balance);
        }, 0);

        const balance = userData.data().balance;
        const loan = userData.data().loan;
        const totalFunds = userSum + npcSum;

        // Store user data in local storage
        localStorage.setItem('Rh8bzfYSBg-fbank-userId', userData.id);
        localStorage.setItem('Rh8bzfYSBg-fbank-username', username);
        localStorage.setItem('Rh8bzfYSBg-fbank-balance', balance);
        localStorage.setItem('Rh8bzfYSBg-fbank-loan', loan);
        localStorage.setItem('Rh8bzfYSBg-fbank-totalFunds', totalFunds);
        localStorage.setItem('Rh8bzfYSBg-fbank-bankTitle', selectedWorld);

        setAuthed(true);

        return true;
      }
      return false;
    }
    return false;
  };

  const updateLoan = async (amount) => {
    if (amount === '' || isNaN(amount)) return false;
    
    const amountNum = parseFloat(amount);
    const totalFundsNum = parseFloat(totalFunds);

    if (amountNum <= 0) return false;
    if (totalFundsNum < amountNum) return false;

    const newLoan = parseFloat(loan) + amountNum;
    const newTotalFunds = totalFundsNum - amountNum;

    try {
      const docRef = doc(db, 'users', userId);
      await updateDoc(docRef, { loan: newLoan });

      setLoan(newLoan);
      setTotalFunds(newTotalFunds);

      localStorage.setItem('Rh8bzfYSBg-fbank-loan', newLoan);
      localStorage.setItem('Rh8bzfYSBg-fbank-totalFunds', newTotalFunds);

      return true;
    } catch (error) {
      console.error('Error updating loan: ', error);
      return false;
    }
  };

  const updateBalance = async (increment, amount) => {
    if (amount === '' || isNaN(amount)) return false;
    if (parseFloat(amount) <= 0) return false;

    if (increment) {
      const newBalance = parseFloat(balance) + parseFloat(amount);
      const newTotalFunds = parseFloat(totalFunds) + parseFloat(amount);

      try {
        const docRef = doc(db, 'users', userId);
        await updateDoc(docRef, { balance: newBalance });

        setBalance(newBalance);
        setTotalFunds(newTotalFunds);

        localStorage.setItem('Rh8bzfYSBg-fbank-balance', newBalance);
        localStorage.setItem('Rh8bzfYSBg-fbank-totalFunds', newTotalFunds);

        return true;
      } catch (error) {
        console.error('Error updating balance: ', error);
        return false;
      }
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
            loan={loan}
            totalFunds={totalFunds}
            selectedWorld={selectedWorld}
            updateBalance={updateBalance}
            handleLogin={handleLogin}
            updateLoan={updateLoan}
            goToShop={goToShop}
          />
        )}
        {step === 4 && <EquipmentList handleBack={handleBack} />}
      </Box>
    </>
  );
};

Home.propTypes = {
  authed: PropTypes.bool.isRequired,
  setAuthed: PropTypes.func.isRequired,
  setBankTitle: PropTypes.func.isRequired,
  setFunc2: PropTypes.func.isRequired,
};

export default Home;
