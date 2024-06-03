import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import explanationsData from '../240424_xaimh_output-finalized.json';
import { useNavigate } from "react-router-dom";
import styles from '../styles/PersonaPage.module.css';
import Button from "@mui/material/Button";

export default function PersonaPage({ showProceedButton = true }) {
  const [explanation, setExplanation] = useState(null);
  const [timer, setTimer] = useState(10);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Get userData from sessionStorage
    let userData = JSON.parse(sessionStorage.getItem('userData')) || {};

    // Filter explanationsData to only include entries where prediction is "healthy" or "depression"
    const healthyExplanations = explanationsData.filter(exp => exp.prediction === "healthy" && (exp.type === "Counterfactual" || exp.type === "Simple"));
    const depressedExplanations = explanationsData.filter(exp => exp.prediction === "depression" && (exp.type === "Counterfactual" || exp.type === "Simple"));

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
          Versetzen Sie sich nun in das hypothetische Szenario. Stellen Sie sich vor, Sie nutzen eine Smart-Sensing-App für mentale Gesundheit – also eine App, die Sensordaten von Ihrem Smartphone nutzt, um Informationen zu Ihrer mentalen Gesundheit zu liefern  
        </h1>
        <br/>
        <img src="..\assets\images\Explanation.png" alt="Explanation" />
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
