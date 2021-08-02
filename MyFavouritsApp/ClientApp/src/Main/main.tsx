import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { reddit } from "../utils/auth-tokens";

const Main: React.FC = (props) => {
  const isAuthenticated = !!reddit.get();
  if(!isAuthenticated) {
    reddit.start();
  }
  return (
    <div>
      {isAuthenticated ? (
        <Redirect to={{ pathname: "/home" }}></Redirect>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Main;