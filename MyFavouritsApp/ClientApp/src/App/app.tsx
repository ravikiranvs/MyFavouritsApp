import React, { useState } from "react";
import { Route } from "react-router-dom";
import Main from "../Main/main";
import UserInfo from "../UserInfo/user-info";

const App: React.FC = (props) => {
  return (<div>
    <Route path="/" exact><Main /></Route>
    <Route path="/user-info"><UserInfo /></Route>
  </div>);
};

export default App;