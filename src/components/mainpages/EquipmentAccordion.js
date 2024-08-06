import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const EquipmentAccordion = ({
  item,
  expandedEquipment,
  handleEquipmentAccordionChange,
  equipmentPanel,
}) => {
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEquipmentDetails = async () => {
      try {
        const response = await fetch(
          `https://www.dnd5eapi.co/api/equipment/${item.index}`
        );
        const data = await response.json();
        setDetails(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching equipment details:', error);
        setLoading(false);
      }
    };

    if (expandedEquipment === equipmentPanel) {
      fetchEquipmentDetails();
    }
  }, [expandedEquipment, item.index, equipmentPanel]);

  return (
    <Accordion
      expanded={expandedEquipment === equipmentPanel}
      onChange={handleEquipmentAccordionChange(equipmentPanel)}
      sx={{
        background: '#0006',
        color: 'white',
        borderRadius: '2px',
        marginBottom: '5px',
        width: '100%',
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ fontFamily: 'Bona Nova SC', fontSize: '14px' }}>
          {item.name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {loading ? (
          <CircularProgress />
        ) : (
          <Box sx={{ background: '#0008' }}>
            <Typography
              variant='body2'
              sx={{
                fontFamily: 'Bona Nova SC',
                fontSize: '14px',
                fontWeight: '700',
              }}
            >
              Price: {details.cost?.quantity} {details.cost?.unit}
            </Typography>
            <Typography
              variant='body2'
              sx={{ fontFamily: 'Bona Nova SC', fontSize: '14px' }}
            >
              Description: {details.desc?.join(' ')}
            </Typography>
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default EquipmentAccordion;
