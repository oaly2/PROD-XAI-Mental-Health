import React from "react";
import { Helmet } from "react-helmet"; // To control the page head elements such as title
import styles from '../styles/introductory.module.css';


export default function Termination() {
  
   return (
    <>
      <Helmet>
        <title>Smart-Sensing-Apps für mentale Gesundheit</title>
        <meta name="description" content="Introductory page of the experiment" />
      </Helmet>
      <div className={styles.container} style = {{marginTop:'45px'}}>
        <p className="mb-4 text text-xl md:text-2xl">

        Liebe(r) Teilnehmer(in),

        <br/><br/>
        
        leider haben Sie zwei Mal Fragen falsch beantwortet, die wir verwenden, um festzustellen, wie aufmerksam Sie an unserer Studie teilnehmen. Damit diese Studie valide Ergebnisse für die Wissenschaft liefern kann, ist es wichtig, dass jede(r) Teilnehmer(in) mit voller Aufmerksamkeit dabei ist. Daher müssen wir Sie leider von der Studie ausschließen.

        Vielen Dank für Ihr Verständnis!

        <br/>
        
        <br/>


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
