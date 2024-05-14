import React from "react";
import { useRoutes } from "react-router-dom";

import Home from "pages/Home";
import Introductory from "pages/IntroductoryPage";
import Prolific from "pages/Prolific_id";
import NotFound from "pages/NotFound";
import SurveyScreenDepression from "pages/NoExplanation";
import SurveyScreenDepressionCF from "pages/CounterFactual";
import SurveyScreenDepressionFI from "pages/FeatureImportance";
import Persona from "pages/Persona";
import Quiz from "pages/Quiz";
import Wrong from "pages/Wrong";
import PreExplanationPage from "pages/Pre-Explanation";
import A6 from "pages/6a";
import B6 from "pages/6b";
import A7 from "pages/7";
import A8 from "pages/8";
import A9 from "pages/9";
import A10 from "pages/10";
import A11 from "pages/11";
import A12 from "pages/12";
import A13 from "pages/13";
import A14 from "pages/14a";
import B14 from "pages/14b";
import A15 from "pages/15a";
import A16 from "pages/16a";
import B15 from "pages/15b";
import B16 from "pages/16b";
import A17 from "pages/17";
import A19 from "pages/19";
import Termination from "pages/termination";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <Prolific />},
    { path: "/intro", element: <Introductory />},
    { path: "/intention_to_act_A", element: <A6 />},
    { path: "/intention_to_act_B", element: <B6 />},
    { path: "/intention_to_use", element: <A7 />},
    { path: "/attention_check_1", element: <A8 />},
    { path: "/performance_expectancy", element: <A9 />},
    { path: "/effort_expectancy", element: <A10 />},
    { path: "/social_influence", element: <A11 />},
    { path: "/trust", element: <A12 />},
    { path: "/attention_check_2", element: <A13 />},
    { path: "/psychological_openness_A", element: <A14 />},
    { path: "/psychological_openness_B", element: <B14 />},
    { path: "/indifference_to_stigma_A", element: <A15 />},
    { path: "/help_seeking_propensity_A", element: <A16 />},
    { path: "/indifference_to_stigma_B", element: <B15 />},
    { path: "/help_seeking_propensity_B", element: <B16 />},
    { path: "/erfahrung_mit_app_typen", element: <A17 />},
    { path: "/end_of_survey_A_B", element: <A19 />},
    { path: "/termination", element: <Termination />},
    { path: "/quiz", element: <Quiz />},
    { path: "/pre", element: <PreExplanationPage />},
    { path: "/persona", element: <Persona />},
    { path: "/wrong", element: <Wrong />},
    { path: "/home", element: <Home /> },
    { path: "*", element: <NotFound /> },
    { path: "/NoExplanation", element: <SurveyScreenDepression /> },
    { path: "/FeatureImportance", element: <SurveyScreenDepressionFI /> },
    { path: "/CounterFactual", element: <SurveyScreenDepressionCF /> },
  ]);

  return element;
};

export default ProjectRoutes;
