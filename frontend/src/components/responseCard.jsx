import React, { useState } from 'react';
import { Card, CardContent, Typography, Collapse, CardActions, Button, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const ResponseCard = ({ response, index }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card variant="outlined" sx={{ marginBottom: 2, fontFamily: 'Inter', backgroundColor: '#f4f4f4' }}>
      <CardContent>
        <Typography variant="h6" component="div" style={{fontFamily: 'Inter', fontWeight: 'bold' }}>
          Response {index + 1}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
  <Button 
    endIcon={expanded ? <ExpandLessIcon style={{ color: '#19b394' }} /> : <ExpandMoreIcon style={{ color: '#19b394' }} />} 
    onClick={handleExpandClick} 
    size="small"
    style={{ color: '#19b394', fontWeight: 'bold' }} // This changes the text color
  >
    {expanded ? '\u00A0Hide Details' : '\u00A0View Details'}
  </Button>
</CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph style={{fontFamily: 'Inter', fontWeight: 'bold' }}>Age: <span style={{color: '#19b394', fontFamily: 'Inter', fontWeight: 'bold', fontSize: '16px' }}>{response.age}</span> </Typography>
          <Typography paragraph style={{fontFamily: 'Inter', fontWeight: 'bold' }}>Gender: <span style={{color: '#19b394', fontFamily: 'Inter', fontWeight: 'bold', fontSize: '16px' }}>{response.gender}</span></Typography>
          <Typography paragraph style={{fontFamily: 'Inter', fontWeight: 'bold' }}>Education: <span style={{color: '#19b394', fontFamily: 'Inter', fontWeight: 'bold', fontSize: '16px' }}>{response.education}</span></Typography>
          {/* Add more details as needed */}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ResponseCard;
