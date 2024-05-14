import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import explanationsData from '../240424_xaimh_output-finalized.json';
import { useNavigate } from "react-router-dom";
import styles from '../styles/PersonaPage.module.css';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";    

export default function PersonaPage({ showProceedButton = true }) {
  const [explanation, setExplanation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get userData from sessionStorage
    let userData = JSON.parse(sessionStorage.getItem('userData')) || {};

    // Filter explanationsData to only include entries where prediction is "healthy"
    const healthyExplanations = explanationsData.filter(exp => exp.prediction === "healthy");

    // Filter explanationsData to only include entries where prediction is "depression"
    const depressedExplanations = explanationsData.filter(exp => exp.prediction === "depression");

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

  const handleProceed = () => {
    navigate('/quiz');
  };

  const valueMapping = {
    "Stark unterdurchschnittlich": "Sehr gering",
    "Leicht unterdurchschnittlich": "Gering",
    "Durchschnittlich": "Durchschnittlich",
    "Leicht überdurchschnittlich": "Hoch",
    "Stark überdurchschnittlich": "Sehr hoch"
  };

  const mappedValue = (value) => valueMapping[value] || value;


  if (!explanation) {
    return <div>Loading...</div>;
  }

  const onComplete = () => {
    navigate('/quiz', { state: { explanation } })
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Helmet>
        <title>Smart-Sensing-Apps für mentale Gesundheit</title>
      </Helmet>
      <br/>
      <div className={styles.container}>
      {showProceedButton && (
        <h1 className={styles.subTitle}>
        Versetzen Sie sich nun in das hypothetische Szenario. Stellen Sie sich vor, Sie nutzen eine Smart-Sensing-App für mentale Gesundheit – also eine App, die Sensordaten von Ihrem Smartphone nutzt, um Informationen zu Ihrer mentalen Gesundheit zu liefern.  
        <br/> <br/>
        Bitte merken Sie sich die folgenden Informationen, damit Sie die Studie erfolgreich fortsetzen können.
        <br/> <br/> <br/>
        </h1>
        )}
        <h1 className={styles.subTitle}>
        Stellen Sie sich vor, die App hätte folgende Informationen über Sie gesammelt.  
        </h1>
        <br/>
        <ul className={styles.list}>
          {[
            { label: 'Dein Stresslevel', value: mappedValue(explanation.Dein_Stresslevel) },
            { label: 'Deine Schlafqualität', value: mappedValue(explanation.Deine_Schlafqualitaet) },
            { label: 'Deine Anzahl sozialer Kontakte'+ '\u00A0'+ '\u00A0'+ '\u00A0'+ '\u00A0', value:  mappedValue(explanation.Anzahl_deiner_sozialen_Kontakte) },
            { label: 'Deine Qualität sozialer Kontakte' + '\u00A0'+ '\u00A0'+ '\u00A0'+ '\u00A0'+ '\u00A0'+ '\u00A0', value: mappedValue(explanation.Qualitaet_deiner_sozialen_Kontakte) },
            { label: 'Deine Qualität der Ernährung'+ '\u00A0'+ '\u00A0'+ '\u00A0'+ '\u00A0', value: mappedValue(explanation.Qualitaet_deiner_Ernaehrung) },
            { label: 'Deine sportliche Aktivität'+ '\u00A0'+ '\u00A0', value: mappedValue(explanation.Deine_sportliche_Aktivitaet) },
            { label: 'Deine Zeit am Handy', value: mappedValue(explanation.Zeit_am_Handy) },
            { label: 'Deine Länge der Telefonate'+ '\u00A0'+ '\u00A0'+ '\u00A0'+ '\u00A0', value: mappedValue(explanation.Laenge_deiner_Telefonate) },
            { label: 'Deine Mobilität'+ '\u00A0'+ '\u00A0'+ '\u00A0'+ '\u00A0', value: mappedValue(explanation.Deine_Mobilitaet) }
          ].map((item, index) => (
            <TextField 
              key={index}
              label={ '\u00A0'+ item.label + '\u00A0' .repeat(12) }
              value={item.value || ''}
              variant="outlined"
              fullWidth
              Read only
              margin="normal"
              padding="30px"
              
              InputLabelProps={{
                style: { color: '#19b394', fontSize: '20px', fontWeight: 'bold'},
                shrink: true
              }}

              inputProps={{
                spellCheck: 'false',
                style:{ boxShadow: 'none', color: 'black', cursor: 'default', marginTop: '15px', marginBottom: '15px', marginLeft: '10px', fontSize: '16px'} 
              }}

              sx={{
                pointerEvents: 'none' // This will make the TextField not clickable
              }}
            />
          ))}
          <br/>
        </ul>
        <br/>
        {showProceedButton&& (
          <Button
          variant="contained"
          onClick={onComplete}
          style={{ color: 'white', backgroundColor: '#19b394', fontWeight: 'bold', fontSize: '16px', padding: '10px 20px'}}
        >
          Weiter &#x279C;
        </Button>
        )}
      </div>
    </>
  );
}
