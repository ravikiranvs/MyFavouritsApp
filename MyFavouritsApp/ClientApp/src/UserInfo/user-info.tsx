import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserInfo: React.FC = (props) => {
  const [state, setState] = useState({ message: "Hello from UserInfo!" });
  return <div>{state.message}<Link to="/">Home</Link></div>;
};

export default UserInfo;