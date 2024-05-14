import React, { useState } from 'react';
import styles from '../styles/PersonaPage.module.css'; // Ensure this path is correct for your project
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';

export default function B6Page() {
  const [answers, setAnswers] = useState({
    question1: '',
    question2: '',
    question3: ''
  });

  const likertScale = {
    'Ich stimme überhaupt nicht zu': 1,
    'Ich stimme eher nicht zu': 2,
    'Ich stimme weder zu noch lehne ich ab': 3,
    'Ich stimme eher zu': 4,
    'Ich stimme voll und ganz zu': 5
  };

  
  const [showWarning, setShowWarning] = useState(false);

  
  // Check if all questions are answered to enable the button
  const isEveryQuestionAnswered = Object.values(answers).every(answer => answer !== '');
  
  let navigate = useNavigate();
  
  const handleOptionChange = (e) => {
    const { name, value } = e.target;
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [name]: value
    }));
  };
  
  const handleProceed = () => {
    if(isEveryQuestionAnswered) {
      const delta = Math.abs(likertScale[answers.question2] - likertScale[answers.question3]);
      const qualityCheckIntentionToAct = delta > 2 ? 'low' : 'high';
      
      const userData = JSON.parse(sessionStorage.getItem('userData')) || {};

      userData.intention_to_act_item_1 = likertScale[answers.question1];
      userData.intention_to_act_item_2 = likertScale[answers.question2];
      userData.intention_to_act_item_3 = likertScale[answers.question3];  

      userData.quality_check_intention_to_act = qualityCheckIntentionToAct;

      sessionStorage.setItem('userData', JSON.stringify(userData));

      navigate('/intention_to_use');
      window.scrollTo(0, 0);
    }
    else {
      setShowWarning(true);
    }
  };


  return (
    <div className={styles.container}>
      <h1 style={{fontSize: '18px', fontWeight:'bold'}}>Wie würden Sie in dem hypothetischen Szenario auf das Ergebnis der KI-Auswertung reagieren?</h1>
      <br />
      <br />
      <form>
        <div className={styles.question}>
          <h2 style={{fontSize: '16px', fontWeight:'bold', color: '#19b394'}} >Ich könnte mir vorstellen, Präventionsmaßnahmen für mich in Anspruch zu nehmen</h2> {/* Change this question to whatever you wish */}
          <br />
          {['Ich stimme voll und ganz zu', 'Ich stimme eher zu', 'Ich stimme weder zu noch lehne ich ab', 'Ich stimme eher nicht zu', 'Ich stimme überhaupt nicht zu'].map(option => (
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
        
        <div className={styles.question}>
          <h2 style={{fontSize: '16px', fontWeight:'bold', color: '#19b394'}} >Ich würde in der Zukunft Angebote aufsuchen, die sich um die Prävention meiner psychischen Gesundheit sorgen können </h2>
          <br />
          {['Ich stimme voll und ganz zu', 'Ich stimme eher zu', 'Ich stimme weder zu noch lehne ich ab', 'Ich stimme eher nicht zu', 'Ich stimme überhaupt nicht zu'].map(option => (
            <label key={option}>
              <input
                type="radio"
                name="question2"
                value={option}
                checked={answers.question2 === option}
                onChange={handleOptionChange}
                className={styles.radio}  
              />
              {option}
              <br /><br />
            </label>
          ))}
        </div>
        <br />  
        
        <div className={styles.question}>
          <h2 style={{fontSize: '16px', fontWeight:'bold', color: '#19b394'}} >Ich würde versuchen, Einrichtungen für mich zu finden, die sich um die Prävention meiner psychischen Gesundheit sorgen können</h2>
          <br />
          {['Ich stimme voll und ganz zu', 'Ich stimme eher zu', 'Ich stimme weder zu noch lehne ich ab', 'Ich stimme eher nicht zu', 'Ich stimme überhaupt nicht zu'].map(option => (
            <label key={option}>
              <input
                type="radio"
                name="question3"
                value={option}
                checked={answers.question3 === option}
                onChange={handleOptionChange}
                className={styles.radio}
              />
              {option}
              <br /><br />
            </label>
          ))}
        </div>
        
        <br />

        {showWarning && (
        <p style={{ color: 'red', fontSize: '16px' }}>Bitte beantworten Sie alle Fragen, bevor Sie fortfahren.</p> // Warning message
        )}

        <br />
        
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
