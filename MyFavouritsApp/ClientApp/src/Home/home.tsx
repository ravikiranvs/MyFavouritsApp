import React, { useState } from "react";
import { RedditDataClient } from "../Data/web-api"
import { reddit } from "../utils/auth-tokens";

const Home: React.FC = (props) => {
  const token = reddit.get();
  new RedditDataClient().favourits(token).then(() => console.log("done!"));
  return <div>This is Home</div>;
};

export default Home;