import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { reddit } from "../utils/auth-tokens";

const Main: React.FC = (props) => {
  const isRedditAuthenticated = !!reddit.get();
  return (
    <div>
      {isRedditAuthenticated ? (
        <Redirect to={{ pathname: "/home" }}></Redirect>
      ) : (
        <Redirect to={{ pathname: "/auth-reddit-callback" }}></Redirect>
      )}
    </div>
  );
};

export default Main;