import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';
import CategoryAccordion from './CategoryAccordion';

const EquipmentList = ({ handleBack }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://www.dnd5eapi.co/api/equipment-categories/'
        );
        const data = await response.json();
        setCategories(data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Box
        width={'300px'}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          height: '100%',
        }}
      >
        {/* goToShop */}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignContent: 'end',
            justifyContent: 'end',
            marginBottom: '30px',
          }}
        >
          <Button
            onClick={handleBack}
            sx={{
              color: 'white',
              background: 'black',
              fontFamily: 'Bona Nova SC',
              fontSize: '14px',
            }}
          >
            back
          </Button>
        </Box>

        {loading ? (
          <CircularProgress />
        ) : (
          categories.map((category, index) => (
            <CategoryAccordion
              key={category.index}
              category={category}
              expanded={expanded}
              handleAccordionChange={handleAccordionChange}
              panel={`panel${index}`}
            />
          ))
        )}

        <Box sx={{ marginTop: '30px', color: '#102423' }}>---</Box>
      </Box>
    </>
  );
};

EquipmentList.propTypes = {
  handleBack: PropTypes.func.isRequired,
};

export default EquipmentList;
