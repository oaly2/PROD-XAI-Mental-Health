import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet"; // To control the page head elements such as title
import styles from '../styles/introductory.module.css';
import { useState } from "react";

export default function IntroductoryPage() {
  let navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const handleProceed = () => {
    if (isChecked) {
      navigate("/persona");
    } else {
      setShowWarning(true);
    }
  };


  return (
    <>
      <Helmet>
        <title>Smart-Sensing-Apps für mentale Gesundheit</title>
        <meta name="description" content="Introductory page of the experiment" />
      </Helmet>
      <div className={styles.container}>
        <h1 className={styles.title}>Smart-Sensing-Apps für mentale Gesundheit <br/> <br/> </h1>
        <p className={styles.list}>
        <span className={styles.subTitle}>Herzlich Willkommen <br/></span>
        zu diesem wissenschaftlichen Forschungsprojekt zum Thema Mental Health! Es wird durchgeführt vom Institut für Business Analytics der Universität Ulm.
        <br/>
        <br/>

        <span className={styles.subTitle}>Worum geht es? <br/></span>
        So genannte Smart-Sensing-Apps nutzen Künstliche Intelligenz (KI), um ihren Usern auf Basis von Sensordaten von Smartphones und anderen Geräten Informationen und Ratschläge zu liefern. Zu den Daten gehören u.a. die Schlafdauer und -qualität, die sportliche Aktivität, die Zeit am Bildschirm oder wieviel man unterwegs ist (Mobilität). In unserem Fall geht es um eine App, die mithilfe von Künstlicher Intelligenz (KI) auswertet, ob die Sensordaten auf ein erhöhtes Depressionsrisiko hindeuten. 
        <br/>
        <br/>


        <span className={styles.subTitle}>Was muss ich tun? <br/></span>
        Sie werden gleich gebeten, sich in ein hypothetisches Szenario hineinzuversetzen. Zunächst werden Ihnen beispielhafte Informationen auf Basis von Sensordaten präsentiert. Dann sehen Sie eine KI-Auswertung auf Basis dieser Daten. Schauen Sie sich die beispielhaften Informationen und die KI-Auswertung bitte genau an. Anschließend bitten wir Sie, dazu Fragen zu beantworten.
        <br/>
        <br/>
        <br/>
        <br/>

        <span className={styles.list} style={{fontWeight: 'bold'}}>Hinweis:</span> Im Laufe der Befragung werden Sie zu verschiedenen emotionalen Zuständen, einschließlich negativer Gefühle und Gedanken befragt. Falls Sie während der Beantwortung der Fragen eine Belastung empfinden, haben Sie jederzeit die Möglichkeit, Ihre Teilnahme an der Studie ohne Angabe von Gründen abzubrechen. Zusätzlich stehen Ihnen bei akuten psychischen Belastungen oder Suizidgedanken rund um die Uhr folgende Hilfsangebote zur Verfügung:
        <br/>
        <br/>
        •	Telefonseelsorge: 0800 / 11 101 11
        <br/>
        •	Ärztlicher (psychiatrischer) Bereitschaftsdienst: 116 117
        <br/><br/>
        <span className={styles.list} style={{fontWeight: 'bold'}}>Datenschutz:</span> Alle Daten werden anonym erhoben und ausschließlich für wissenschaftliche Zwecke ausgewertet.
        <br/><br/>
          <br/>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            style={{ marginRight: '10px', boxShadow: 'none', outline: 'none'}}
          />
          <span className={styles.list}>Ich habe die Informationen zur Studie sowie zum Datenschutz gelesen und stimme zu</span>
          <br/><br/>
        </p>

        <br/>
        {showWarning && <p className= {styles.list} style={{ color: 'red' }}>Bitte stimmen Sie zu</p>}
        <br/>

        <Button
          variant="contained"
          onClick={handleProceed}
          style={{ color: 'white', backgroundColor: '#19b394', fontWeight: 'bold', fontSize: '16px', padding: '10px 20px'}}
        > 
          Weiter &#x279C;
        </Button>
      </div>
    </>
  );
}
