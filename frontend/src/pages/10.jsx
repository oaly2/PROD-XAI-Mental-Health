import React, { useState, useEffect } from 'react';
import styles from '../styles/PersonaPage.module.css'; // Ensure this path is correct for your project
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';

export default function A10Page() {
  const [answers, setAnswers] = useState({
    question1: '',
    question2: '',
    question3: '',
    question4: ''
  });

  const likertScale = {
    'Ich stimme überhaupt nicht zu': 1,
    'Ich stimme nicht zu': 2,
    'Ich stimme eher nicht zu': 3,
    'Ich stimme weder zu noch lehne ich ab': 4,
    'Ich stimme eher zu': 5,
    'Ich stimme zu': 6,
    'Ich stimme voll und ganz zu': 7
  };

  const [timer, setTimer] = useState(5);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

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
    if (timer > 0) {
      setMessage("Bitte nehmen Sie sich ausreichend Zeit, alle Fragen gewissenhaft zu beantworten");
    } 
    else if(isEveryQuestionAnswered) {
    const userData = JSON.parse(sessionStorage.getItem('userData')) || {};
  
    
    // Convert answer labels to numerical values and save them under specific keys
    userData.patient_process_item_1 = likertScale[answers.question1];
    userData.patient_process_item_2 = likertScale[answers.question2];
    userData.patient_process_item_3 = likertScale[answers.question3];
    userData.patient_process_item_4 = likertScale[answers.question4];
    
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
    <h1 style={{fontSize: '18px', fontWeight:'bold'}}>Denken Sie an die Informationen, die die App eben für Alex angezeigt hat. Bitte bewerten Sie auf Basis dessen folgende Aussagen.</h1>
      <br />
      <br />
      <h1 style={{fontSize: '18px', fontWeight:'bold'}}> Mit den Informationen aus der App würde ich…</h1>
      <br />
      <br />
      <form>
        <div className={styles.question}>
          <h2 style={{fontSize: '16px', fontWeight:'bold', color: '#19b394'}} >
          … Wissen erlangen, das mir hilft, meinen mentalen Gesundheitszustand zu {word}
          </h2>
          <br />
          {['Ich stimme voll und ganz zu', 'Ich stimme zu', 'Ich stimme eher zu', 'Ich stimme weder zu noch lehne ich ab', 'Ich stimme eher nicht zu', 'Ich stimme nicht zu', 'Ich stimme überhaupt nicht zu'].map(option => (
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
           ... meinen mentalen Gesundheitszustand gut genug verstehen, um ihn {word}
          </h2>
          <br />
          {['Ich stimme voll und ganz zu', 'Ich stimme zu', 'Ich stimme eher zu', 'Ich stimme weder zu noch lehne ich ab', 'Ich stimme eher nicht zu', 'Ich stimme nicht zu', 'Ich stimme überhaupt nicht zu'].map(option => (
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
          … mich motivieren können, meine mentale Gesundheit zu {word} und ein besseres Leben zu haben
          </h2>
          <br />
          {['Ich stimme voll und ganz zu', 'Ich stimme zu', 'Ich stimme eher zu', 'Ich stimme weder zu noch lehne ich ab', 'Ich stimme eher nicht zu', 'Ich stimme nicht zu', 'Ich stimme überhaupt nicht zu'].map(option => (
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
          … wissen, was zu tun ist, um meinen mentalen Gesundheitszustand zu {word}
          </h2>
          <br />
          {['Ich stimme voll und ganz zu', 'Ich stimme zu', 'Ich stimme eher zu', 'Ich stimme weder zu noch lehne ich ab', 'Ich stimme eher nicht zu', 'Ich stimme nicht zu', 'Ich stimme überhaupt nicht zu'].map(option => (
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
        
        <br />
        
        {showWarning && (
        <p style={{ color: 'red', fontSize: '16px' }}>Bitte beantworten Sie alle Fragen, bevor Sie fortfahren.</p> // Warning message
        )}
        <br />
        {message && <p className={styles.list} style={{ color: 'red' }}>{message}</p>}

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
