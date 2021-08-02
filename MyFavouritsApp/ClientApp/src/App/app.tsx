import React, { useState } from "react";
import { Route } from "react-router-dom";
import Main from "../Main/main";
import UserInfo from "../UserInfo/user-info";
import { reddit } from "../utils/auth-tokens";
import RedditAuthHandler from "../AuthHandlers/reddit-auth-handler";
import Home from "../Home/home";

const App: React.FC = (props) => {
  const isRedditAuthenticated = !!reddit.get();
  return (
    <div>
      <Route path="/" exact><Main /></Route >
      <Route path="/auth-reddit-callback"><RedditAuthHandler /></Route>
      <Route path="/home"><Home /></Route>
      <Route path="/user-info"><UserInfo /></Route>
    </div>
  );
};

export default App;