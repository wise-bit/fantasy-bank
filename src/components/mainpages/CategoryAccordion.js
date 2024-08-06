import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  CircularProgress,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EquipmentAccordion from './EquipmentAccordion';

const CategoryAccordion = ({
  category,
  expanded,
  handleAccordionChange,
  panel,
}) => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedEquipment, setExpandedEquipment] = useState(false);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await fetch(
          `https://www.dnd5eapi.co/api/equipment-categories/${category.index}`
        );
        const data = await response.json();
        setEquipment(data.equipment);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching equipment:', error);
        setLoading(false);
      }
    };

    if (expanded === panel) {
      fetchEquipment();
    }
  }, [expanded, category.index, panel]);

  const handleEquipmentAccordionChange =
    (equipmentPanel) => (_, isExpanded) => {
      setExpandedEquipment(isExpanded ? equipmentPanel : false);
    };

  return (
    <Accordion
      expanded={expanded === panel}
      onChange={handleAccordionChange(panel)}
      sx={{
        background: '#0004',
        color: 'white',
        borderRadius: '20px',
        marginBottom: '5px',
        width: '100%',
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ fontFamily: 'Bona Nova SC', fontSize: '14px' }}>
          {category.name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {loading ? (
          <CircularProgress />
        ) : (
          equipment.map((item, index) => (
            <EquipmentAccordion
              key={item.index}
              item={item}
              expandedEquipment={expandedEquipment}
              handleEquipmentAccordionChange={handleEquipmentAccordionChange}
              equipmentPanel={`equipmentPanel${index}`}
            />
          ))
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default CategoryAccordion;
