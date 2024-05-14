import React from "react";
import { Helmet } from "react-helmet"; // To control the page head elements such as title
import styles from '../styles/introductory.module.css';




export default function IntroductoryPage() {

  const userData = JSON.parse(sessionStorage.getItem('userData')) || {};

  userData.submitted = true;

  sessionStorage.setItem('userData', JSON.stringify(userData));
  
  return (
    <>
      <Helmet>
        <title>Smart-Sensing-Apps für mentale Gesundheit</title>
        <meta name="description" content="Introductory page of the experiment" />
      </Helmet>
      <div className={styles.container}>
        <p className="mb-4 text text-xl md:text-2xl">
        
        Sie haben nun alle Teile der Studie durchlaufen. Wir danken Ihnen herzlich für Ihre wertvollen Antworten. Alle Daten wurden anonym erhoben und werden nur für wissenschaftliche Zwecke ausgewertet. Rückschlüsse auf Ihre Person sind nicht möglich.       

        <br/>
        
        <br/>

        <span style={{fontWeight: 'bold', color: '#19b394', fontSize: '22px'}}>Hinweis:</span> Im Laufe der Befragung werden Sie zu verschiedenen emotionalen Zuständen, einschließlich negativer Gefühle und Gedanken befragt. Falls Sie während der Beantwortung der Fragen eine Belastung empfinden, haben Sie jederzeit die Möglichkeit, Ihre Teilnahme an der Studie ohne Angabe von Gründen abzubrechen. Zusätzlich stehen Ihnen bei akuten psychischen Belastungen oder Suizidgedanken rund um die Uhr folgende Hilfsangebote zur Verfügung:
        <br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	Telefonseelsorge: 0800 / 11 101 11
        <br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•	Ärztlicher (psychiatrischer) Bereitschaftsdienst: 116 117
        <br/><br/><br/>

        Mit freundlichen Grüßen

        <br/><br/>
        Das Studienteam <br/>
        Institut für Business Analytics<br/>
        Universität Ulm 
        <br/><br/>
        Kontakt: maximilian.foerster@uni-ulm.de
        <br/>
 
        </p>
      </div>
    </>
  );
}
