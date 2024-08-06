import React, { useState } from 'react';
// import axios from 'axios';
import { IconButton, Box, Button } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CustomTextField from './customs/CustomTextField';

const Chat = () => {
  const [expanded, setExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const toggleChat = () => {
    setExpanded(!expanded);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);

    // try {
    //   const response = await axios.post('https://api.example.com/gemini', {
    //     prompt: input,
    //     apiKey: 'YOUR_API_KEY',
    //   });

    //   const aiMessage = { sender: 'ai', text: response.data.answer };
    //   setMessages((prevMessages) => [...prevMessages, aiMessage]);
    // } catch (error) {
    //   console.error('Error communicating with AI:', error);
    // }

    // setInput('');
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
            width: '300px',
            height: '400px',
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
                      msg.sender === 'user' ? '#b5c4c4' : '#black',
                    color: msg.sender === 'user' ? 'black' : 'white',
                  }}
                >
                  {msg.text}
                </Box>
              </Box>
            ))}
          </Box>
          <Box sx={{ display: 'flex' }}>
            <CustomTextField
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
        </Box>
      )}
    </div>
  );
};

export default Chat;
