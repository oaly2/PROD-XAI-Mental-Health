import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button, TextField } from '@mui/material';
import styles from '../styles/introductory.module.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';


export default function WrongPage() {
    let navigate = useNavigate();
    let location = useLocation();

    const [prolificId, setProlificId] = useState('');

    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        const userData = JSON.parse(sessionStorage.getItem('userData')) || {};
        userData.prolific_id_input_user = prolificId;

        sessionStorage.setItem('userData', JSON.stringify(userData));
    }, [prolificId]); // Only run this effect if prolificId changes.

    useEffect(() => {
        // Parse the query string from the URL
        const params = queryString.parse(location.search);

        // Get existing userData from sessionStorage or initialize it if not present
        const userData = JSON.parse(sessionStorage.getItem('userData')) || {};

        // Check if the 'PROLIFIC_ID' parameter is present in the URL
        if (params.PROLIFIC_ID) {
            // Update userData with the 'PROLIFIC_ID' from params
            userData.PROLIFIC_ID = params.PROLIFIC_ID;
        }

        // Save the updated userData back to sessionStorage
        sessionStorage.setItem('userData', JSON.stringify(userData));
    }, [location.search]); // Depend only on location.search to avoid unnecessary executions
    

    const handleProceed = () => {
        if (prolificId.trim() !== '') {
            navigate("intro");
            window.scrollTo(0, 0);
        } else {
            setShowWarning(true);
        }
    };

    return (
        <>
          <Helmet>
            <title>Smart-Sensing-Apps für mentale Gesundheit</title>
            <meta name="description" content="Introductory page of the experiment" />
          </Helmet>
          <div className={styles.container}>

            <h1 className={styles.title}> Bitte geben Sie Ihre Prolific-ID ein  </h1>
            <TextField 
              label={'Prolific ID' + '\u00A0'+ '\u00A0'+ '\u00A0'+ '\u00A0'+ '\u00A0'+ '\u00A0'}
              value={prolificId}
              onChange={(e) => setProlificId(e.target.value)}
              variant="outlined"
              fullWidth
              margin="normal"
              padding="30px"
              
              InputLabelProps={{
                style: { fontSize: '22px'}
              }}

              inputProps={{
                spellCheck: 'false',
                style:{ boxShadow: 'none', color: 'black', marginTop: '20px', marginBottom: '15px', marginLeft: '10px', fontSize: '16px'} 
              }}
            />

            <br />

            {showWarning && (
            <p style={{ color: 'red', fontSize: '16px' }}>
                Bitte geben Sie Ihre Prolific-ID ein</p> // Warning message
            )}
            <br />    


            <Button
              variant="contained"
              onClick={handleProceed}
              style={{ color: 'white', backgroundColor: '#19b394', fontWeight: 'bold', fontSize: '16px', padding: '10px 20px'}}
            >
              Weiter &#x279C;
            </Button>
          </div>
        </>
      );
}
