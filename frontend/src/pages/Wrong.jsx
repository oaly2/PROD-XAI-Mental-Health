import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet"; // To control the page head elements such as title
import styles from '../styles/introductory.module.css';

export default function WrongPage() {
    let navigate = useNavigate();
  
    const handleProceed = () => {
        navigate("/quiz");
        window.scrollTo(0, 0);
    };

    return (
        <>
          <Helmet>
            <title>Smart-Sensing-Apps für mentale Gesundheit</title>
            <meta name="description" content="Introductory page of the experiment" />
          </Helmet>
          <div className={styles.container}>
            <h1 className={styles.title}>Das hat leider nicht gestimmt<br/> <br/> </h1>
            <p className={styles.list}>
            Für diese Studie ist es extrem wichtig, dass Sie sich gut in das hypothetische Szenario hinenversetzen. Daher bitten wir Sie, sich das Szenario erneut in Ruhe anzuschauen.
            </p>
            <br/>
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