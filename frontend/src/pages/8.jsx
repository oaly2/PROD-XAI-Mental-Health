import React, { useState } from 'react';
import styles from '../styles/PersonaPage.module.css'; // Ensure this path is correct for your project
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';

export default function A8Page() {
  const [answers, setAnswers] = useState({
    question1: ''
  });

  const handleOptionChange = (e) => {
    const { name, value } = e.target;
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [name]: value
    }));
  };

  
  const [showWarning, setShowWarning] = useState(false);
  
  // Check if all questions are answered to enable the button
  const isEveryQuestionAnswered = Object.values(answers).every(answer => answer !== '');

  let navigate = useNavigate();

  const handleProceed = () => {
    if(isEveryQuestionAnswered) {
    const userData = JSON.parse(sessionStorage.getItem('userData')) || {};

    // Save attention check based on the first question's answer
    userData.attention_check_1 = answers.question1 === 'Apps, die die mentale Gesundheit fördern sollen ';

    if(userData.FAILED === true) {
      userData.attention_check_1 = false;
    }

    sessionStorage.setItem('userData', JSON.stringify(userData));

    // Navigate to the next page
    navigate('/performance_expectancy');
    window.scrollTo(0, 0);
    }
    else {
      setShowWarning(true);
    }
  };


  return (
    <div className={styles.container} style={{marginTop: '200px'}}>
      <form>
        <div className={styles.question}>
          <h2 style={{fontSize: '18px', fontWeight:'bold', color: '#19b394'}} >Worum genau geht es in der Studie, an der Sie gerade teilnehmen?</h2> {/* Change this question to whatever you wish */}
          <br />
          {['Apps, die die mentale Gesundheit fördern sollen ', 'Apps, die die körperliche Gesundheit fördern sollen ', 'Apps, die auf Daten von Berufsnetzwerken wie LinkedIn basieren ', 'Apps, die auf Daten von Banken basieren '].map(option => (
            <label key={option}>
              <input
                type="radio"
                name="question1"
                value={option}
                checked={answers.question1 === option}
                onChange={handleOptionChange}
                className={styles.radio}
              />
              {option}
              <br /><br />
            </label>
          ))}
        </div>
        <br />
        
        <br />

        {showWarning && (
        <p style={{ color: 'red', fontSize: '16px' }}>Bitte beantworten Sie alle Fragen, bevor Sie fortfahren.</p> // Warning message
        )}
        
        <Button
          variant="contained"
          onClick={handleProceed}
          style={{ color: 'white', backgroundColor: '#19b394', fontWeight: 'bold', fontSize: '16px', padding: '10px 20px'}}
        > 
          Weiter &#x279C;
        </Button>
      </form>
    </div>
  );
}
