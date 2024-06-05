import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import explanationsData from '../240424_xaimh_output-finalized.json';
import { useNavigate } from "react-router-dom";
import styles from '../styles/PersonaPage.module.css';
import Button from "@mui/material/Button";
import explanationImage from '../assets/images/Explanation.png';

export default function PersonaPage({ showProceedButton = true }) {
  const [explanation, setExplanation] = useState(null);
  const [timer, setTimer] = useState(10);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Get userData from sessionStorage
    let userData = JSON.parse(sessionStorage.getItem('userData')) || {};

    // Filter explanationsData to only include entries where prediction is "healthy" or "depression"
    const healthyExplanations = explanationsData.filter(exp => exp.prediction === "healthy");
    const depressedExplanations = explanationsData.filter(exp => exp.prediction === "depression");

    // Randomly select a category: healthy or depression
    const isHealthy = Math.random() < 0.5; // 50% chance for each
    const selectedCategory = isHealthy ? healthyExplanations : depressedExplanations;

    // Select explanation and add to userData
    let savedExplanation = sessionStorage.getItem('selectedExplanation');

    if (savedExplanation) {
      savedExplanation = JSON.parse(savedExplanation);
      userData.explanation_id = savedExplanation.obj_id;
    } else {
      const randomIndex = Math.floor(Math.random() * selectedCategory.length);
      savedExplanation = selectedCategory[randomIndex];
      userData.explanation_id = savedExplanation.obj_id;
      sessionStorage.setItem('selectedExplanation', JSON.stringify(savedExplanation));
    }
    setExplanation(savedExplanation);
    sessionStorage.setItem('userData', JSON.stringify(userData));
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleProceed = () => {
    if (timer > 0) {
      setMessage("Bitte nehmen Sie sich noch etwas mehr Zeit um die Informationen anzusehen. Sie sollten diese für die kommenden Fragen verinnerlicht haben");
    } else {
      navigate('/home');
    }
  };

  if (!explanation) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Smart-Sensing-Apps für mentale Gesundheit</title>
      </Helmet>
      <br/>
      <div className={styles.container}>
        <h1 className={styles.subTitle}>
        Versetzen Sie sich nun in das hypothetische Szenario.

        <br/>
        <br/>


        Sie sind Alex. Alex nutzt eine Smart-Sensing-App für mentale Gesundheit – also eine App, die Sensordaten vom Smartphone und anderen Geräten nutzt, um Prognosen zur mentalen Gesundheit von Alex zu liefern. Alex erhält folgende Informationen zu der App.

        <br/>
        <br/>


        Bitte sehen Sie sich die Informationen genau an.
  
        </h1>
        <br/>
        <br/>
        <img src={explanationImage} alt="Explanation" className={styles.image} style={{borderRadius: '10px'}}/>
        <br/>
        {showProceedButton && (
          <>
            <br/>
            {message && <p className={styles.list} style={{ color: 'red' }}>{message}</p>}
            <br/>
            <Button
              variant="contained"
              onClick={handleProceed}
              style={{ color: 'white', backgroundColor: '#19b394', fontWeight: 'bold', fontSize: '16px', padding: '10px 20px'}}
            >
              Weiter &#x279C;
            </Button>
          </>
        )}
      </div>
    </>
  );
}
