import React, { useState } from 'react';
import styles from '../styles/PersonaPage.module.css'; // Ensure this path is correct for your project
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';

export default function A10Page() {
  const [answers, setAnswers] = useState({
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: ''
  });

  const likertScale = {
    'Ich stimme überhaupt nicht zu': 1,
    'Ich stimme eher nicht zu': 2,
    'Ich stimme weder zu noch lehne ich ab': 3,
    'Ich stimme eher zu': 4,
    'Ich stimme voll und ganz zu': 5
  };

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
  
    
    // Convert answer labels to numerical values and save them under specific keys
    userData.patient_process_item_1 = likertScale[answers.question1];
    userData.patient_process_item_2 = likertScale[answers.question2];
    userData.patient_process_item_3 = likertScale[answers.question3];
    userData.patient_process_item_4 = likertScale[answers.question4];
    userData.patient_process_item_5 = likertScale[answers.question5];
    
    // Save updated userData to session storage
    sessionStorage.setItem('userData', JSON.stringify(userData));
    
    // Navigate to the next page
    navigate('/patient_outcome');
    window.scrollTo(0, 0);
    }
    else {
      setShowWarning(true);
      }
      };
      
    const savedExplanation = JSON.parse(sessionStorage.getItem('selectedExplanation'));
    const word = savedExplanation.prediction === "depression" ? "verbessern" : "erhalten";


  return (
    <div className={styles.containerS}>
    <h1 style={{fontSize: '18px', fontWeight:'bold'}}>Denken Sie an die App, die Sie eben gesehen haben. Stellen Sie sich vor, Sie könnten diese App nutzen. Bitte bewerten Sie auf Basis dessen folgende Aussagen.</h1>
      <br />
      <br />
      <h1 style={{fontSize: '18px', fontWeight:'bold'}}>Mit der Nutzung der App würde ich…</h1>
      <br />
      <br />
      <form>
        <div className={styles.question}>
          <h2 style={{fontSize: '16px', fontWeight:'bold', color: '#19b394'}} >
          … mich besser über meine mentale Gesundheit informiert fühlen als andere Menschen
          </h2>
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
          <h2 style={{fontSize: '16px', fontWeight:'bold', color: '#19b394'}} >
          … Wissen erlangen, das mir hilft, meinen mentalen Gesundheitszustand zu {word}
          </h2>
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
          <h2 style={{fontSize: '16px', fontWeight:'bold', color: '#19b394'}} >
          … meinen mentalen Gesundheitszustand besser verstehen
          </h2>
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

        <div className={styles.question}>
          <h2 style={{fontSize: '16px', fontWeight:'bold', color: '#19b394'}} >
          … motiviert sein, meine mentale Gesundheit zu {word} und ein besseres Leben zu haben
          </h2>
          <br />
          {['Ich stimme voll und ganz zu', 'Ich stimme eher zu', 'Ich stimme weder zu noch lehne ich ab', 'Ich stimme eher nicht zu', 'Ich stimme überhaupt nicht zu'].map(option => (
            <label key={option}>
              <input
                type="radio"
                name="question4"
                value={option}
                checked={answers.question4 === option}
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
          <h2 style={{fontSize: '16px', fontWeight:'bold', color: '#19b394'}} >
          … wissen, was zu tun ist, um meinen mentalen Gesundheitszustand zu {word}
          </h2>
          <br />
          {['Ich stimme voll und ganz zu', 'Ich stimme eher zu', 'Ich stimme weder zu noch lehne ich ab', 'Ich stimme eher nicht zu', 'Ich stimme überhaupt nicht zu'].map(option => (
            <label key={option}>
              <input
                type="radio"
                name="question5"
                value={option}
                checked={answers.question5 === option}
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
