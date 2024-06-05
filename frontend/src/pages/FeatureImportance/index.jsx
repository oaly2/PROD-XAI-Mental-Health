import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Text, Heading } from "../../components";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/introductory.module.css";

export default function FeatureImportancePage() {
  const [explanation, setExplanation] = useState(null);
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

  useEffect(() => {
    // Retrieve the saved explanation from session storage
    const savedExplanation = JSON.parse(sessionStorage.getItem('selectedExplanation'));
    console.log("Retrieved explanation from session storage:", savedExplanation);
    if (savedExplanation) {
      setExplanation(savedExplanation);
    } else {
      console.log("No explanation found in session storage.");
    }
  }, []);

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

  const valueMapping = {
    "Stark unterdurchschnittlich": "sehr gering",
    "Leicht unterdurchschnittlich": "gering",
    "Durchschnittlich": "durchschnittlich",
    "Leicht überdurchschnittlich": "hoch",
    "Stark überdurchschnittlich": "sehr hoch"
  };

  const featureMapping = {
    "Dein_Stresslevel": "Dein Stresslevel",
    "Deine_Schlafqualitaet": "Deine Schlafqualität",
    "Anzahl_deiner_sozialen_Kontakte": "Deine Anzahl sozialer Kontakte",
    "Qualitaet_deiner_sozialen_Kontakte": "Deine Qualität sozialer Kontakte",
    "Qualitaet_deiner_Ernaehrung": "Deine Qualität der Ernährung",
    "Deine_sportliche_Aktivitaet": "Deine sportliche Aktivität",
    "Zeit_am_Handy": "Deine Zeit am Handy",
    "Laenge_deiner_Telefonate": "Deine Länge der Telefonate",
    "Deine_Mobilitaet": "Deine Mobilität"
  };

  const mappedValue = (value) => valueMapping[value] || value;
  const mappedFeature = (feature) => featureMapping[feature] || feature;

  const formatText = () => {
    if (!explanation) {
      return null;
    }

    const features = [];

    if (explanation.feature_1 !== undefined) {
      features.push({
        feature: replaceUmlauts(mappedFeature(explanation.feature_1)),
      });
    }
    if (explanation.feature_2 !== undefined) {
      features.push({
        feature: replaceUmlauts(mappedFeature(explanation.feature_2)),
      });
    }
    if (explanation.feature_3 !== undefined) {
      features.push({
        feature: replaceUmlauts(mappedFeature(explanation.feature_3)),
      });
    }
    if (explanation.feature_4 !== undefined) {
      features.push({
        feature: replaceUmlauts(mappedFeature(explanation.feature_4)),
      });
    }

    if (features.length === 0) return null;


    return (
      <div style={{ textAlign: 'center' }}>
        <Text as="p" className="text-center text-base md:text-xl mx-2 my-4" style={{ fontSize: '1.25em', lineHeight: '1.5em' }}>
        Folgendes hat am meisten dazu beigetragen, dass Du diese Prognose von der KI erhältst
        </Text>
        <ul className={styles.listCenter}>
          {features.map((f, index) => (
            <li key={index} style={{ color: "#15b1e2", fontWeight: "bold", fontSize: '18px', marginBottom: '10px' }}>
              {f.feature}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  if (!explanation) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Smart-Sensing-Apps für mentale Gesundheit</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className={styles.container} style={{padding: '0.5vw', marginBottom: '0.5vw'}}>
      <div className={styles.container} style={{padding: '0.5vw'}}>  
        <h1 className={styles.subTitle} style={{color: 'black', fontWeight: 'normal'}}>
        XXVersetzen Sie sich weiterhin in die Lage von Alex. Alex öffnet die App und bekommt folgende Nachricht angezeigt. Bitte sehen Sie sich den Bildschirm genau an.  
        </h1>
      </div>

      <div className={styles.container} style={{padding: '0.5vw'}}>
        <div className="bg-blue_gray-100 rounded-lg mx-auto px-5 py-4">
          <Text className="text-center text-xl md:text-2xl font-semibold mt-4" style={{ fontSize: '2.0em' }}>
          Die KI prognostiziert auf Basis Deiner Sensordaten von Smartphone und anderen Geräten ein<br /><br />
          </Text>
          <Heading as="h2" className={`${explanation.prediction === "depression" ? "text-red-A700" : "text-green-600"} text-3xl md:text-5xl text-center`} style={{ fontSize: '2.5em' }}>
            {explanation.prediction === "depression" ? "Erhöhtes Depressionsrisiko" : "Niedriges Depressionsrisiko"}
          </Heading>
        </div>
        {formatText()}
        <Text as="p" className="text-blue_gray-400 text-sm md:text-base text-center mt-auto" style={{marginTop: '1vw'}}>
          Alle angezeigten Ergebnisse sind lediglich Vorhersagen einer KI. Als solche können sie nur Hinweise auf
          den Gesundheitszustand geben. Sie können keine medizinische Diagnose stellen und ersetzen keinesfalls
          einen Arztbesuch. Wenn du dich depressiv fühlst, wende dich an einen Arzt.
        </Text>
      </div>

        {message && (
          <div className={styles.messageContainer}>
            <p className={styles.messageText}>{message}</p>
          </div>
        )}
      
        <Button
          variant="contained"
          onClick={handleProceed}
          style={{ color: 'white', backgroundColor: '#19b394', fontWeight: 'bold', fontSize: '16px', padding: '10px 20px', width: '15%'}}
        > 
          Weiter &#x279C;
        </Button>
      </div>
    </>
  );
}
