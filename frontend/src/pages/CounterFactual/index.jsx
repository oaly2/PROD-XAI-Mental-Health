import React from "react";
import { Helmet } from "react-helmet";
import { Text, Heading } from "../../components";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/introductory.module.css";



export default function SurveyScreenDepressionCFPage({ explanation }) {
  const replaceUmlauts = (text) => {
    return text
      .replace(/ae/g, 'ä')
      .replace(/oe/g, 'ö')
      .replace(/ue/g, 'ü')
      .replace(/Ae/g, 'Ä') // for uppercase
      .replace(/Oe/g, 'Ö') // for uppercase
      .replace(/Ue/g, 'Ü') // for uppercase
      .replace(/_/g, ' ');
  };

  let navigate = useNavigate();

  const handleProceed = () => {
    // Navigate based on the prediction value
    if (explanation.prediction === "depression") {
      navigate("/intention_to_act_A");
    } else {
      navigate("/intention_to_act_B");
    }
  };

  const formatCounterfactualText = () => {
    const entries = [];
    if (explanation.feature_1 && explanation.percentages_feature_1 !== undefined)
      entries.push(
        <span key="feature1" style={{ color: "#15b1e2", fontWeight: "bold" }}>
          {replaceUmlauts(explanation.feature_1) + ':'} <span style={{color:'black'}}> {'Um'} {explanation.percentages_feature_1_num >= 0 ? '+' : ''}{Math.round(explanation.percentages_feature_1_num)}% {explanation.percentages_feature_1_num >= 0 ? 'steigern' : 'verringern'}</span>
        </span>
      );
    if (explanation.feature_2 && explanation.percentages_feature_2 !== undefined)
      entries.push(
        <span key="feature2" style={{ color: "#15b1e2", fontWeight: "bold" }}>
          {replaceUmlauts(explanation.feature_2) + ':'} <span style={{color:'black'}}> {'Um'} {explanation.percentages_feature_2_num >= 0 ? '+' : ''}{Math.round(explanation.percentages_feature_2_num)}% {explanation.percentages_feature_2_num >= 0 ? 'steigern' : 'verringern'}</span>
        </span>
      );
    if (explanation.feature_3 && explanation.percentages_feature_3 !== undefined)
      entries.push(
        <span key="feature3" style={{ color: "#15b1e2", fontWeight: "bold" }}>
          {replaceUmlauts(explanation.feature_3) + ':'} <span style={{color:'black'}}> {'Um'} {explanation.percentages_feature_3_num >= 0 ? '+' : ''}{Math.round(explanation.percentages_feature_3_num)}% {explanation.percentages_feature_3_num >= 0 ? 'steigern' : 'verringern'}</span>
        </span>
      );
      if (explanation.feature_4 && explanation.percentages_feature_4 !== undefined)
      entries.push(
        <span key="feature4" style={{ color: "#15b1e2", fontWeight: "bold" }}>
          {replaceUmlauts(explanation.feature_4) + ':'} <span style={{color:'black'}}> {'Um'} {explanation.percentages_feature_4_num >= 0 ? '+' : ''}{Math.round(explanation.percentages_feature_4_num)}% {explanation.percentages_feature_4_num >= 0 ? 'steigern' : 'verringern'}</span>
        </span>
      );  

    return entries.length > 0 ? (
      <Text as="p" className="text-center text-base md:text-xl mx-2 my-4" style={{ fontSize: '1.5em' }}>
        {explanation.prediction === "depression" ? 
          "Die folgenden Veränderungen hätten zur Vorhersage eines niedrigen Depressionsrisikos durch die KI geführt:" : 
          "Die folgenden Veränderungen hätten zur Vorhersage eines erhöhten Depressionsrisikos durch die KI geführt:"}
        {entries.map((entry, index) => (
          <React.Fragment key={index}>
            <br />
            <br />

            {entry}
          </React.Fragment>
        ))}
      </Text>
    ) : null;
  };


  return (
    <>
      <Helmet>
        <title>Smart-Sensing-Apps für mentale Gesundheit</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className={styles.container} style={{padding:'15px 15px'}}>  
        <Text as="p" className="text-center text-2xl md:text-4xl mb-8">
          Deine KI-Vorhersage
        </Text>
        <div className="bg-blue-50 rounded-lg mx-auto px-20 py-6">
          <Text className="text-center text-xl md:text-2xl font-semibold mt-4" style={{ fontSize: '2.0em' }} >
            Die KI prognostiziert auf Basis<br />deiner Smartphone-Daten<br /><br />   
          </Text>
          <Heading as="h2" className={`${explanation.prediction === "depression" ? "text-red-A700" : "text-green-600"} text-3xl md:text-5xl text-center`} style={{ fontSize: '2.5em' }}  >
            {explanation.prediction === "depression" ? "Erhöhtes Depressionsrisiko" : "Niedriges Depressionsrisiko"}
          </Heading>
        </div>
        {formatCounterfactualText()}
        <Text as="p" className="text-blue_gray-400 text-sm md:text-base text-center mt-auto" style={{marginTop: '20px'}}>
          Alle angezeigten Ergebnisse sind lediglich Vorhersagen einer KI. Als solche können sie nur Hinweise auf
          den Gesundheitszustand geben. Sie können keine medizinische Diagnose stellen und ersetzen keinesfalls
          einen Arztbesuch. Wenn du dich deprimiert fühlst, wende dich an einen Arzt.
        </Text>

        
      </div>
        <Button
          variant="contained"
          onClick={handleProceed}
          style={{ color: 'white', backgroundColor: '#19b394', fontWeight: 'bold', fontSize: '16px', padding: '10px 20px', width: '10%', marginLeft: '45%'}}
        > 
          Weiter &#x279C;
        </Button>
    </>
  );
}
