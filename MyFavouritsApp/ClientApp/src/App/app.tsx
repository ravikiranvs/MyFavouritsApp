import React, { useState } from "react";

const App: React.FC = (props) => {
  const [message, setMessage] = useState("Webpack is cool!");
  return <div>{message}</div>;
};

export default App;