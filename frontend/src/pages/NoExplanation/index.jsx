import React from "react";
import { Helmet } from "react-helmet";
import { Text, Heading } from "../../components";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/introductory.module.css";


export default function SurveyScreenDepressionPage( { explanation }) {

  let navigate = useNavigate();

  const handleProceed = () => {
    // Navigate based on the prediction value
    if (explanation.prediction === "depression") {
      navigate("/intention_to_act_A");
    } else {
      navigate("/intention_to_act_B");
    }
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
        <div className="bg-blue_gray-100 rounded-lg mx-auto px-20 py-6">
          <Text className="text-center text-xl md:text-2xl font-semibold mt-4" style={{ fontSize: '2.0em' }}>
            Die KI prognostiziert auf Basis<br /> deiner Smartphone-Daten<br /><br />
          </Text>
          <Heading as="h2" className={`${explanation.prediction === "depression" ? "text-red-A700" : "text-green-600"} text-3xl md:text-5xl text-center`} style={{ fontSize: '2.5em' }}>
            {explanation.prediction === "depression" ? "Erhöhtes Depressionsrisiko" : "Niedriges Depressionsrisiko"}
          </Heading>
        </div>
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
