import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

import FeatureImportancePage from './FeatureImportance/index.jsx'; // Adjust the path as needed
import CounterfactualPage from './CounterFactual/index.jsx'; // Adjust the path as needed
import NoExplanationPage from './NoExplanation/index.jsx'; // Adjust the path as needed

export default function Home() {
  const [explanation, setExplanation] = useState(null);

// Effect to set the explanation from sessionStorage
useEffect(() => {
  // Attempt to load a saved explanation from sessionStorage
  const savedExplanation = sessionStorage.getItem('selectedExplanation');
  if (savedExplanation) {
    setExplanation(JSON.parse(savedExplanation));
  }
}, []);

  // Component to render based on the type of explanation
  const renderExplanationComponent = () => {
    if (!explanation) return <div>Loading...</div>;

    switch (explanation.type) {
      case "FeatureImportance":
        return <FeatureImportancePage explanation={explanation} />;
      case "Counterfactual":
        return <CounterfactualPage explanation={explanation} />;
      case "Simple":
        return <NoExplanationPage explanation={explanation} />;
      default:
        return <div>Unknown explanation type</div>;
    }
  };

  return (
    <>
      <Helmet>
        <title>Smart-Sensing-Apps für mentale Gesundheit</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex flex-col h-screen bg-white-A700 justify-between p-5">
        {renderExplanationComponent()}
      </div>
    </>
  );
}
