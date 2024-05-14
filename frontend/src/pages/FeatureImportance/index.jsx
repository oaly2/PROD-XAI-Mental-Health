import React from "react";
import { Helmet } from "react-helmet";
import { Text, Heading } from "../../components";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/introductory.module.css";


// Assume 'explanation' is passed as a prop to this component
export default function SurveyScreenDepressionFIPage({ explanation }) {

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

  // Helper function to format features text with style
  const formatFeaturesText = () => {
    const features = [];
    const textStyle = { color: "#15b1e2", fontWeight: "bold" }; // Increased font size for feature text
    if (explanation.feature_1) features.push(<span style={textStyle}>{replaceUmlauts(explanation.feature_1)}</span>);
    if (explanation.feature_2) features.push(<span style={textStyle}>{replaceUmlauts(explanation.feature_2)}</span>);
    if (explanation.feature_3) features.push(<span style={textStyle}>{replaceUmlauts(explanation.feature_3)}</span>);
    
    if (features.length === 0) return "";
    if (features.length === 1) return <Text style={{ fontSize: "1.8em" }}>{features[0]} hatte einen besonders großen Einfluss auf diese Vorhersage Deines Depressionsrisikos durch die KI.</Text>;
    if (features.length === 2) return <Text style={{ fontSize: "1.8em" }}>{features[0]} und {features[1]} hatten einen besonders großen Einfluss auf diese Vorhersage Deines Depressionsrisikos durch die KI.</Text>;
    return <Text style={{ fontSize: "1.8em" }}>{features[0]}, {features[1]} und {features[2]} hatten einen besonders großen Einfluss auf diese Vorhersage Deines Depressionsrisikos durch die KI.</Text>;
  };


  return (
    <>
      <Helmet>
        <title>Smart-Sensing-Apps für mentale Gesundheit</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className={styles.container}  style={{padding:'15px 15px'}}>
        <Text as="p" className="text-center text-2xl md:text-4xl mb-8">
          Deine KI-Vorhersage
        </Text>
        <div className="bg-blue-50 rounded-lg mx-auto px-20 py-6">
          <Text className="text-center text-xl md:text-2xl font-semibold mt-4" style={{ fontSize: '2.0em' }}>
            Die KI prognostiziert auf Basis<br />deiner Smartphone-Daten<br /><br />
          </Text>
          <Heading as="h2" className={`${explanation.prediction === "depression" ? "text-red-A700" : "text-green-600"} text-3xl md:text-5xl text-center`} style={{ fontSize: '2.5em' }}>
            {explanation.prediction === "depression" ? "Erhöhtes Depressionsrisiko" : "Niedriges Depressionsrisiko"}
          </Heading>
        </div>
        <Text as="p" className="text-center text-base md:text-xl mx-2 my-4">
          {formatFeaturesText()}
        </Text>
        <Text as="p" className="text-blue_gray-400 text-sm md:text-base text-center mt-auto" style={{marginTop: '20px'}}>
          Alle angezeigten Ergebnisse sind lediglich Vorhersagen einer KI. Als solche können sie nur Hinweise auf
          den Gesundheitszustand geben. Sie können keine medizinische Diagnose stellen und ersetzen keinesfalls
          einen Arztbesuch. Wenn du dich deprimiert fühlst, wende dich an einen Arzt.
        </Text>
      </div>
        <Button
          variant="contained"
          onClick={handleProceed}
          style={{ color: 'white', backgroundColor: '#19b394', fontWeight: 'bold', fontSize: '16px', padding: '10px 20px', marginTop: '100px', width: '10%', marginLeft: '45%'}}
        > 
          Weiter &#x279C;
        </Button>
    </>
  );
}
