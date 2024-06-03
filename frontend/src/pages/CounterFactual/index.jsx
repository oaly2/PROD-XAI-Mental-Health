import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Text, Heading } from "../../components";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/introductory.module.css";
import PersonaPage from "../Persona";

export default function SurveyScreenDepressionCFPage({ explanation }) {
  const [timer, setTimer] = useState(10);
  const [message, setMessage] = useState("");
  
  let navigate = useNavigate();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

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

  const handleProceed = () => {
    if (timer > 0) {
      setMessage("Bitte nehmen Sie sich noch etwas mehr Zeit um die Informationen anzusehen. Sie sollten diese für die kommenden Fragen verinnerlicht haben");
    } else {
      // Navigate based on the prediction value
      if (explanation.prediction === "depression") {
        navigate("/intention_to_act_A");
      } else {
        navigate("/intention_to_act_B");
      }
    }
  };

  const formatCounterfactualText = () => {
    const features = [];

    if (explanation.feature_1 && explanation.percentages_feature_1 !== undefined) {
      features.push({
        feature: replaceUmlauts(explanation.feature_1),
        value: explanation.original_value_1,
        percentage: explanation.percentages_feature_1_num
      });
    }
    if (explanation.feature_2 && explanation.percentages_feature_2 !== undefined) {
      features.push({
        feature: replaceUmlauts(explanation.feature_2),
        value: explanation.original_value_2,
        percentage: explanation.percentages_feature_2_num
      });
    }
    if (explanation.feature_3 && explanation.percentages_feature_3 !== undefined) {
      features.push({
        feature: replaceUmlauts(explanation.feature_3),
        value: explanation.original_value_3,
        percentage: explanation.percentages_feature_3_num
      });
    }
    if (explanation.feature_4 && explanation.percentages_feature_4 !== undefined) {
      features.push({
        feature: replaceUmlauts(explanation.feature_4),
        value: explanation.original_value_4,
        percentage: explanation.percentages_feature_4_num
      });
    }

    if (features.length === 0) return null;

    const formattedFeatures = features.map((f, index) => (
      <span key={index} style={{ color: "#15b1e2", fontWeight: "bold" }}>
        {f.feature} ({f.value})
      </span>
    ));

    const featureDescriptions = features.map((f, index) => (
      <span key={index} style={{ color: "#15b1e2", fontWeight: "bold" }}>
        {f.feature} um {Math.abs(Math.round(f.percentage))}% {f.percentage >= 0 ? 'höher' : 'geringer'}
      </span>
    ));

    const joinedFeatures = formattedFeatures.reduce((acc, curr, index) => {
      if (index === 0) {
        return [curr];
      } else if (index === features.length - 1) {
        return [...acc, ' und ', curr];
      } else {
        return [...acc, ', ', curr];
      }
    }, []);

    const joinedFeatureDescriptions = featureDescriptions.reduce((acc, curr, index) => {
      if (index === 0) {
        return [curr];
      } else if (index === features.length - 1) {
        return [...acc, ' und ', curr];
      } else {
        return [...acc, ', ', curr];
      }
    }, []);

    return (
      <Text as="p" className="text-center text-base md:text-xl mx-2 my-4" style={{ fontSize: '1.25em', lineHeight: '1.75em' }}>
        {joinedFeatures} sind besonders relevant für die Prognose der KI. Die KI würde {explanation.prediction === "depression" ? "ein erhöhtes Depressionsrisiko" : "ein niedriges Depressionsrisiko"} prognostizieren, wenn {joinedFeatureDescriptions} wäre.
      </Text>
    );
  };

  return (
    <>
      <Helmet>
        <title>Smart-Sensing-Apps für mentale Gesundheit</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className={styles.container} style={{padding:'15px 15px'}}>  
        <div className="bg-blue-50 rounded-lg mx-auto px-20 py-6">
          <Text className="text-center text-xl md:text-2xl font-semibold mt-4" style={{ fontSize: '2.0em' }} >
            Die KI prognostiziert auf Basis<br />deiner Smartphone-Daten<br /><br />   
          </Text>
          <Heading as="h2" className={`${explanation.prediction === "depression" ? "text-red-A700" : "text-green-600"} text-3xl md:text-5xl text-center`} style={{ fontSize: '2.5em' }}  >
            {explanation.prediction === "depression" ? "Erhöhtes Depressionsrisiko" : "Niedriges Depressionsrisiko"}
          </Heading>
        </div>
        <Text as="p" style={{ fontSize: '1.25em', marginTop: '20px' }}>
          Die KI-Prognose basiert auf den folgenden Informationen:
        </Text>
        {formatCounterfactualText()}
        <Text as="p" className="text-blue_gray-400 text-sm md:text-base text-center mt-auto" style={{marginTop: '20px'}}>
          Alle angezeigten Ergebnisse sind lediglich Vorhersagen einer KI. Als solche können sie nur Hinweise auf
          den Gesundheitszustand geben. Sie können keine medizinische Diagnose stellen und ersetzen keinesfalls
          einen Arztbesuch. Wenn du dich deprimiert fühlst, wende dich an einen Arzt.
        </Text>
      </div>
      
      <PersonaPage showProceedButton={false} />

      <div style={{ marginBottom: '50px' }}>
          <br/>
          {message && <p className= {styles.list} style={{ color: 'red', marginLeft: '15%' }}>{message}</p>}
          <br/>
        <Button
          variant="contained"
          onClick={handleProceed}
          style={{ color: 'white', backgroundColor: '#19b394', fontWeight: 'bold', fontSize: '16px', padding: '10px 20px', width: '10%', marginLeft: '45%', marginBottom: '30px'}}
        > 
          Weiter &#x279C;
        </Button>
      </div>
    </>
  );
}
