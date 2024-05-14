import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Select, MenuItem, Button, InputLabel, FormControl } from '@mui/material';
import styles from '../styles/PersonaPage.module.css';
import PersonaPage from './Persona'; // Import PersonaPage component

// Updated mapping for the options
const optionsMapping = {
  'Stark unterdurchschnittlich': 'Sehr gering',
  'Leicht unterdurchschnittlich': 'Gering',
  'Durchschnittlich': 'Durchschnittlich',
  'Leicht überdurchschnittlich': 'Hoch',
  'Stark überdurchschnittlich': 'Sehr hoch'
};

// Create an array of new values based on the mapping
const options = Object.values(optionsMapping);

export default function QuizPage() {
  const navigate = useNavigate();
  const [explanation, setExplanation] = useState({});
  const [answers, setAnswers] = useState({});
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const savedExplanation = sessionStorage.getItem('selectedExplanation');
    const explanationData = savedExplanation ? JSON.parse(savedExplanation) : null;

    if (explanationData) {
      setExplanation(explanationData);
      const featureKeys = Object.keys(featureLabels);
      const selectedFeatures = featureKeys.sort(() => 0.5 - Math.random()).slice(0, 3);
      setFeatures(selectedFeatures);

      const initialAnswers = selectedFeatures.reduce((acc, feature) => ({
        ...acc,
        [feature]: '' // default value to match the middle option
      }), {});

      setAnswers(initialAnswers);
    } else {
      navigate('/persona'); // Redirect if no explanation data is found
    }
  }, [navigate]);

  const handleSelectChange = (feature, value) => {
    // Map the value back to the original before setting it
    const originalValue = Object.keys(optionsMapping).find(key => optionsMapping[key] === value);
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [feature]: originalValue
    }));
  };

  const handleSubmit = () => {
    const allCorrect = features.every(feature => answers[feature] === explanation[feature]);
    if (allCorrect) {
      navigate('/pre');
    } else {
      navigate('/wrong');
    }
    window.scrollTo(0, 0);
  };

  const featureLabels = {
    Dein_Stresslevel: 'Dein Stresslevel',
    Deine_Schlafqualitaet: 'Deine Schlafqualität',
    Anzahl_deiner_sozialen_Kontakte: 'Deine Anzahl sozialer Kontakte',
    Qualitaet_deiner_sozialen_Kontakte: 'Deine Qualität sozialer Kontakte',
    Qualitaet_deiner_Ernaehrung: 'Deine Qualität der Ernährung',
    Deine_sportliche_Aktivitaet: 'Deine sportliche Aktivität',
    Zeit_am_Handy: 'Deine Zeit am Handy',
    Laenge_deiner_Telefonate: 'Deine Länge der Telefonate',
    Deine_Mobilitaet: 'Deine Mobilität'
  };

  return (
    <div className={styles.container} style={{marginTop: '90px'}}>
      <h1 className={styles.subTitle} style={{ fontSize: '1.4em' }}>
      Sie haben ein hypothetisches Szenario kennengelernt. Wie ausgeprägt sind die folgenden Informationen in diesem Szenario?
      </h1>
      <br />
      {features.map((feature, index) => (
        <FormControl key={index} fullWidth margin="normal">
          <InputLabel id={`label-${feature}`} style={{ color: '#19b394', fontSize: '20px', fontWeight: 'bold' }}>
            {featureLabels[feature]}
          </InputLabel>
          <Select
            labelId={`label-${feature}`}
            label={featureLabels[feature] + '\u00A0'.repeat(16)}
            value={optionsMapping[answers[feature]]} // Display mapped value
            onChange={(e) => handleSelectChange(feature, e.target.value)}
          >
            {options.map((option, idx) => (
              <MenuItem key={idx} value={option}>{option}</MenuItem>
            ))}
          </Select>
          <br />
          <br />
        </FormControl>
      ))}
      <Button variant="contained" onClick={handleSubmit} style={{ color: 'white', backgroundColor: '#19b394', fontWeight: 'bold', fontSize: '16px', padding: '10px 20px', marginBottom:'-20px'}}>
        Weiter &#x279C;
      </Button>
      {/* Always render the Persona Page */}
      <PersonaPage showProceedButton={false} />
    </div>
  );
}
