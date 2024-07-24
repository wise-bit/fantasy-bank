import React, { useEffect, useState } from "react";
import { Box, MenuItem, Select, Button, TextField } from "@mui/material";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import bcrypt from "bcryptjs";
import CustomSelect from "./CustomSelect";
import CustomTextField from "./CustomTextField";

const Landing = ({ setTotalBalance }) => {
  const [worlds, setWorlds] = useState([]);
  const [selectedWorld, setSelectedWorld] = useState("");
  const [step, setStep] = useState(1);
  const [user, setUser] = useState("");
  const [passcode, setPasscode] = useState("");
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchWorlds = async () => {
      const querySnapshot = await getDocs(collection(db, "dndWorlds"));
      const worldsData = querySnapshot.docs.map((doc) => doc.data().name);
      setWorlds(worldsData);
    };

    fetchWorlds();
  }, []);

  const handleNext = () => {
    setStep(2);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleLogin = async () => {
    const userDoc = await getDocs(collection(db, "users"));
    const userData = userDoc.docs.find((doc) => doc.data().username === user);

    if (userData) {
      const isPasswordValid = await bcrypt.compare(
        passcode,
        userData.data().password
      );
      if (isPasswordValid) {
        setBalance(userData.data().balance);
        setTotalBalance(79); // TODO fix!!
        setStep(3);
      } else {
        alert("Login failed");
      }
    } else {
      alert("Login failed");
    }
  };

  const handleLogout = () => {
    setStep(1);
    setTotalBalance(0);
  };

  return (
    <>
      <Box
        sx={{ marginTop: "50px" }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        {step === 1 && (
          <>
            <CustomSelect
              value={selectedWorld}
              onChange={(e) => setSelectedWorld(e.target.value)}
              displayEmpty
              sx={{ marginTop: "60px", marginBottom: "10px" }}
            >
              <MenuItem value="" disabled>
                Select World...
              </MenuItem>
              {worlds.map((world, index) => (
                <MenuItem key={index} value={world}>
                  {world}
                </MenuItem>
              ))}
            </CustomSelect>
            <Button
              onClick={handleNext}
              sx={{
                color: "black",
                fontFamily: "Bona Nova SC",
                background: "white",
                marginTop: "30px",
              }}
            >
              join
            </Button>
          </>
        )}
        {step === 2 && (
          <>
            <CustomTextField
              label="Username"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <CustomTextField
              label="4-digit Passcode"
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
            />
            <Button
              onClick={handleLogin}
              sx={{
                color: "black",
                fontFamily: "Bona Nova SC",
                background: "white",
                marginTop: "30px",
              }}
            >
              login
            </Button>
            <Button
              onClick={handleBack}
              sx={{
                color: "black",
                fontFamily: "Bona Nova SC",
                background: "#CCC",
                marginTop: "30px",
              }}
            >
              back
            </Button>
          </>
        )}
        {step === 3 && balance !== null && (
          <Box>
            <Box>
              <p>Welcome, {user}!</p>
              <p>Your Fantasy Bank Balance: {balance} GP</p>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Button
                onClick={handleLogout}
                sx={{
                  color: "black",
                  fontFamily: "Bona Nova SC",
                  background: "#CCC",
                  marginTop: "30px",
                }}
              >
                logout
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Landing;
