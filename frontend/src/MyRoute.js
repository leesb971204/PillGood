import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./component/Main";
import Auth from "./component/Auth";
import Form from "./component/Form";
import { Fragment, useState } from "react";
import All from "./component/All/All";
//import Ask from "./component/Ask";
import Cards from "./component/Cards";
import Footer from "./component/Footer";
import Survey from "./component/Survey/Survey";
import Kakao from "./component/Kakao";
import SurveyLoading from "./component/Survey/SurveyLoading";

function MyRoute() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Fragment>
      <Routes>
        <Route
          path="/"
          element={
            <Main isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route path="/auth" element={<Auth setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/form" element={<Form />} />
        <Route path="/all" element={<All />} />
        {/* <Route path="/ask" element={<Ask />} /> */}
        <Route path="/form/survey" element={<Survey />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/auth/kakao/callback" element={<Kakao />} />
        <Route path="/form/survey/loading" element={<SurveyLoading />} />
      </Routes>
    </Fragment>
  );
}
export default MyRoute;
