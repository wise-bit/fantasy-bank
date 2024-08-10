import React, { useState } from 'react';
import { IconButton, Box, Button } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import PropTypes from 'prop-types';

import CustomTextField from './customs/CustomTextField';

const Chat = ({ geminiModel }) => {
  const [expanded, setExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const toggleChat = () => setExpanded(!expanded);
  const handleInputChange = (event) => setInput(event.target.value);

  const getAiResponse = async (input) => {
    try {
      const AI_PREFACE = process.env.REACT_APP_GEMINI_PREFACE;
      const geminiResult = await geminiModel.generateContent(
        AI_PREFACE + input
      );
      const geminiResponse = await geminiResult.response;
      const geminiText = geminiResponse.text();
      return geminiText;
    } catch (error) {
      return 'Unable to generate response for that message, please try again!';
    }
  };

  const handleCommand = (input) => {
    const lowerInput = input.toLowerCase();
    const [command, args] = lowerInput.split(' ', 2);
    if (command === '/r' || command === '/roll') {
      const match = args.match(/^(\d+)d(\d+)$/);
      if (match) {
        const numberOfDice = parseInt(match[1], 10);
        const sides = parseInt(match[2], 10);

        const rolls = [];
        for (let i = 0; i < numberOfDice; i++) {
          rolls.push(Math.floor(Math.random() * sides) + 1);
        }

        const total = rolls.reduce((acc, cur) => acc + cur, 0);
        return `${rolls.join(' + ')} = ${total}`;
      } else {
        return "Invalid roll command. Use the format '/roll NdM', where N is the number of dice and M is the number of sides.";
      }
    }

    return null;
  };

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);
    setInput('');

    if (input.startsWith('/')) {
      const commandResult = handleCommand(input);
      if (commandResult) {
        const customMessage = { sender: 'ai', text: commandResult };
        setMessages((prevMessages) => [...prevMessages, customMessage]);
        return;
      }
    }

    const aiResponse = await getAiResponse(input);
    const aiMessage = { sender: 'ai', text: aiResponse };
    setMessages((prevMessages) => [...prevMessages, aiMessage]);
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
      <IconButton onClick={toggleChat} sx={{ color: 'white' }}>
        <ChatIcon />
      </IconButton>
      {expanded && (
        <Box
          sx={{
            position: 'absolute',
            bottom: '60px',
            right: '0',
            width: '400px',
            height: '600px',
            backgroundColor: '#102423',
            border: '4px solid #000',
            borderRadius: '8px',
            boxShadow: '0 5px 50px rgba(0,0,0,0.8)',
            display: 'flex',
            flexDirection: 'column',
            padding: '10px',
          }}
        >
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              marginBottom: '10px',
              padding: '10px',
              borderRadius: '4px',
            }}
          >
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  textAlign: msg.sender === 'user' ? 'right' : 'left',
                  margin: '5px 0',
                }}
              >
                <Box
                  sx={{
                    display: 'inline-block',
                    padding: '8px 12px',
                    borderRadius: '20px',
                    backgroundColor:
                      msg.sender === 'user' ? '#b5c4c4' : 'black',
                    color: msg.sender === 'user' ? 'black' : 'white',
                    fontSize: '16px',
                  }}
                >
                  {msg.text}
                </Box>
              </Box>
            ))}
          </Box>
          <form onSubmit={(e) => handleSendMessage(e)}>
            <Box sx={{ display: 'flex' }}>
              <CustomTextField
                isCenter={false}
                value={input}
                onChange={handleInputChange}
                fullWidth
                placeholder='Type a message'
                variant='outlined'
                size='small'
                sx={{ color: 'white' }}
              />
              <Button
                onClick={handleSendMessage}
                variant='contained'
                sx={{
                  color: 'black',
                  background: 'white',
                  fontFamily: 'Bona Nova SC',
                  fontSize: '16px',
                  marginLeft: '10px',
                  '&:hover': {
                    backgroundColor: 'white',
                    color: '#3c52b2',
                  },
                }}
              >
                Send
              </Button>
            </Box>
          </form>
        </Box>
      )}
    </div>
  );
};

Chat.propTypes = {
  geminiModel: PropTypes.object.isRequired,
};

export default Chat;
