import React, { useState } from "react";

const App: React.FC = (props) => {
  const [state, setState] = React.useState({ message: "Hello!!" });
  return <div>{state.message}</div>;
};

export default App;