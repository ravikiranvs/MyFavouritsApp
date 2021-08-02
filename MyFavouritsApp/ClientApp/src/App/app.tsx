import React, { useState } from "react";
import { Route } from "react-router-dom";
import Main from "../Main/main";
import UserInfo from "../UserInfo/user-info";
import { reddit } from "../utils/auth-tokens";
import RedditAuthHandler from "../AuthHandlers/reddit-auth-handler";

const App: React.FC = (props) => {
  const isRedditAuthenticated = !!reddit.get();
  return (
    <div>
      {
        isRedditAuthenticated ?
          (
            <div>
              <Route path="/" exact><Main /></Route >
              <Route path="/user-info"><UserInfo /></Route>
            </div >
          ) : (
            <div>
              <Route path="/auth-reddit-callback"><RedditAuthHandler /></Route>
              No Auth done :(
              <br />
              <button onClick={() => reddit.start()}>Reddit Auth</button>
            </div>
          )
      }
    </div>
  );
};

export default App;