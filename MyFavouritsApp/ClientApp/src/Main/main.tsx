import React, { useState } from "react";
import { Link } from "react-router-dom";

const Main: React.FC = (props) => {
  const [state, setState] = React.useState({ message: "Hello!" });
  return <div>{state.message}<br /><Link to="/user-info">User Info</Link></div>;
};

export default Main;